import { RectangleShapeI } from "../../../entities/shape";
import { ShapeItemProps } from "../Shape";

type RectangleShapeProps = ShapeItemProps<RectangleShapeI>;

export const RectangleShape = ({
  shape,
  width,
  height,
}: RectangleShapeProps) => {
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
