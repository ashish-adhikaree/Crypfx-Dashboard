import { NextApiRequest, NextApiResponse } from "next";
import { getDB } from "./db";
import { isAuthenticated } from "./isAuthenticated";
import multer from "multer";

const upload = multer({
  // Disk Storage option
  storage: multer.diskStorage({
    destination: "public/kyc/",
    filename: (req, file, cb) =>
      cb(
        null,
        `${Math.random() * 19244303459}${Date.now()}${file.originalname}`
      ),
  }),
});

export default async function handler(req: any, res: any) {
  try {
    const [canAccess, userid] = isAuthenticated(req, res) as Array<any>;
    if (canAccess) {
      upload.single("file")(req, res, async (err) => {
        if (err) {
          // Handle any errors that occurred during file upload
          return res.status(500).json({ error: err.message });
        }

        // File uploaded successfully
        const { file } = req;
        const body = req.body

        const db = await getDB();
        const query =
          "UPDATE users set kycstatus = ?, kyclink = ?, kycdoctype=?, country=? WHERE userid = ?";
        const values = ["Pending", file.filename, req.body.doctype, req.body.country,  userid];
        if (db) {
          db.execute(query, values, function (err, results, fields) {
            if (err) {
              console.log(err);
              res.status(200).json({
                status: "error",
                message: "Something went wrong",
              });
            } else {
              res.status(200).json({
                status: "success",
                message: "KYC submitted Successfully",
              });
            }
          });
          db.end();
        }
      });
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

export const config = {
  api: {
    bodyParser: false,
  },
};
