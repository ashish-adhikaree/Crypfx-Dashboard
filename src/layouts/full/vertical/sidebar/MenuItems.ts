import { uniqueId } from "lodash";

interface MenuitemsType {
  [x: string]: any;
  id?: string;
  navlabel?: boolean;
  subheader?: string;
  title?: string;
  icon?: any;
  href?: string;
  children?: MenuitemsType[];
  chip?: string;
  chipColor?: string;
  variant?: string;
  external?: boolean;
}
import {
  IconSmartHome,
  IconMessage2,
  IconQuestionMark,
  IconCurrencyDollar,
  IconUser,
} from "@tabler/icons-react";

export const CustomerMenuitems: MenuitemsType[] = [
  {
    id: uniqueId(),
    title: "Dashboard",
    icon: IconSmartHome,
    href: "/",
  },
  {
    id: uniqueId(),
    title: "Questionnaires",
    icon: IconQuestionMark,
    href: "/questionnaires",
  },
  {
    id: uniqueId(),
    title: "Chat",
    icon: IconMessage2,
    href: "/chat",
  },
  {
    id: uniqueId(),
    title: "Withdrawal",
    icon: IconCurrencyDollar,
    href: "/withdraw",
  },
];

export const AdminMenuitems: MenuitemsType[] = [
  {
    id: uniqueId(),
    title: "Dashboard",
    icon: IconSmartHome,
    href: "/",
  },

  {
    id: uniqueId(),
    title: "Customers",
    icon: IconUser,
    href: "/customers",
  },
  {
    id: uniqueId(),
    title: "Withdrawals",
    icon: IconCurrencyDollar,
    href: "/withdraw",
  },
];

export default () => {};
