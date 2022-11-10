import { ColorShapeProp, ValueShapeProp } from "../entities/options";
import { Color } from "../entities/shape";
import {
  getShapes,
  removeShape,
  setShapeColor,
  setShapeValue,
} from "../redux/shapes/slice";
import { KeyboardEvent } from "react";
import { useAppDispatch, useAppSelector } from "../redux/hooks";

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
    const numValue = parseInt(value, 10);
    if (!Object.is(numValue, NaN)) {
      dispatch(setShapeValue({ id, prop, value: numValue }));
    } else {
      dispatch(setShapeValue({ id, prop, value: 0 }));
    }
  };

  const handleKeyDown = (
    event: KeyboardEvent<HTMLInputElement>,
    id: string,
    prop: ValueShapeProp
  ) => {
    let oldValue = shapes[id][prop];
    if (event.key === "ArrowUp") {
      dispatch(setShapeValue({ id, prop, value: oldValue + 1 }));
    } else if (event.key === "ArrowDown") {
      dispatch(setShapeValue({ id, prop, value: oldValue - 1 }));
    }
  };

  const changeValue = (
    id: string,
    prop: ValueShapeProp,
    operator: "add" | "subtract"
  ) => {
    const oldValue = shapes[id][prop];
    switch (operator) {
      case "add":
        dispatch(setShapeValue({ id, prop, value: oldValue + 1 }));
        break;

      case "subtract":
        dispatch(setShapeValue({ id, prop, value: oldValue - 1 }));
        break;
    }
  };

  const remove = (id: string) => {
    dispatch(removeShape({ id }));
  };

  return { changeColor, changeValue, remove, handleStringValue, handleKeyDown };
};
