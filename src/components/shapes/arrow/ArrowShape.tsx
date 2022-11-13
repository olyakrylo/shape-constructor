import { ArrowShapeI } from "../../../entities/shape";
import { ShapeItemProps } from "../Shape";
import cx from "classnames";
import shapeStyles from "../Shape.module.css";

type ArrowShapeProps = ShapeItemProps<ArrowShapeI>;

export const ArrowShape = ({ shape, strokeCN }: ArrowShapeProps) => {
  return (
    <svg
      width={shape.width + 20}
      height={shape.height}
      className={cx(shapeStyles[strokeCN])}
      style={{ transform: `rotate(${shape.rotation}deg)` }}
    >
      <g strokeWidth={shape.strokeWidth} strokeLinecap={"round"}>
        <line
          x1={10}
          x2={shape.width + 10}
          y1={shape.height / 2}
          y2={shape.height / 2}
        />
        <line
          x1={shape.width + 10 - shape.width / 10}
          x2={shape.width + 10}
          y1={10}
          y2={shape.height / 2}
        />
        <line
          x1={shape.width + 10 - shape.width / 10}
          x2={shape.width + 10}
          y1={shape.height - 10}
          y2={shape.height / 2}
        />
      </g>
    </svg>
  );
};
