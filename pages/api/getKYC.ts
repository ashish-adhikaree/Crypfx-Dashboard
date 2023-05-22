import { NextApiRequest, NextApiResponse } from "next";
import { getDB } from "./db";
import { isAuthenticated } from "./isAuthenticated";
import fs from "fs";
import path from "path";

const getBuffer = (filePath: string) => {
  try {
    const imageBuffer = fs.readFileSync(filePath);
    return imageBuffer;
  } catch {
    return "";
  }
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const [canAccess, userid, type] = isAuthenticated(req, res) as Array<any>;
    const body = req.body;
    if (canAccess && (type == "Admin" || userid === body.userid)) {
      const db = await getDB();
      const query =
        "SELECT kycstatus, kyclink, kycdoctype, country from users WHERE userid = ?";
      const values = [body.userid];
      if (db) {
        db.execute(query, values, function (err, results: any, fields) {
          if (err) {
            res.status(200).json({
              status: "error",
              message: "Something went wrong",
            });
          } else if (Array.isArray(results) && results.length > 0) {
            if (results[0].kyclink && results[0].kyclink.length !== 0) {
              const filePath = path.resolve(
                ".",
                `public/kyc/${results[0].kyclink}`
              );
              const imageBuffer = getBuffer(filePath);
              res.status(200).json({
                status: "success",
                data: { ...results[0], file: imageBuffer },
              });
            } else {
              res.status(200).json({
                status: "success",
                data: { ...results[0], file: "" },
              });
            }
          } else {
            res.status(200).json({
              status: "success",
              data: [],
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
