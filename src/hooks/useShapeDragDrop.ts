import { useState, MouseEventHandler } from "react";

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

    const { clientX, clientY } = event;
    const {
      x: draggableX,
      y: draggableY,
      width: draggableWidth,
      height: draggableHeight,
    } = draggable.getBoundingClientRect();
    const diffX = clientX - draggableX;
    const diffY = clientY - draggableY;

    const handleMove = (moveEvent: MouseEvent) => {
      const posX = moveEvent.clientX;
      const posY = moveEvent.clientY;
      let left = posX - diffX - containerLeft;
      let top = posY - diffY - containerTop;

      top = Math.max(0, Math.min(top, containerHeight - draggableHeight));
      left = Math.max(0, Math.min(left, containerWidth - draggableWidth));
      // draggable.style.transform = `translate(${left}px,${top}px)`;
      draggable.style.top = `${top}px`;
      draggable.style.left = `${left}px`;
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
