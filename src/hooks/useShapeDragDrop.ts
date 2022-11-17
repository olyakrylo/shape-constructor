import { useState, MouseEventHandler } from "react";
import { useAppDispatch } from "../redux/hooks";
import { setShapeCoords } from "../redux/shapes/slice";
import { RoundPercentage } from "../entities/shape";

export interface DragDropHandler {
  onMouseDown: MouseEventHandler<HTMLDivElement>;
  onContextMenu: MouseEventHandler<HTMLDivElement>;
}

export interface DragDropContainerOptions {
  top: number;
  left: number;
  width: number;
  height: number;
}

export type DragDropOptionsSetter = (options: DragDropContainerOptions) => void;

export const useShapeDragDrop = (): {
  dragDropHandler: DragDropHandler;
  setContainerOptions: DragDropOptionsSetter;
} => {
  const dispatch = useAppDispatch();

  const [containerTop, setContainerTop] = useState(0);
  const [containerLeft, setContainerLeft] = useState(0);
  const [containerWidth, setContainerWidth] = useState(0);
  const [containerHeight, setContainerHeight] = useState(0);

  const setContainerOptions: DragDropOptionsSetter = (options) => {
    setContainerTop(options.top);
    setContainerLeft(options.left);
    setContainerWidth(options.width);
    setContainerHeight(options.height);
  };

  const handleMouseDown: DragDropHandler["onMouseDown"] = (event) => {
    const draggable = event.currentTarget;

    const { id } = event.currentTarget;
    const { clientX, clientY } = event;
    const { x: draggableX, y: draggableY } = draggable.getBoundingClientRect();
    const diffX = clientX - draggableX;
    const diffY = clientY - draggableY;

    const handleMove = (moveEvent: MouseEvent) => {
      const posX = moveEvent.clientX - containerLeft;
      const posY = moveEvent.clientY - containerTop;

      if (
        posX < 0 ||
        posX > containerWidth ||
        posY < 0 ||
        posY > containerHeight
      ) {
        return;
      }

      let left = RoundPercentage((posX - diffX) / containerWidth, "offset");
      let top = RoundPercentage((posY - diffY) / containerHeight, "offset");

      dispatch(setShapeCoords({ id, top, left }));
    };

    const handleMouseUp = () => {
      document.removeEventListener("mousemove", handleMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };

    document.addEventListener("mousemove", handleMove);
    document.addEventListener("mouseup", handleMouseUp);
  };

  return {
    dragDropHandler: {
      onMouseDown: handleMouseDown,
      onContextMenu: (e) => e.preventDefault(),
    },
    setContainerOptions,
  };
};
