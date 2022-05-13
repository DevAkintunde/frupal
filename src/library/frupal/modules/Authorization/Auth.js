import { createContext } from "react";

export const Auth = createContext({
  isAuth: false,
  setIsAuth: () => {},
});
