import { NextApiRequest, NextApiResponse } from "next";
import { getDB } from "../db";
import bcrypt from "bcryptjs";
import { setCookie } from "cookies-next";
import jwt from "jsonwebtoken";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const body = req.body;
  try {
    const db = await getDB();
    const password = body.password;
    const query = "SELECT * from users WHERE email = ?";
    const values = [body.email];
    if (db) {
      db.execute(query, values, function (err, results: any, fields) {
        if (err) {
          res.status(200).json({
            status: "error",
            message: "Something went wrong",
          });
        } else {
          const isPasswordRight = bcrypt.compareSync(
            password,
            results[0].password
          );

          if (!isPasswordRight) {
            res.status(200).json({
              status: "error",
              message: "Incorrect Password",
            });
            return;
          } else {
            const token = jwt.sign(
              { userid: results[0].userid, type: results[0].type },
              process.env.SECRET_TOKEN as string
            );
            setCookie("token", token, {
              req,
              res,
            });

            res.status(200).json({
              status: "success",
              message: "Logged in Successfully",
            });
          }
        }
      });
      db.end();
    } else {
    }
  } catch {
    res.status(200).json({
      status: "error",
      message: "Something Went Wrong",
    });
  }
}
