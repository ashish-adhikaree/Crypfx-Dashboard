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
    value: "USDC.ERC20",
    label: "USDC.ERC20",
    img: USDC,
  },
  {
    value: "USDT.ERC20",
    label: "USDT.ERC20",
    img: USDTERC20,
  },
  {
    value: "USDT.TRC20",
    label: "USDT.TRC20",
    img: USDTTRC20,
  },
];

interface INDEXSIGNATURE {
  [key: string]: (typeof CURRENCIES)[0];
}
export const WITHDRAWTABLECURRENCIES: INDEXSIGNATURE = {
  BTC: CURRENCIES[0],
  "USDC.ERC20": CURRENCIES[1],
  "USDT.ERC20": CURRENCIES[2],
  "USDT.TRC20": CURRENCIES[3],
};

