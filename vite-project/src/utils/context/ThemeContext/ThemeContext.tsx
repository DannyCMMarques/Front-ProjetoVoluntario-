import React, { createContext, ReactNode, useState } from "react";

interface ThemeContextProps {
  isOpen: boolean;
  toggle: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setToggle: React.Dispatch<React.SetStateAction<boolean>>;
}

interface ThemeProviderProps {
  children: ReactNode;
}

export const ThemeContext = createContext<ThemeContextProps>();

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const [isOpen, setIsOpen] = useState<boolean>(window.innerWidth < 760);
  const [toggle, setToggle] = useState<boolean>(false);

  return (
    <ThemeContext.Provider
      value={{
        isOpen,
        toggle,
        setIsOpen,
        setToggle,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};