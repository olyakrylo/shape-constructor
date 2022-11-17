import styles from "./ConstructirControl.module.css";
import { MarkupIcon, MinusIcon, PlusIcon, ZoomIcon } from "../../../icons";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import {
  changeZoom,
  getMarkupState,
  getZoom,
  resetZoom,
  toggleMarkup,
} from "../../../redux/shapes/slice";

export const ConstructorControl = () => {
  const zoom = useAppSelector(getZoom);
  const markupEnabled = useAppSelector(getMarkupState);
  const dispatch = useAppDispatch();

  const handleMarkupToggle = () => {
    dispatch(toggleMarkup());
  };

  const handleZoomChange = (mode: "add" | "subtract") => {
    dispatch(changeZoom({ mode }));
  };

  const handleZoomReset = () => {
    dispatch(resetZoom());
  };

  return (
    <div className={styles.container}>
      {zoom > 1 && (
        <button className={styles.button} onClick={handleZoomReset}>
          <ZoomIcon />
        </button>
      )}
      <button
        className={styles.button}
        onClick={() => handleZoomChange("subtract")}
        disabled={zoom <= 1}
      >
        <MinusIcon />
      </button>
      <button
        className={styles.button}
        onClick={() => handleZoomChange("add")}
        disabled={zoom >= 3}
      >
        <PlusIcon />
      </button>
      <button
        onClick={handleMarkupToggle}
        className={styles.button}
        aria-checked={markupEnabled}
      >
        <MarkupIcon />
      </button>
    </div>
  );
};
