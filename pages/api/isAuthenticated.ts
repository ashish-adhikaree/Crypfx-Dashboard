import { NextApiRequest, NextApiResponse } from "next";
import jwt from "jsonwebtoken";
import { getCookie } from "cookies-next";

export const isAuthenticated = (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const jwtToken = getCookie("token", { req, res });
    if (jwtToken === null || jwtToken === undefined) {
      return [false, "", ""];
    } else {
      try {
        const data = jwt.verify(
          jwtToken as string,
          process.env.SECRET_TOKEN as string
        );
        //@ts-ignore
        return [true, data.userid, data.type];
      } catch {
        return [false, "", ""];
      }
    }
  } catch (err) {
    return [false, "", ""];
  }
};
