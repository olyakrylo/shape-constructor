import { EllipseShapeI } from "../../../entities/shape";
import { ShapeItemProps } from "../Shape";
import cx from "classnames";
import shapeStyles from "../Shape.module.css";

type EllipseShapeProps = ShapeItemProps<EllipseShapeI>;

export const EllipseShape = ({
  shape,
  fillCN,
  strokeCN,
  backgroundCN,
  width,
  height,
}: EllipseShapeProps) => {
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
      <ellipse
        cx={width / 2 + 10}
        cy={height / 2 + 10}
        rx={width / 2}
        ry={height / 2}
        strokeWidth={shape.strokeWidth}
      />
    </svg>
  );
};
