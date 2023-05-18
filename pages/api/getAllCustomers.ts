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
      const db = await getDB();
      const query = "SELECT * from users WHERE type = ?";
      const values = ["Customer"];
      if (db) {
        db.execute(query, values, function (err, results: any, fields) {
          if (err) {
            res.status(200).json({
              status: "error",
              message: "Something went wrong",
            });
          } else {
            const response = results.map((row: any) => {
              return {
                userid: row.userid,
                firstname: row.firstname,
                lastname: row.lastname,
                username: row.username,
                email: row.email,
                status: row.status,
                membersince: new Date(row.inserton).toDateString(),
              };
            });
            res.status(200).json({
              status: "success",
              data: response,
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
