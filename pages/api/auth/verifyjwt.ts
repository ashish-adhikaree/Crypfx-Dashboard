import { getCookie } from "cookies-next";
import { NextApiRequest, NextApiResponse } from "next";
import { getDB } from "../db";
import jwt from "jsonwebtoken";

export default async function Handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const jwtToken = getCookie("token", { req, res });
    if (jwtToken === null || jwtToken === undefined) {
      res
        .status(200)
        .json({ status: "error", message: "You are not Logged in" });
    } else {
      try {
        jwt.verify(
          jwtToken as string,
          process.env.SECRET_TOKEN as string,
          function (err, decoded:any) {
            if (err) {
              res
                .status(200)
                .json({ status: "error", message: "Incorrect JWT Token" });
              return;
            } else {
              res
                .status(200)
                .json({
                  status: "success",
                  type: decoded?.type,
                  userid: decoded?.userid,
                });
            }
          }
        );
      } catch {
        res
          .status(200)
          .json({ status: "error", message: "Something went wrong" });
      }
    }
  } catch (err) {
    res.status(200).json({ status: "error", message: "Something went wrong" });
  }
}
