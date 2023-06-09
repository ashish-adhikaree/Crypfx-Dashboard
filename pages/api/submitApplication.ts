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
      const body = req.body;
      const db = await getDB();
      const query =
        "INSERT INTO applications (customer, fullname, email,country,birthdate, account, tradingperiod, tradertype, averagemonthlygain, riskpercentage, currencypair, forexbroker, tradingjourney, currentaccountsize, whyneedus, status, message) values (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)";
      const values = [
        body.userid,
        body.fullname,
        body.email,
        body.country,
        body.birthdate,
        body.account,
        body.tradingperiod,
        body.tradertype,
        body.averagemonthlygain,
        body.riskpercentage,
        body.currencypair,
        body.forexbroker,
        body.tradingjourney,
        body.currentaccountsize,
        body.whyneedus,
        body.account === "$10,000 Account" || body.account === "$25,000 Account"
          ? "Accepted"
          : "Under Review",
        body.account === "$10,000 Account" || body.account === "$25,000 Account"
          ? "Your application has been accepted."
          : "Application Submitted Successfully. It is pending review from the admin",
      ];
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
              message: "Application Added Successfully",
            });
          }
        });
        db.end();
      }
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
