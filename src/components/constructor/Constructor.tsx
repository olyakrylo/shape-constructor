import styles from "./Constructor.module.css";
import containerStyles from "../lib/container.module.css";
import {
  getMarkupState,
  getShapes,
  getZoom,
  isShapeDragging,
  selectShape,
} from "../../redux/shapes/slice";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { Shape } from "../shapes/Shape";
import { useShapeDragDrop } from "../../hooks/useShapeDragDrop";
import { useEffect, useRef } from "react";
import { useShapeControl } from "../../hooks/useShapeControl";
import { markupLines } from "./markup";
import cx from "classnames";
import { ConstructorControl } from "./control/ConstructorControl";

export const Constructor = () => {
  useShapeControl();

  const dispatch = useAppDispatch();
  const shapes = useAppSelector(getShapes);
  const dragging = useAppSelector(isShapeDragging);
  const markupEnabled = useAppSelector(getMarkupState);
  const zoom = useAppSelector(getZoom);
  const shapeDragDrop = useShapeDragDrop();
  const canvasRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (canvasRef.current) {
      const { x, y, width, height } = canvasRef.current.getBoundingClientRect();
      shapeDragDrop.setContainerOptions({ top: y, left: x, width, height });
    }
  });

  const resetSelectedShape = () => {
    dispatch(selectShape({ id: null }));
  };

  return (
    <div className={containerStyles.container}>
      <div className={cx(containerStyles.title, styles.header)}>
        <p>Constructor</p>
        <ConstructorControl />
      </div>

      <div className={styles.canvasContainer}>
        <div
          ref={canvasRef}
          className={styles.canvas}
          onClick={resetSelectedShape}
          style={{ width: `${100 * zoom}%`, height: `${100 * zoom}%` }}
        >
          <svg className={styles.markup} aria-hidden={!markupEnabled}>
            {markupLines()}
          </svg>

          {Object.values(shapes).map((shape) => (
            <Shape
              key={shape.id}
              shape={shape}
              dragDropHandler={shapeDragDrop.dragDropHandler}
              containerWidth={
                canvasRef.current?.getBoundingClientRect().width ?? 0
              }
              containerHeight={
                canvasRef.current?.getBoundingClientRect().height ?? 0
              }
            />
          ))}
        </div>

        {dragging && <div className={styles.overlay} />}
      </div>
    </div>
  );
};
