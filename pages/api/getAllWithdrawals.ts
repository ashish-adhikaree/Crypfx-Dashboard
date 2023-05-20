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
      const query = "SELECT * from withdrawals";
      if (db) {
        db.execute(query, function (err, results: any, fields) {
          if (err) {
            res.status(200).json({
              status: "error",
              message: "Something went wrong",
            });
          } else {
            const response = results.map((row: any) => {
              return {
                trader: row.customer,
                amount: row.amount,
                cryptocurrency: row.cryptocurrency,
                address: row.address,
                status: row.status,
                addedat: new Date(row.inserton).toDateString(),
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
