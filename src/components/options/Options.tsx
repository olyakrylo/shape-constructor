import containerStyles from "../lib/container.module.css";
import listStyles from "../lib/list.module.css";
import colorStyles from "../lib/colors.module.css";
import styles from "./Options.module.css";
import cx from "classnames";
import { PolygonArrowDown } from "../../icons";
import {
  COLOR_OPTIONS,
  ColorOptionI,
  COLORS,
  ColorShapeProp,
  OptionI,
  VALUE_OPTIONS,
  ValueOptionI,
  ValueShapeProp,
} from "../../entities/options";
import { useAppSelector } from "../../redux/hooks";
import { getSelectedShape } from "../../redux/shapes/slice";
import { Color } from "../../entities/shape";
import { KeyboardEvent } from "react";
import { useOptions } from "../../hooks/useOptions";

export const Options = () => {
  const selectedShape = useAppSelector(getSelectedShape);
  const options = useOptions();

  if (!selectedShape) return null;

  const filterOptions = <T extends OptionI>(options: T[]): T[] => {
    return options.filter((op) => op.on.has(selectedShape.type));
  };

  const handleColorChange = (prop: ColorShapeProp, color: Color) => {
    options.changeColor(selectedShape.id, prop, color);
  };

  const handleInputChange = (prop: ValueShapeProp, value: string) => {
    options.handleStringValue(selectedShape.id, prop, value);
  };

  const handleInputKeyDown = (
    event: KeyboardEvent<HTMLInputElement>,
    prop: ValueShapeProp
  ) => {
    options.handleKeyDown(event, selectedShape.id, prop);
  };

  const handleValueChange = (
    prop: ValueShapeProp,
    operator: "add" | "subtract"
  ) => {
    options.changeValue(selectedShape.id, prop, operator);
  };

  const handleRemove = () => {
    options.remove(selectedShape.id);
  };

  return (
    <div className={cx(containerStyles.container, styles.container)}>
      <p className={containerStyles.title}>Options</p>
      <ul className={listStyles.list}>
        {filterOptions<ValueOptionI>(VALUE_OPTIONS).map(
          ({ property, name }) => (
            <li key={name} className={cx(listStyles.item, styles.option)}>
              <span className={styles.option__name}>{name}</span>
              <div className={styles.size}>
                <button
                  className={cx(styles.size__button, styles.lower)}
                  onClick={() => handleValueChange(property, "subtract")}
                >
                  <PolygonArrowDown className={styles.button__icon} />
                </button>
                <input
                  value={selectedShape[property]}
                  onChange={(e) => handleInputChange(property, e.target.value)}
                  onKeyDown={(e) => handleInputKeyDown(e, property)}
                  className={styles.size__input}
                />
                <button
                  className={cx(styles.size__button, styles.higher)}
                  onClick={() => handleValueChange(property, "add")}
                >
                  <PolygonArrowDown className={styles.button__icon} />
                </button>
              </div>
            </li>
          )
        )}

        {filterOptions<ColorOptionI>(COLOR_OPTIONS).map((option) => (
          <li key={option.name} className={cx(listStyles.item, styles.option)}>
            <span className={styles.option__name}>{option.name}</span>
            <div className={colorStyles.container}>
              {COLORS.map((color) => (
                <button
                  key={color}
                  onClick={() => handleColorChange(option.property, color)}
                  aria-selected={color === selectedShape[option.property]}
                  className={cx(colorStyles.item, colorStyles[color])}
                />
              ))}
            </div>
          </li>
        ))}

        <li>
          <button
            onClick={handleRemove}
            className={cx(listStyles.item, styles.option, styles.option_remove)}
          >
            Remove
          </button>
        </li>
      </ul>
    </div>
  );
};
