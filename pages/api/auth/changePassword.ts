import { NextApiRequest, NextApiResponse } from "next";
import { getDB } from "../db";
import bcrypt from "bcryptjs";
import { setCookie } from "cookies-next";
import jwt from "jsonwebtoken";
import { isAuthenticated } from "../isAuthenticated";
import Connection from "mysql2/typings/mysql/lib/Connection";
import { NextResponse } from "next/server";

const Query = async (
  values: string[],
  db: Connection,
  query: string,
  res: NextApiResponse,
  currentpassword: string
) => {
  return new Promise((resolve, reject) => {
    db.execute(query, values, function (err, results: any, fields) {
      if (err) {
        res.status(200).json({
          status: "error",
          message: "Something went Wrong",
        });
      } else if (Array.isArray(results) && results.length > 0) {
        const passindb = results[0].password;
        const isPasswordRight = bcrypt.compareSync(currentpassword, passindb);

        if (!isPasswordRight) {
          res.status(200).json({
            status: "error",
            message: "Current password is incorrect",
          });
        } else {
          resolve(true);
        }
      } else {
        res.status(200).json({
          status: "error",
          message: "Something went wrong",
        });
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
    const [canAccess, userid, type] = isAuthenticated(req, res) as Array<any>;
    if (canAccess) {
      const db = await getDB();
      const currentpassword = body.currentpassword;
      const password = body.newpassword;
      const salt = bcrypt.genSaltSync(10);
      const hashed_password = bcrypt.hashSync(password, salt);
      const query = "SELECT password from users WHERE userid = ?";
      const values = [userid];
      if (db) {
        const isCurrentPasswordCorrect = await Query(
          values,
          db,
          query,
          res,
          currentpassword
        );

        if (!isCurrentPasswordCorrect) {
        } else {
          const q = "UPDATE users set password = ? where userid = ?";
          const val = [hashed_password, userid];
          db.execute(q, val, function (err, results: any, fields) {
            if (err) {
              res.status(200).json({
                status: "error",
                message: "Couldn't change password",
              });
            } else {
              res.status(200).json({
                status: "success",
                message: "Password Changed Successfully",
              });
            }
          });
        }

        db.end();
      }
    } else {
      res.status(200).json({
        status: "error",
        message: "You don't have access to this endpoint",
      });
    }
  } catch {
    res.status(200).json({
      status: "error",
      message: "Something Went Wrong",
    });
  }
}
