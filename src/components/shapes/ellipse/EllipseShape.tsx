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
}: EllipseShapeProps) => {
  return (
    <svg
      width={shape.width + 20}
      height={shape.height + 20}
      className={cx(
        shapeStyles[fillCN],
        shapeStyles[strokeCN],
        shapeStyles[backgroundCN]
      )}
      style={{ transform: `rotate(${shape.rotation}deg)` }}
    >
      <ellipse
        cx={shape.width / 2 + 10}
        cy={shape.height / 2 + 10}
        rx={shape.width / 2}
        ry={shape.height / 2}
        strokeWidth={shape.strokeWidth}
      />
    </svg>
  );
};
