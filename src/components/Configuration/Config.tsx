import { createContext, ReactNode, useContext, useState } from "react";

export type ThemeType = 'light' | 'dark' | 'high-contrast' | undefined;

export type Config = {
  updatedTheme: ThemeType;
  getTheme: () => ThemeType;
  updateTheme: (theme: ThemeType) => void;
};

const ConfigContext = createContext<Config>({
  updatedTheme: 'dark',
  getTheme: () => 'dark',
  updateTheme: () => { }
});

export const useConfig = (): Config => {
  const configContext = useContext(ConfigContext);
  if (!configContext) {
    throw new Error(`useConfig must be used within a ConfigProvider`);
  }
  return configContext;
};

export const ConfigProvider = ({ children }: { children: ReactNode }) => {
  const [theme, setTheme] = useState<ThemeType>(localStorage.getItem('theme') === 'dark' ? 'dark' : 'light');
  const configValue: Config = {
    updatedTheme: theme,
    getTheme: () => {
      console.log(theme);
      return theme;
    },
    updateTheme: (updatedTheme: ThemeType) => setTheme(updatedTheme)
  };
  return <ConfigContext.Provider value={configValue}>{children}</ConfigContext.Provider>
};
