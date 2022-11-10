import { ShapeI, ShapeType } from "../../entities/shape";
import styles from "./Shape.module.css";
import { RectangleShape } from "./rectangle/RectangleShape";
import { EllipseShape } from "./ellipse/EllipseShape";
import { LineShape } from "./line/LineShape";
import { ArrowShape } from "./arrow/ArrowShape";
import { DragDropHandler } from "../../hooks/useShapeDragDrop";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { getSelectedShapeId, selectShape } from "../../redux/shapes/slice";
import { MouseEventHandler } from "react";

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
      className={styles.container}
      aria-selected={isSelected()}
      onClick={select}
      {...dragDropHandler}
    >
      {getShape()}
      {isSelected() && (
        <div
          className={styles.border}
          style={{ transform: `rotate(${shape.rotate}deg)` }}
        />
      )}
    </div>
  );
};
