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
  containerWidth: number;
  containerHeight: number;
};

export interface ShapeItemProps<T extends ShapeI> {
  shape: T;
  width: number;
  height: number;
  onChangeData: (
    event: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => void;
}

export const Shape = ({
  shape,
  dragDropHandler,
  containerWidth,
  containerHeight,
}: ShapeProps) => {
  const dispatch = useAppDispatch();
  const selectedShapeId = useAppSelector(getSelectedShapeId);
  const pointDragDrop = usePointDragDrop({
    shape,
    containerWidth,
    containerHeight,
  });
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
    const props: Omit<ShapeItemProps<any>, "shape"> = {
      width: containerWidth * shape.width,
      height: containerHeight * shape.height,
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

  const getTransform = () => {
    const x = shape.left * containerWidth;
    const y = shape.top * containerHeight;
    return `translate(${x}px, ${y}px)`;
  };

  return (
    <div
      id={shape.id}
      className={styles.container}
      aria-selected={isSelected()}
      onClick={select}
      style={{
        transform: getTransform(),
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
