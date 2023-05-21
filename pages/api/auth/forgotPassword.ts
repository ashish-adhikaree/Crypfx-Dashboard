import { NextApiRequest, NextApiResponse } from "next";
import { getDB } from "../db";
import SHA1 from "crypto-js/sha1";
import { randomInt } from "crypto";
import Connection from "mysql2/typings/mysql/lib/Connection";
import nodemailer from "nodemailer";
import jwt from "jsonwebtoken";

const Query: (
  values: string[],
  db: Connection,
  query: string
) => Promise<boolean> = async (values, db, query) => {
  const promise: Promise<boolean> = new Promise((resolve, reject) => {
    db.execute(query, values, function (err, results: any, fields) {
      if (err) {
        resolve(false);
      } else if (Array.isArray(results) && results.length > 0) {
        resolve(true);
      } else {
        resolve(true);
      }
    });
  });
  return promise;
};

const getHTMLEmailTemplate = (token: string) => {
  const emailTemplate = `<!doctype html>
<html lang="en-US">
<head>
    <meta content="text/html; charset=utf-8" http-equiv="Content-Type" />
    <title>Reset Password</title>
    <link
    href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&display=swap"
    rel="stylesheet"
  ></link>
    <meta name="description" content="Reset Password">
    <style type="text/css">
        a:hover {text-decoration: underline !important;}
        body {
            font-family: 'Plus Jakarta Sans', sans-serif;
        }
    </style>
</head>

<body marginheight="0" topmargin="0" marginwidth="0" style="margin: 0px; background-color: #f2f3f8;" leftmargin="0">
    <!--100% body table-->
    <table cellspacing="0" border="0" cellpadding="0" width="100%" bgcolor="#f2f3f8"
        style="@import url(https://fonts.googleapis.com/css?family=Rubik:300,400,500,700|Open+Sans:300,400,600,700); font-family: 'Open Sans', sans-serif;">
        <tr>
            <td>
                <table style="background-color: #f2f3f8; max-width:670px;  margin:0 auto;" width="100%" border="0"
                    align="center" cellpadding="0" cellspacing="0">
                    <tr>
                        <td style="height:80px;">&nbsp;</td>
                    </tr>
                    <tr>
                        <td style="text-align:center;">
                          <a href="dashboard.crypfx.com" title="crypfx-logo" target="_blank">
                            <img width="160" src="http://dashboard.crypfx.uk/_next/image?url=%2Fimages%2Flogos%2Flogo.png&w=256&q=75" title="logo" alt="logo">
                          </a>
                        </td>
                    </tr>
                    <tr>
                        <td style="height:20px;">&nbsp;</td>
                    </tr>
                    <tr>
                        <td>
                            <table width="95%" border="0" align="center" cellpadding="0" cellspacing="0"
                                style="max-width:670px;background:#fff; border-radius:3px; text-align:center;-webkit-box-shadow:0 6px 18px 0 rgba(0,0,0,.06);-moz-box-shadow:0 6px 18px 0 rgba(0,0,0,.06);box-shadow:0 6px 18px 0 rgba(0,0,0,.06);">
                                <tr>
                                    <td style="height:40px;">&nbsp;</td>
                                </tr>
                                <tr>
                                    <td style="padding:0 35px;">
                                        <h1 style="color:#1e1e2d; font-weight:500; margin:0;font-size:32px;font-family:'Rubik',sans-serif;">You have
                                            requested to reset your password</h1>
                                        <span
                                            style="display:inline-block; vertical-align:middle; margin:29px 0 26px; border-bottom:1px solid #cecece; width:100px;"></span>
                                        <p style="color:#455056; font-size:15px;line-height:24px; margin:0;">
                                            A unique link to reset your password has been generated for you. To reset your password, click the
                                            following link and follow the instructions.U+000A U+000A

                                            You can copy the link and paste it if the button doesn't work. U+000A

                                            http://dashboard.crypfx.uk/auth/forgot-password/reset?token=${token}
                                            
                                        </p>
                                        <a href="http://dashboard.crypfx.uk/auth/forgot-password/reset?token=${token}"
                                            style="background:#2a3547;text-decoration:none !important; font-weight:500; margin-top:35px; color:#fff;text-transform:uppercase; font-size:14px;padding:10px 24px;display:inline-block;border-radius:50px;">Reset
                                            Password</a>
                                    </td>
                                </tr>
                                <tr>
                                    <td style="height:40px;">&nbsp;</td>
                                </tr>
                            </table>
                        </td>
                    <tr>
                        <td style="height:20px;">&nbsp;</td>
                    </tr>
                    <tr>
                        <td style="text-align:center;">
                            <p style="font-size:14px; color:rgba(69, 80, 86, 0.7411764705882353); line-height:18px; margin:0 0 0;">Crypfx UK</p>
                        </td>
                    </tr>
                    <tr>
                        <td style="height:80px;">&nbsp;</td>
                    </tr>
                </table>
            </td>
        </tr>
    </table>
    <!--/100% body table-->
</body>

</html>`;

  return emailTemplate;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const body = req.body;
  try {
    const db = await getDB();
    const email = body.email;

    const token = jwt
      .sign({ createdon: Date.now(),email: email }, process.env.SECRET_TOKEN as string)
      .substring(2, 26);

    const query = "SELECT * from users WHERE email = ?";
    const values = [email];

    if (db) {
      const isEmailValid = await Query(values, db, query);
      if (isEmailValid) {
        const q = "INSERT into forgotpassword (email, token) values(?,?)";
        const vals = [email, token];
        db.execute(q, vals, async function (err, results: any, fields) {
          if (err) {
            res.status(200).json({
              status: "error",
              message: "Something went wrong",
            });
          } else if (results.affectedRows !== 0) {
            const transporter = nodemailer.createTransport({
              host: "smtp.hostinger.com",
              port: 465,
              auth: {
                user: "noreply@dashboard.crypfx.uk",
                pass: process.env.EMAIL_PASSWORD,
              },
            });

            try {
              await transporter.sendMail({
                from: {
                  name: "Crypfx",
                  address: "noreply@dashboard.crypfx.uk",
                },
                to: email,
                subject: "Reset your Password | Crypfx",
                html: `${getHTMLEmailTemplate(token)}`,
              });
              res.status(200).json({
                status: "success",
              });
            } catch (err) {
              console.log(err);
              res.status(200).json({
                status: "error",
                message: "Something went wrong",
              });
            }
          } else {
            res.status(200).json({
              status: "error",
              message: "Something went wrong",
            });
          }
        });
      } else {
        res.status(200).json({
          status: "error",
          message: "No account registererd under this email",
        });
      }
      db.end();
    } else {
      res.status(200).json({
        status: "error",
        message: "Something Went Wrong",
      });
    }
  } catch (error) {
    console.log(error);
    res.status(200).json({
      status: "error",
      message: "Something Went Wrong",
    });
  }
}
