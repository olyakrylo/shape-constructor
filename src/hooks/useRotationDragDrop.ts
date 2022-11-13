import { useAppDispatch } from "../redux/hooks";
import React from "react";
import { ShapeI } from "../entities/shape";
import { setDragging, setShapeValue } from "../redux/shapes/slice";

type UseRotationDragDropProps = { shape: ShapeI };

export const useRotationDragDrop = ({ shape }: UseRotationDragDropProps) => {
  const dispatch = useAppDispatch();

  const atan = (a: number, b: number) => {
    return (Math.atan(a / b) * 180) / Math.PI;
  };

  const handleMouseDown = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    const shapeElement = document.getElementById(shape.id);
    if (!shapeElement) return;

    dispatch(setDragging(true));
    const { x, y, width, height } = shapeElement.getBoundingClientRect();
    const centerX = x + width / 2;
    const centerY = y + height / 2;

    const alpha = atan(width, height);

    const handleMove = (moveEvent: MouseEvent) => {
      const { clientX: currX, clientY: currY } = moveEvent;
      const diffX = currX - centerX;
      const diffY = currY - centerY;

      let quarter = 0;
      let beta = 0;

      if (diffX >= 0 && diffY > 0) {
        beta = atan(diffX, diffY);
      } else if (diffX < 0 && diffY >= 0) {
        beta = atan(diffY, -diffX);
        quarter = 1;
      } else if (diffX <= 0 && diffY < 0) {
        beta = atan(diffX, diffY);
        quarter = 2;
      } else if (diffX > 0 && diffY <= 0) {
        beta = atan(-diffY, diffX);
        quarter = 3;
      }

      const rotation = alpha + quarter * 90 - beta;

      dispatch(
        setShapeValue({
          id: shape.id,
          prop: "rotation",
          value: Math.round(rotation),
        })
      );
    };

    const handleMouseUp = (e: MouseEvent) => {
      e.preventDefault();
      document.removeEventListener("mousemove", handleMove);
      document.removeEventListener("mouseup", handleMouseUp);
      dispatch(setDragging(false));
    };

    document.addEventListener("mousemove", handleMove);
    document.addEventListener("mouseup", handleMouseUp);
  };

  return {
    handleDrag: handleMouseDown,
  };
};
