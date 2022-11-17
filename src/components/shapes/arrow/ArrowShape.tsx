import { ArrowShapeI } from "../../../entities/shape";
import { ShapeItemProps } from "../Shape";
import cx from "classnames";
import shapeStyles from "../Shape.module.css";

type ArrowShapeProps = ShapeItemProps<ArrowShapeI>;

export const ArrowShape = ({
  shape,
  strokeCN,
  backgroundCN,
  width,
  height,
}: ArrowShapeProps) => {
  return (
    <svg
      width={width + 20}
      height={height}
      className={cx(shapeStyles[strokeCN], shapeStyles[backgroundCN])}
      style={{ transform: `rotate(${shape.rotation}deg)` }}
    >
      <g strokeWidth={shape.strokeWidth} strokeLinecap={"round"}>
        <line x1={10} x2={width + 10} y1={height / 2} y2={height / 2} />
        <line
          x1={width + 10 - width / 10}
          x2={width + 10}
          y1={10}
          y2={height / 2}
        />
        <line
          x1={width + 10 - width / 10}
          x2={width + 10}
          y1={height - 10}
          y2={height / 2}
        />
      </g>
    </svg>
  );
};
