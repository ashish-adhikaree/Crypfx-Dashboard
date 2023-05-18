import { NextApiRequest, NextApiResponse } from "next";
import { getDB } from "../db";
import bcrypt from "bcryptjs";
import { setCookie } from "cookies-next";
import jwt from "jsonwebtoken";
import { isAuthenticated } from "../isAuthenticated";

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
      const query =
        "UPDATE users set password = ? WHERE userid = ? and password = ?";
      const values = [hashed_password, userid, currentpassword];
      if (db) {
        db.execute(query, values, function (err, results: any, fields) {
          if (err) {
            res.status(200).json({
              status: "error",
              message: "Something went Wrong",
            });
          } else {
            res.status(200).json({
              status: "success",
              message: "Password Changed Successfully",
            });
          }
        });
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
