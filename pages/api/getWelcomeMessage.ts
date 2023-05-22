import { NextApiRequest, NextApiResponse } from "next";
import { getDB } from "./db";
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const body = req.body;
    const db = await getDB();
    const query = "SELECT welcomemessage from website WHERE id = ?";
    const values = [1];
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
            welcomemsg:
              results[0].welcomemessage === ""
                ? "Complete the application if you are serious about getting our funded account as our accounts are limited."
                : results[0].welcomemessage,
          });
        } else {
          res.status(200).json({
            status: "success",
            welcomemsg:
              "Complete the application if you are serious about getting our funded account as our accounts are limited.",
          });
        }
        db.end();
      });
    }
  } catch (err) {
    res.status(200).json({
      status: "error",
      message: "Something went wrong",
    });
  }
}
