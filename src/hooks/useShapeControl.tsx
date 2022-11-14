import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import {
  copyShape,
  getSelectedShape,
  removeShape,
  setShapeCoords,
} from "../redux/shapes/slice";
import { ShapeI } from "../entities/shape";
import { ARROW_KEYS, ArrowKey, EventKey } from "../entities/events";

export const useShapeControl = () => {
  const selectedShape = useAppSelector(getSelectedShape);
  const dispatch = useAppDispatch();

  const [copiedShape, setCopiedShape] = useState<ShapeI>();

  useEffect(() => {
    const keyboardHandler = (event: KeyboardEvent) => {
      if (!selectedShape) return;

      if (event.key === EventKey.backspace) {
        dispatch(removeShape({ id: selectedShape.id }));
      } else if (ARROW_KEYS.has(event.key)) {
        let shift = 1;
        if (event.shiftKey) shift = 10;
        if (event.ctrlKey || event.metaKey) {
          if (event.key === ArrowKey.up || event.key === ArrowKey.down) {
            shift = selectedShape.height;
          } else {
            shift = selectedShape.width;
          }
        }

        let { top, left } = selectedShape;
        if (event.key === ArrowKey.up) {
          top -= shift;
        } else if (event.key === ArrowKey.down) {
          top += shift;
        } else if (event.key === ArrowKey.left) {
          left -= shift;
        } else if (event.key === ArrowKey.right) {
          left += shift;
        }

        if (top !== selectedShape.top || left !== selectedShape.left) {
          dispatch(setShapeCoords({ id: selectedShape.id, top, left }));
        }
      }
    };

    document.addEventListener("keydown", keyboardHandler);
    return () => document.removeEventListener("keydown", keyboardHandler);
  });

  useEffect(() => {
    const copyHandler = () => {
      if (!selectedShape) return;
      setCopiedShape(selectedShape);
    };

    const pasteHandler = () => {
      if (!copiedShape) return;
      dispatch(copyShape({ shape: copiedShape }));
    };

    document.addEventListener("copy", copyHandler);
    document.addEventListener("paste", pasteHandler);
    return () => {
      document.removeEventListener("copy", copyHandler);
      document.removeEventListener("paste", pasteHandler);
    };
  });
};
