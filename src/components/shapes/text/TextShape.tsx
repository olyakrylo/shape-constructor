import { ShapeItemProps } from "../Shape";
import { Color, TextShapeI } from "../../../entities/shape";
import cx from "classnames";
import styles from "./TextShape.module.css";

type TextShapeProps = ShapeItemProps<TextShapeI>;

export const TextShape = ({
  shape,
  onChangeData,
  width,
  height,
}: TextShapeProps) => {
  return (
    <div
      className={cx(styles.container)}
      style={{
        width,
        height,
        transform: `rotate(${shape.rotation}deg)`,
        color: shape.color === Color.none ? "transparent" : shape.color,
        background: shape.background,
      }}
    >
      <input
        placeholder={"Enter Text"}
        className={cx(styles.input)}
        style={{
          fontSize: shape.fontSize,
        }}
        onChange={onChangeData}
        value={shape.data}
        onKeyDown={(e) => e.stopPropagation()}
      />
    </div>
  );
};
