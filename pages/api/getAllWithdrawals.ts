import { NextApiRequest, NextApiResponse } from "next";
import { getDB } from "./db";
import { isAuthenticated } from "./isAuthenticated";

const cryptos = [
  {
    code: "XRP",
    name: "Ripple",
    icon: "/public/images/cryptocurrencies/xrp.png",
  },
  {
    code: "TRX",
    name: "TRON",
    icon: "/public/images/cryptocurrencies/trx.png",
  },
  {
    code: "BNB",
    name: "Binance Coin",
    icon: "/public/images/cryptocurrencies/bnb.png",
  },
  {
    code: "BUSD",
    name: "Binance USD",
    icon: "/public/images/cryptocurrencies/busd.png",
  },
];

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const [canAccess, userid, type] = isAuthenticated(req, res) as Array<any>;
    if (canAccess && type == "Admin") {
      const db = await getDB();
      const query = "SELECT * from withdrawals";
      if (db) {
        db.execute(query, function (err, results: any, fields) {
          if (err) {
            res.status(200).json({
              status: "error",
              message: "Something went wrong",
            });
          } else {
            const response = results.map((row: any) => {
              return {
                trader: row.customer,
                amount: row.amount,
                cryptocurrency: cryptos[row.cryptocurrency - 1],
                address: row.address,
                status: row.status,
                addedat: new Date(row.inserton).toDateString(),
              };
            });
            console.log(response)
            res.status(200).json({
              status: "success",
              data: response,
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
