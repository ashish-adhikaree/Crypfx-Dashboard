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
      const query = "SELECT * from users WHERE userid = ?";
      const values = [userid];
      if (db) {
        db.execute(query, values, function (err, results: any, fields) {
          if (err) {
            res.status(200).json({
              status: "error",
              message: "Something went wrong",
            });
          } else {
            delete results[0].password;
            res.status(200).json({
              status: "success",
              message: "User details fetched successfully",
              data: {
                fullname: results[0].firstname + " " + results[0].lastname,
                firstname: results[0].firstname,
                lastname: results[0].lastname,
                image: results[0].image,
                type: results[0].type,
                email: results[0].email,
                username: results[0].username,
                phone: results[0].phone,
                userid: results[0].userid,
              },
            });
          }
        });
        db.end();
      } else {
        res.status(200).json({
          status: "error",
          message: "Something went wrong",
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
