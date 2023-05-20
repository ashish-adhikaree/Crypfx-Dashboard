import BTCLOGO from "../../public/images/cryptocurrencies/btc.png";
import USDC from "../../public/images/cryptocurrencies/usdc.png";
import USDTERC20 from "../../public/images/cryptocurrencies/usdterc20.png";
import USDTTRC20 from "../../public/images/cryptocurrencies/usdttrc20.png";
export const CURRENCIES = [
  {
    value: "BTC",
    label: "BTC",
    img: BTCLOGO,
  },
  {
    value: "USDC",
    label: "USDC",
    img: USDC,
  },
  {
    value: "USDTERC20",
    label: "USDTERC20",
    img: USDTERC20,
  },
  {
    value: "USDTTRC20",
    label: "USDTTRC20",
    img: USDTTRC20,
  },
];

interface INDEXSIGNATURE {
  [key: string]: (typeof CURRENCIES)[0];
}
export const WITHDRAWTABLECURRENCIES: INDEXSIGNATURE = {
  BTC: CURRENCIES[0],
  USDC: CURRENCIES[1],
  USDTERC20: CURRENCIES[2],
  USDTTRC20: CURRENCIES[3],
};
