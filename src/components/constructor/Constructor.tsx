import styles from "./Constructor.module.css";
import containerStyles from "../lib/container.module.css";
import {
  getShapes,
  isShapeDragging,
  selectShape,
} from "../../redux/shapes/slice";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { Shape } from "../shapes/Shape";
import { useShapeDragDrop } from "../../hooks/useShapeDragDrop";
import { useEffect, useRef, MouseEvent } from "react";

export const Constructor = () => {
  const dispatch = useAppDispatch();
  const shapes = useAppSelector(getShapes);
  const dragging = useAppSelector(isShapeDragging);
  const shapeDragDrop = useShapeDragDrop();
  const canvasRef = useRef<null | HTMLDivElement>(null);

  useEffect(() => {
    if (canvasRef.current) {
      const { x, y, width, height } = canvasRef.current.getBoundingClientRect();
      shapeDragDrop.setContainerOptions({ top: y, left: x, width, height });
    }
  });

  const resetSelectedShape = (event: MouseEvent) => {
    console.log(event);
    dispatch(selectShape({ id: null }));
  };

  return (
    <div className={containerStyles.container}>
      <p className={containerStyles.title}>Constructor</p>
      <div
        ref={canvasRef}
        className={styles.canvas}
        onClick={resetSelectedShape}
      >
        {dragging && <div className={styles.overlay} />}
        {Object.values(shapes).map((shape) => (
          <Shape
            key={shape.id}
            shape={shape}
            dragDropHandler={shapeDragDrop.dragDropHandler}
          />
        ))}
      </div>
    </div>
  );
};
