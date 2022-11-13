import {
  DRAG_DIRS,
  DragDir,
  ROTATION_DIRS,
  ShapeI,
  ShapeType,
} from "../../entities/shape";
import styles from "./Shape.module.css";
import { RectangleShape } from "./rectangle/RectangleShape";
import { EllipseShape } from "./ellipse/EllipseShape";
import { LineShape } from "./line/LineShape";
import { ArrowShape } from "./arrow/ArrowShape";
import { DragDropHandler } from "../../hooks/useShapeDragDrop";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import {
  getSelectedShapeId,
  selectShape,
  setShapeCoords,
  setShapeValue,
} from "../../redux/shapes/slice";
import React, { MouseEventHandler } from "react";
import cx from "classnames";
import { usePointDragDrop } from "../../hooks/usePointDragDrop";
import { useRotationDragDrop } from "../../hooks/useRotationDragDrop";

export type ShapeProps = {
  shape: ShapeI;
  dragDropHandler: DragDropHandler;
};

export interface ShapeItemProps<T extends ShapeI> {
  shape: T;
  fillCN: string;
  strokeCN: string;
}

export const Shape = ({ shape, dragDropHandler }: ShapeProps) => {
  const dispatch = useAppDispatch();
  const selectedShapeId = useAppSelector(getSelectedShapeId);
  const pointDragDrop = usePointDragDrop({ shape });
  const rotationDragDrop = useRotationDragDrop({ shape });

  const getShape = () => {
    const fillCN = `fill_${shape.fill}`;
    const strokeCN = `stroke_${shape.stroke}`;

    switch (shape.type) {
      case ShapeType.rect:
        return (
          <RectangleShape shape={shape} fillCN={fillCN} strokeCN={strokeCN} />
        );

      case ShapeType.ellipse:
        return (
          <EllipseShape shape={shape} fillCN={fillCN} strokeCN={strokeCN} />
        );

      case ShapeType.line:
        return <LineShape shape={shape} fillCN={fillCN} strokeCN={strokeCN} />;

      case ShapeType.arrow:
        return <ArrowShape shape={shape} fillCN={fillCN} strokeCN={strokeCN} />;
    }
  };

  const select: MouseEventHandler<HTMLDivElement> = (event) => {
    event.stopPropagation();
    dispatch(selectShape({ id: shape.id }));
  };

  const isSelected = () => {
    return selectedShapeId === shape.id;
  };

  return (
    <div
      id={shape.id}
      className={styles.container}
      aria-selected={isSelected()}
      onClick={select}
      style={{
        transform: `translate(${shape.left}px, ${shape.top}px)`,
      }}
      {...dragDropHandler}
    >
      {getShape()}
      {isSelected() && (
        <>
          <div
            className={styles.border}
            style={{ transform: `rotate(${shape.rotation}deg)` }}
          >
            {DRAG_DIRS.map((dir) => {
              const dirCN = `point_${dir}`;
              return (
                <button
                  key={dir}
                  data-dir={dir}
                  className={cx(styles.point, styles[dirCN])}
                  onMouseDown={(e) => pointDragDrop.handleDrag(e, dir)}
                />
              );
            })}

            <button
              className={cx(styles.rotation, styles.rotation_br)}
              onMouseDown={rotationDragDrop.handleDrag}
            />
            {/*{ROTATION_DIRS.map((dir) => {*/}
            {/*  const dirCN = `rotation_${dir}`;*/}
            {/*  return (*/}
            {/*    <button*/}
            {/*      key={dir}*/}
            {/*      className={cx(styles.rotation, styles[dirCN])}*/}
            {/*      onMouseDown={rotationDragDrop.handleDrag}*/}
            {/*    />*/}
            {/*  );*/}
            {/*})}*/}
          </div>
        </>
      )}
    </div>
  );
};
