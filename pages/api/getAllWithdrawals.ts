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
      const query =
        "SELECT withdrawals.*, users.firstname, users.lastname from withdrawals JOIN users on withdrawals.customer = users.userid ORDER BY withdrawals.inserton desc";
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
                traderid: row.customer,
                tradername: row.firstname + " " + row.lastname,
                amount: row.amount,
                cryptocurrency: row.cryptocurrency,
                address: row.address,
                status: row.status,
                requestedon: new Date(row.inserton).toDateString(),
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
