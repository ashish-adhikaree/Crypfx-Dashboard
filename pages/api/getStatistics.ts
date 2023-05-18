import { NextApiRequest, NextApiResponse } from "next";
import { getDB } from "./db";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const db = await getDB();
    const query = "SELECT * FROM (SELECT COUNT(firstname) from users WHERE type = ? UNION SELECT COUNT (customer)  from withdrawals) AS FINAL";
    const values = ["Customer"];
    if (db) {
      db.execute(query, values, function (err, results, fields) {
        console.log(results)
        if (err) {
          res.status(200).json({
            status: "error",
            message: "Something went wrong",
          });
        } else {
          res.status(200).json({
            status: "success",
            message: "",
          });
        }
      });
    }
  } catch (err) {
    res.status(200).json({
      status: "error",
      message: "Something went wrong",
    });
  }
}
