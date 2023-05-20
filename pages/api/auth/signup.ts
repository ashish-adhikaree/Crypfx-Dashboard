import { NextApiRequest, NextApiResponse } from "next";
import { getDB } from "../db";
import bcrypt from "bcryptjs";
import SHA1 from "crypto-js/sha1";
import { randomInt } from "crypto";
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const body = req.body;
  try {
    const db = await getDB();
    const password = body.password;
    const salt = bcrypt.genSaltSync(10);
    const hashed_password = bcrypt.hashSync(password, salt);
    const query =
      "INSERT INTO users (userid, firstname, lastname, username, email, password, status, kycstatus) values (?,?,?,?,?,?,?,?)";
    const userid = SHA1(body.email + Date.now() + randomInt(1111, 9999))
      .toString()
      .substring(0, 6);
    const values = [
      userid,
      body.firstname,
      body.lastname,
      body.username,
      body.email,
      hashed_password,
      "Active",
      "Not Submitted"
    ];
    if (db) {
      db.execute(query, values, function (err, results, fields) {
        res.status(200).json({
          status: "success",
          message: "Account created sucessfully. Please Login to continue",
        });
      });
      db.end();
    } else {
      res.status(200).json({
        status: "error",
        message: "Something Went Wrong",
      });
    }
  } catch {
    res.status(200).json({
      status: "error",
      message: "Something Went Wrong",
    });
  }
}
