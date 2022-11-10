import React from "react";
import styles from "./App.module.css";
import { Constructor } from "./components/constructor/Constructor";
import { ShapeList } from "./components/shapeList/ShapeList";
import { Options } from "./components/options/Options";

function App() {
  return (
    <div className={styles.container}>
      <Constructor />
      <div className={styles.instruments}>
        <ShapeList />
        <Options />
      </div>
    </div>
  );
}

export default App;
