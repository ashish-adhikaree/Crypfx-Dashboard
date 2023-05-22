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
      const body = req.body;
      const db = await getDB();
      const query =
        "INSERT INTO withdrawals (customer, amount, cryptocurrency, address, status) values (?,?,?,?,?)";

      const values = [
        userid,
        body.amount,
        body.cryptocurrency,
        body.address,
        "Pending",
      ];

      console.log(values)

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
              message: "Withdrawal Requested Successfully",
            });
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
