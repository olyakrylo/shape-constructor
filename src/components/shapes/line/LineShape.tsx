import { LineShapeI } from "../../../entities/shape";
import { ShapeItemProps } from "../Shape";

type LineShapeProps = ShapeItemProps<LineShapeI>;

export const LineShape = ({ shape, width, height }: LineShapeProps) => {
  return (
    <svg
      width={width + 20}
      height={height}
      stroke={shape.stroke}
      style={{
        transform: `rotate(${shape.rotation}deg)`,
        background: shape.background,
      }}
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
