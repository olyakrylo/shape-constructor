import { ShapeItemProps } from "../Shape";
import { TextShapeI } from "../../../entities/shape";
import cx from "classnames";
import shapeStyles from "../Shape.module.css";
import styles from "./TextShape.module.css";

type TextShapeProps = ShapeItemProps<TextShapeI>;

export const TextShape = ({
  shape,
  colorCN,
  backgroundCN,
  onChangeData,
  width,
  height,
}: TextShapeProps) => {
  return (
    <div
      className={cx(
        shapeStyles[backgroundCN],
        shapeStyles[colorCN],
        styles.container
      )}
      style={{
        width,
        height,
        transform: `rotate(${shape.rotation}deg)`,
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
