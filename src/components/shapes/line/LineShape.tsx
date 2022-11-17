import { LineShapeI } from "../../../entities/shape";
import cx from "classnames";
import shapeStyles from "../Shape.module.css";
import { ShapeItemProps } from "../Shape";

type LineShapeProps = ShapeItemProps<LineShapeI>;

export const LineShape = ({
  shape,
  strokeCN,
  backgroundCN,
  width,
  height,
}: LineShapeProps) => {
  return (
    <svg
      width={width + 20}
      height={height}
      className={cx(shapeStyles[strokeCN], shapeStyles[backgroundCN])}
      style={{ transform: `rotate(${shape.rotation}deg)` }}
    >
      <line
        x1={10}
        x2={width + 10}
        y1={height / 2}
        y2={height / 2}
        strokeWidth={shape.strokeWidth}
        strokeLinecap={"round"}
      />
    </svg>
  );
};
