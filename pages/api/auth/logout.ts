import { deleteCookie } from "cookies-next";
import { NextApiRequest, NextApiResponse } from "next";

export default async function Handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    deleteCookie("token", { req, res });
    res
      .status(200)
      .json({ status: "success", message: "Logged Out Successfully" });
  } catch (err) {
    res.status(200).json({ status: "error", messsage: "Something went wrong" });
  }
}
