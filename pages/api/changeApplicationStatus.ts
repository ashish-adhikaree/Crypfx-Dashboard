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
      if (body.status !== "Accepted" && body.status !== "Rejected") {
        res.status(200).json({
          status: "error",
          message: "Invalid status value",
        });
        return;
      }
      const db = await getDB();
      const message =
        body.status === "Accepted"
          ? "Your application has been accepted."
          : body.message;
      const query =
        "UPDATE applications set status = ?, message = ? WHERE customer = ? and status = ?";
      const values = [body.status, message, body.userid, "Under Review"];
      if (db) {
        db.execute(query, values, function (err, results: any, fields) {
          console.log();
          if (err) {
            res.status(200).json({
              status: "error",
              message: "Something went wrong",
            });
          } else if (results.affectedRows !== 0) {
            res.status(200).json({
              status: "success",
              message: "Application Status Changed Successfully",
            });
          } else {
            res.status(200).json({
              status: "error",
              message: "No Application is pending review",
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
