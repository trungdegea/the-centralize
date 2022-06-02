import { createContext, useContext } from "react";
export type GlobalContent = {
  matk: string;
  setMatk: (c: string) => void;
};
export const UserContext = createContext<GlobalContent>({
  matk: "",
  setMatk: (matk: string) => {},
});
export const useGlobalContext = () => useContext(UserContext);
