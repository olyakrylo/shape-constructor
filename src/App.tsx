import React, { useEffect } from "react";
import styles from "./App.module.css";
import { Constructor } from "./components/constructor/Constructor";
import { ShapeList } from "./components/shapeList/ShapeList";
import { Options } from "./components/options/Options";
import { ThemeIcon } from "./icons";
import { useTheme } from "./hooks/useTheme";

function App() {
  const theme = useTheme();

  useEffect(() => {
    theme.load();
  });

  const toggleTheme = () => {
    theme.toggle();
  };

  return (
    <div className={styles.container}>
      <Constructor />
      <div className={styles.instruments}>
        <ShapeList />
        <Options />
      </div>

      <div className={styles.theme}>
        <button className={styles.theme__button} onClick={toggleTheme}>
          <ThemeIcon />
        </button>
      </div>
    </div>
  );
}

export default App;
