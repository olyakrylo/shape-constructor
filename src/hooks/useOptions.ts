import { ColorShapeProp, ValueShapeProp } from "../entities/options";
import { Color, MAX_VALUE, MIN_VALUE } from "../entities/shape";
import {
  getShapes,
  removeShape,
  setShapeColor,
  setShapeValue,
} from "../redux/shapes/slice";
import { KeyboardEvent } from "react";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { ARROW_KEYS, ArrowKey } from "../entities/events";

export const useOptions = () => {
  const shapes = useAppSelector(getShapes);
  const dispatch = useAppDispatch();

  const changeColor = (id: string, prop: ColorShapeProp, color: Color) => {
    dispatch(
      setShapeColor({
        id,
        color,
        prop,
      })
    );
  };

  const handleStringValue = (
    id: string,
    prop: ValueShapeProp,
    value: string
  ) => {
    const numValue = Math.round(parseFloat(value) * 100) / 100;
    if (!Object.is(numValue, NaN)) {
      const value = Math.max(
        Math.min(MAX_VALUE(prop), numValue),
        MIN_VALUE(prop)
      );
      dispatch(setShapeValue({ id, prop, value }));
    } else {
      dispatch(setShapeValue({ id, prop, value: MIN_VALUE(prop) }));
    }
  };

  const handleKeyDown = (
    event: KeyboardEvent<HTMLInputElement>,
    id: string,
    prop: ValueShapeProp
  ) => {
    event.stopPropagation();
    if (!ARROW_KEYS.has(event.key)) return;

    let oldValue = shapes[id][prop];
    if (event.key === ArrowKey.up) {
      dispatch(
        setShapeValue({ id, prop, value: getNewValue(prop, oldValue, "add") })
      );
    } else if (event.key === ArrowKey.down) {
      dispatch(
        setShapeValue({
          id,
          prop,
          value: getNewValue(prop, oldValue, "subtract"),
        })
      );
    }
  };

  const changeValue = (
    id: string,
    prop: ValueShapeProp,
    operator: "add" | "subtract"
  ) => {
    const oldValue = shapes[id][prop];
    const newValue = getNewValue(prop, oldValue, operator);
    dispatch(setShapeValue({ id, prop, value: newValue }));
  };

  const getNewValue = (
    prop: ValueShapeProp,
    oldValue: number,
    operator: "add" | "subtract"
  ): number => {
    let newValue;
    switch (operator) {
      case "add":
        newValue = oldValue + 1;
        return Math.min(MAX_VALUE(prop), newValue);

      case "subtract":
        newValue = oldValue - 1;
        return Math.max(MIN_VALUE(prop), newValue);
    }
  };

  const remove = (id: string) => {
    dispatch(removeShape({ id }));
  };

  return { changeColor, changeValue, remove, handleStringValue, handleKeyDown };
};
