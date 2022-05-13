import { createContext } from "react";

export const Token = createContext({
  token: "",
  setToken: () => {},
});
