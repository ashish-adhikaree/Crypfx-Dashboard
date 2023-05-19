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
        "SELECT * from messages WHERE convid = ? order by inserton asc";
      const values = [body.convid];
      if (db) {
        db.execute(query, values, function (err, results: any, fields) {
          if (err) {
            res.status(200).json({
              status: "error",
              message: "Something went wrong",
            });
          } else if (Array.isArray(results) && results.length > 0) {
            res.status(200).json({
              status: "success",
              messages: results,
            });
          } else {
            res.status(200).json({
              status: "success",
              messages: [],
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
