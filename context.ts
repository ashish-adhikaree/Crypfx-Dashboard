import { createContext } from "react";

export const AuthContext = createContext({
    isLoggedin: false,
    type: "",
    userid: "",
    fullname: "",
    image: "",
    email: ""
  });