import { RectangleShapeI } from "../../../entities/shape";
import shapeStyles from "../Shape.module.css";
import cx from "classnames";
import { ShapeItemProps } from "../Shape";

type RectangleShapeProps = ShapeItemProps<RectangleShapeI>;

export const RectangleShape = ({
  shape,
  fillCN,
  strokeCN,
}: RectangleShapeProps) => {
  return (
    <svg
      width={shape.width + 20}
      height={shape.height + 20}
      className={cx(shapeStyles[fillCN], shapeStyles[strokeCN])}
      style={{ transform: `rotate(${shape.rotate}deg)` }}
    >
      <rect
        x={10}
        y={10}
        width={shape.width}
        height={shape.height}
        strokeWidth={shape.strokeWidth}
      />
    </svg>
  );
};
