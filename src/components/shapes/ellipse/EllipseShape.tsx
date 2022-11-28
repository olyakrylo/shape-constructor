import { EllipseShapeI } from "../../../entities/shape";
import { ShapeItemProps } from "../Shape";

type EllipseShapeProps = ShapeItemProps<EllipseShapeI>;

export const EllipseShape = ({ shape, width, height }: EllipseShapeProps) => {
  return (
    <svg
      width={width + 20}
      height={height + 20}
      fill={shape.fill}
      stroke={shape.stroke}
      style={{
        transform: `rotate(${shape.rotation}deg)`,
        background: shape.background,
      }}
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
