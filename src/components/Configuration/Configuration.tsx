import { useState } from "react";
import { Toggle } from "rsuite";
import Header from "../Layout/header/Header";
import { ThemeType, useConfig } from "./Config";

function Configuration(): JSX.Element {
  const config = useConfig();
  const [theme, setTheme] = useState<ThemeType>(localStorage.getItem('theme') === 'dark' ? 'dark' : 'light');
  const isLightTheme = () => theme === 'light';
  const toggleTheme = ()  => {
    const updatedTheme = isLightTheme() ? 'dark' : 'light';
    setTheme(updatedTheme);
    config.updateTheme(updatedTheme);
    localStorage.setItem('theme', updatedTheme);
  };

  return (
    <>
      <Header title="Configuration" />
      <div className="Configuration">
        <span>Theme:</span> <Toggle checkedChildren="🌞" unCheckedChildren="🌜" checked={isLightTheme()} onChange={toggleTheme} />
      </div>
    </>
  );
}

export default Configuration;
