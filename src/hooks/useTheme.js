import { useContext } from "react";
import { ThemeContext } from "../utils/themeContext";

export const useTheme = () => {
  return useContext(ThemeContext);
};
