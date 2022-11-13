import { useAppDispatch } from "../redux/hooks";
import { DragDir, ShapeI } from "../entities/shape";
import React from "react";
import {
  setDragging,
  setShapeCoords,
  setShapeValue,
} from "../redux/shapes/slice";

type UsePointDragDropProps = { shape: ShapeI };

export const usePointDragDrop = ({ shape }: UsePointDragDropProps) => {
  const dispatch = useAppDispatch();

  const handlePointMouseDown = (
    event: React.MouseEvent<HTMLButtonElement>,
    direction: DragDir
  ) => {
    event.stopPropagation();
    let { clientX: startX, clientY: startY } = event;
    dispatch(setDragging(true));

    const handleMove = (moveEvent: MouseEvent) => {
      const { clientX: currX, clientY: currY } = moveEvent;
      const diffX = startX - currX;
      const diffY = startY - currY;

      let newHeight;
      let newWidth;
      let newTop;
      let newLeft;

      direction.split("_").forEach((dir) => {
        switch (dir) {
          case "top":
            if (shape.height + diffY > 0) {
              newHeight = shape.height + diffY;
              newTop = shape.top - diffY;
            }
            break;

          case "right":
            if (shape.width - diffX > 0) {
              newWidth = shape.width - diffX;
            }
            break;

          case "bottom":
            if (shape.height - diffY > 0) {
              newHeight = shape.height - diffY;
            }
            break;

          case "left":
            if (shape.width + diffX > 0) {
              newWidth = shape.width + diffX;
              newLeft = shape.left - diffX;
            }
        }
      });

      if (newHeight) {
        dispatch(
          setShapeValue({ id: shape.id, prop: "height", value: newHeight })
        );
      }
      if (newWidth) {
        dispatch(
          setShapeValue({ id: shape.id, prop: "width", value: newWidth })
        );
      }
      if (newTop || newLeft) {
        dispatch(
          setShapeCoords({
            id: shape.id,
            top: newTop ?? shape.top,
            left: newLeft ?? shape.left,
          })
        );
      }
    };

    const handleMouseUp = () => {
      document.removeEventListener("mousemove", handleMove);
      document.removeEventListener("mouseup", handleMouseUp);
      dispatch(setDragging(false));
    };

    document.addEventListener("mousemove", handleMove);
    document.addEventListener("mouseup", handleMouseUp);
  };

  return {
    handleDrag: handlePointMouseDown,
  };
};
