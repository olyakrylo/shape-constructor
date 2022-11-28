import { ArrowShapeI } from "../../../entities/shape";
import { ShapeItemProps } from "../Shape";

type ArrowShapeProps = ShapeItemProps<ArrowShapeI>;

export const ArrowShape = ({ shape, width, height }: ArrowShapeProps) => {
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
