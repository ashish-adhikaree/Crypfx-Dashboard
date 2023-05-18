// import { NextApiRequest, NextApiResponse } from "next";
// import { getDB } from "./db";

// export default async function handler(
//   req: NextApiRequest,
//   res: NextApiResponse
// ) {
//   try {
//     const body = req.body;
//     const db = await getDB();
//     const query =
//       "";
//     const values = [
//     ];
//     if (db) {
//       db.execute(query, values, function (err, results, fields) {
//         if (err) {
//           res.status(200).json({
//             status: "error",
//             message: "Something went wrong",
//           });
//         } else {
//           res.status(200).json({
//             status: "success",
//             message: "",
//           });
//         }
// db.end()
//       });
//     }
//   } catch (err) {
//     res.status(200).json({
//       status: "error",
//       message: "Something went wrong",
//     });
//   }
// }
