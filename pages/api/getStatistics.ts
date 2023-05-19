import { NextApiRequest, NextApiResponse } from "next";
import { getDB } from "./db";
import { isAuthenticated } from "./isAuthenticated";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const [canAccess, userid] = isAuthenticated(req, res) as Array<any>;
    if (canAccess) {
      const db = await getDB();
      const query =
        "SELECT * FROM (SELECT COUNT (customer) from withdrawals UNION SELECT COUNT(firstname)from users WHERE type = ?) AS FINAL";
      const values = ["Customer"];
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
              stats: {
                customers: results[1]["COUNT (customer)"],
                withdrawals: results[0]["COUNT (customer)"],
              },
            });
          }
        });
      }
    } else {
      res.status(200).json({
        status: "error",
        message: "You don't have access to the resource",
      });
    }
  } catch (err) {
    res.status(200).json({
      status: "error",
      message: "Something went wrong",
    });
  }
}
