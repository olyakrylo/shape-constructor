import styles from "./ColorPicker.module.css";
import { useState } from "react";
import colorStyles from "../../lib/colors.module.css";
import cx from "classnames";
import { Color } from "../../../entities/shape";
import { ColorIcon } from "../../../icons";
import { BlockPicker } from "react-color";
import { ColorShapeProp, PRESET_COLORS } from "../../../entities/options";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import { getSelectedShape, setShapeColor } from "../../../redux/shapes/slice";

type ColorPickerProps = {
  property: ColorShapeProp;
};

export const ColorPicker = ({ property }: ColorPickerProps) => {
  const selectedShape = useAppSelector(getSelectedShape);
  const dispatch = useAppDispatch();

  const [pickerOpen, setPickerOpen] = useState(false);

  const togglePicker = () => {
    setPickerOpen(!pickerOpen);
  };

  const setColor = (color: string) => {
    if (!selectedShape) return;
    console.log(selectedShape, property, color);
    dispatch(setShapeColor({ id: selectedShape.id, prop: property, color }));
  };

  if (!selectedShape) {
    return <></>;
  }

  return (
    <div className={styles.container}>
      {pickerOpen && <div className={styles.overlay} onClick={togglePicker} />}

      <button
        aria-selected={selectedShape[property] === Color.black}
        className={cx(colorStyles.item, colorStyles.black)}
        onClick={() => setColor("var(--dark)")}
      />
      <button
        aria-selected={selectedShape[property] === Color.none}
        className={cx(colorStyles.item, colorStyles.none)}
        onClick={() => setColor(Color.none)}
      />
      <button className={styles.pickerToggle} onClick={togglePicker}>
        <ColorIcon />
      </button>

      <div className={styles.picker} aria-hidden={!pickerOpen}>
        <BlockPicker
          triangle={"hide"}
          colors={PRESET_COLORS}
          color={selectedShape[property]}
          onChange={(event) => setColor(event.hex)}
        />
      </div>
    </div>
  );
};
