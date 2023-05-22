import { NextApiRequest, NextApiResponse } from "next";
import { getDB } from "./db";
import { isAuthenticated } from "./isAuthenticated";
import fs from "fs";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const [canAccess, userid] = isAuthenticated(req, res) as Array<any>;
    const body = req.body;
    if (canAccess) {
      const db = await getDB();
      const query = "UPDATE users set image=? WHERE userid = ?";
      const values = ["", userid];
      if (db) {
        db.execute(query, values, function (err, results, fields) {
          if (err) {
            res.status(200).json({
              status: "error",
              message: "Something went wrong",
            });
          } else {
            res.status(200).json({
              status: "success",
              message: "Profile Picture removed successfully",
            });
            if (body.existingpfp && body.existingpfp !== "") {
              fs.unlink(`public/userprofile/${body.existingpfp}`, () => {});
            }
          }
        });
        db.end();
      }
    } else {
      res.status(200).json({
        status: "error",
        message: "You must login first",
      });
    }
  } catch (err) {
    res.status(200).json({
      status: "error",
      message: "Something went wrong",
    });
  }
}
