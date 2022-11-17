import { RectangleShapeI } from "../../../entities/shape";
import shapeStyles from "../Shape.module.css";
import cx from "classnames";
import { ShapeItemProps } from "../Shape";

type RectangleShapeProps = ShapeItemProps<RectangleShapeI>;

export const RectangleShape = ({
  shape,
  fillCN,
  strokeCN,
  backgroundCN,
  width,
  height,
}: RectangleShapeProps) => {
  return (
    <svg
      width={width + 20}
      height={height + 20}
      className={cx(
        shapeStyles[fillCN],
        shapeStyles[strokeCN],
        shapeStyles[backgroundCN]
      )}
      style={{ transform: `rotate(${shape.rotation}deg)` }}
    >
      <rect
        x={10}
        y={10}
        width={width}
        height={height}
        strokeWidth={shape.strokeWidth}
      />
    </svg>
  );
};
