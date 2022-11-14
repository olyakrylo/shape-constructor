import { DRAG_DIRS, ShapeI, ShapeType } from "../../entities/shape";
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
  setShapeData,
} from "../../redux/shapes/slice";
import React, {
  ChangeEvent,
  ChangeEventHandler,
  MouseEventHandler,
} from "react";
import cx from "classnames";
import { usePointDragDrop } from "../../hooks/usePointDragDrop";
import { useRotationDragDrop } from "../../hooks/useRotationDragDrop";
import { TextShape } from "./text/TextShape";
import { useOptions } from "../../hooks/useOptions";

export type ShapeProps = {
  shape: ShapeI;
  dragDropHandler: DragDropHandler;
};

export interface ShapeItemProps<T extends ShapeI> {
  shape: T;
  fillCN: string;
  strokeCN: string;
  colorCN: string;
  backgroundCN: string;
  onChangeData: (
    event: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => void;
}

export const Shape = ({ shape, dragDropHandler }: ShapeProps) => {
  const dispatch = useAppDispatch();
  const selectedShapeId = useAppSelector(getSelectedShapeId);
  const pointDragDrop = usePointDragDrop({ shape });
  const rotationDragDrop = useRotationDragDrop({ shape });
  const options = useOptions();

  const handleValueChange: ChangeEventHandler<
    HTMLTextAreaElement | HTMLInputElement
  > = (event) => {
    event.stopPropagation();
    const { value } = event.target;
    dispatch(setShapeData({ id: shape.id, value }));
  };

  const getShape = () => {
    const fillCN = `fill_${shape.fill}`;
    const strokeCN = `stroke_${shape.stroke}`;
    const colorCN = `color_${shape.color}`;
    const backgroundCN = `bg_${shape.background}`;

    const props: Omit<ShapeItemProps<any>, "shape"> = {
      fillCN,
      strokeCN,
      colorCN,
      backgroundCN,
      onChangeData: handleValueChange,
    };

    switch (shape.type) {
      case ShapeType.rect:
        return <RectangleShape shape={shape} {...props} />;

      case ShapeType.ellipse:
        return <EllipseShape shape={shape} {...props} />;

      case ShapeType.line:
        return <LineShape shape={shape} {...props} />;

      case ShapeType.arrow:
        return <ArrowShape shape={shape} {...props} />;

      case ShapeType.text:
        return <TextShape shape={shape} {...props} />;
    }
  };

  const select: MouseEventHandler<HTMLDivElement> = (event) => {
    event.stopPropagation();
    dispatch(selectShape({ id: shape.id }));
  };

  const isSelected = () => {
    return selectedShapeId === shape.id;
  };

  const handleRemove = () => {
    options.remove(shape.id);
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
              className={cx(styles.rotation)}
              onMouseDown={rotationDragDrop.handleDrag}
            />

            <button className={cx(styles.remove)} onClick={handleRemove} />
          </div>
        </>
      )}
      {getShape()}
    </div>
  );
};
