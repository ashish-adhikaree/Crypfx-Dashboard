import { NextApiRequest, NextApiResponse } from "next";
import { getDB } from "../db";
import bcrypt from "bcryptjs";
import { isAuthenticated } from "../isAuthenticated";
import Connection from "mysql2/typings/mysql/lib/Connection";

const Query: (
  values: string[],
  db: Connection,
  query: string
) => Promise<{
  valid: boolean;
  email: string;
}> = async (values, db, query) => {
  const promise: Promise<{
    valid: boolean;
    email: string;
  }> = new Promise((resolve, reject) => {
    db.execute(query, values, function (err, results: any, fields) {
      if (err) {
        resolve({
          valid: false,
          email: "",
        });
      } else if (Array.isArray(results) && results.length > 0) {
        resolve({
          valid: true,
          email: results[0].email,
        });
      } else {
        resolve({
          valid: false,
          email: "",
        });
      }
    });
  });
  return promise;
};

const UpdatePasswordQuery: (
  values: string[],
  db: Connection,
  query: string,
  res: NextApiResponse
) => Promise<boolean> = async (values, db, query, res) => {
  return new Promise((resolve, reject) => {
    db.execute(query, values, function (err, results: any, fields) {
      if (err) {
        res.status(200).json({
          status: "error",
          message: "Couldn't change password",
        });
        resolve(true);
      } else {
        res.status(200).json({
          status: "success",
          message: "Password Changed Successfully",
        });
        resolve(true);
      }
    });
  });
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const body = req.body;
  try {
    const db = await getDB();
    const query = "SELECT * from forgotpassword WHERE token = ?";
    const values = [body.token];
    if (db) {
      const { valid, email } = await Query(values, db, query);

      if (!valid) {
        res.status(200).json({
          status: "error",
          message: "Invalid Token",
        });
      } else {
        const q = "UPDATE users set password = ? where email = ?";
        const salt = bcrypt.genSaltSync(10);
        const hashed_password = bcrypt.hashSync(body.password, salt);
        const val = [hashed_password, email];
        const passUpdated = await UpdatePasswordQuery(val, db, q, res);
        if (passUpdated) {
          const q2 = "DELETE FROM forgotpassword WHERE email = ?";
          const vals = [email];
          db.execute(q2, vals, () => {});
        }
      }

      db.end();
    }
  } catch {
    res.status(200).json({
      status: "error",
      message: "Something Went Wrong",
    });
  }
}
