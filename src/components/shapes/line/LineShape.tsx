import { LineShapeI } from "../../../entities/shape";
import cx from "classnames";
import shapeStyles from "../Shape.module.css";
import { ShapeItemProps } from "../Shape";

type LineShapeProps = ShapeItemProps<LineShapeI>;

export const LineShape = ({ shape, strokeCN }: LineShapeProps) => {
  return (
    <svg
      width={shape.width + 20}
      height={shape.height}
      className={cx(shapeStyles[strokeCN])}
      style={{ transform: `rotate(${shape.rotate}deg)` }}
    >
      <line
        x1={10}
        x2={shape.width + 10}
        y1={shape.height / 2}
        y2={shape.height / 2}
        strokeWidth={shape.strokeWidth}
        strokeLinecap={"round"}
      />
    </svg>
  );
};
