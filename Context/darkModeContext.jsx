import { createContext, useContext, useEffect } from "react";
import { useLocalStorageState } from "../src/hooks/useLocalStorageState";

const DarkMoadeConrtext = createContext();

function DarkModeProvider({ children }) {
  const [isDarkMode, setIsDarkMode] = useLocalStorageState(
    window.matchMedia("(prefers-color-dark").matches,
    "isDark"
  );

  useEffect(
    function () {
      if (isDarkMode) {
        document.documentElement.classList.add("dark-mode");
        document.documentElement.classList.remove("light-mode");
      } else {
        document.documentElement.classList.add("light-mode");
        document.documentElement.classList.remove("dark-mode");
      }
    },
    [isDarkMode]
  );

  const toggleDarkMode = () => setIsDarkMode((value) => !value);

  return (
    <DarkMoadeConrtext.Provider value={{ isDarkMode, toggleDarkMode }}>
      {children}
    </DarkMoadeConrtext.Provider>
  );
}

const useDarkMode = function () {
  const context = useContext(DarkMoadeConrtext);
  if (context === undefined)
    throw new Error("Darkmode context is use outside provider");
  return context;
};

export { DarkModeProvider, useDarkMode };
