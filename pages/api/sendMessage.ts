import { NextApiRequest, NextApiResponse } from "next";
import { getDB } from "./db";
import { isAuthenticated } from "./isAuthenticated";
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const [canAccess, userid, type] = isAuthenticated(req, res) as Array<any>;
    const body = req.body;
    if (canAccess && (type == "Admin" || userid === body.convid)) {
      const db = await getDB();
      const query =
        "INSERT into messages (convid, byAdmin, message) values(?,?,?)";
      const values = [body.convid, type === "Admin" ? 1 : 0, body.message];
      if (db) {
        db.execute(query, values, function (err, results: any, fields) {
          console.log(results);
          if (err) {
            res.status(200).json({
              status: "error",
              message: "Something went wrong",
            });
          } else {
            res.status(200).json({
              status: "success",
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
