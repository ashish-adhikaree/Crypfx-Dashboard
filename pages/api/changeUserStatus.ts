import { NextApiRequest, NextApiResponse } from "next";
import { getDB } from "./db";
import { isAuthenticated } from "./isAuthenticated";
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const [canAccess, userid, type] = isAuthenticated(req, res) as Array<any>;
    if (canAccess && type == "Admin") {
      const body = req.body;
      if (body.status !== "Active" && body.status !== "Inactive") {
        res.status(200).json({
          status: "error",
          message: "Invalid status value",
        });
        return;
      }
      const db = await getDB();
      const query = "UPDATE users set status = ? WHERE userid = ?";
      const values = [body.status, body.userid];
      if (db) {
        db.execute(query, values, function (err, results: any, fields) {
          if (err) {
            res.status(200).json({
              status: "error",
              message: "Something went wrong",
            });
          } else {
            res.status(200).json({
              status: "success",
              message: "Status Changed Successfully",
            });
          }
          db.end();
        });
      }
    } else {
      res.status(200).json({
        status: "error",
        message: "You don't have access to this resource",
      });
    }
  } catch (err) {
    res.status(200).json({
      status: "error",
      message: "Something went wrong",
    });
  }
}
