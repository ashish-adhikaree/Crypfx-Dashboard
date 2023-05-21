import { NextApiRequest, NextApiResponse } from "next";
import { getDB } from "./db";
import { isAuthenticated } from "./isAuthenticated";
import { Connection } from "mysql2";

const Query = async (
  values: string[],
  db: Connection,
  query: string,
  res: NextApiResponse
) => {
  return new Promise((resolve, reject) => {
    db.execute(query, values, function (err, results: any, fields) {
      if (err) {
        res.status(200).json({
          status: "error",
          message: "Something went wrong",
        });
      } else {
        res.status(200).json({
          status: "success",
        });
        resolve(true);
      }
    });
  });
};

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
        "INSERT into messages (convid, byAdmin, message, responded) values(?,?,?,?)";
      const values = [
        body.convid,
        type === "Admin" ? 1 : 0,
        body.message,
        type === "Admin" ? 1 : 0,
      ];

      if (db) {
        const hasMessagebeensent = await Query(values, db, query, res);
        if (hasMessagebeensent && type === "Admin") {
          const q =
            "UPDATE messages set responded = ? WHERE responded = ? and convid = ?";
          const vals = [1, 0, body.convid];
          db.execute(q, vals, function (err, results: any, fields) {
            if (err) {
              console.log(err);
            } else {
              console.log("succeed");
            }
            db.end();
          });
        }
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
