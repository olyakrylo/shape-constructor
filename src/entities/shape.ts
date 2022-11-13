import { IconName } from "./icon";
import { ShapeProp, ValueShapeProp } from "./options";

export enum ShapeType {
  rect = "rect",
  ellipse = "ellipse",
  line = "line",
  arrow = "arrow",
}

export enum Color {
  red = "red",
  green = "green",
  blue = "blue",
  orange = "orange",
  violet = "violet",
  none = "none",
  black = "black",
}

export interface CommonShapePropsI {
  id: string;
  width: number;
  height: number;
  top: number;
  left: number;
  rotation: number;
  fill: Color;
  stroke: Color;
  strokeWidth: number;
  locked?: boolean;
}

export interface RectangleShapeI extends CommonShapePropsI {
  type: ShapeType.rect;
}

export interface EllipseShapeI extends CommonShapePropsI {
  type: ShapeType.ellipse;
}

export interface LineShapeI extends CommonShapePropsI {
  type: ShapeType.line;
}

export interface ArrowShapeI extends CommonShapePropsI {
  type: ShapeType.arrow;
}

export type ShapeI = RectangleShapeI | EllipseShapeI | LineShapeI | ArrowShapeI;

export const SHAPE_LIST: {
  type: ShapeType;
  name: string;
  icon: IconName;
}[] = [
  {
    type: ShapeType.rect,
    name: "Rectangle",
    icon: "RectIcon",
  },
  {
    type: ShapeType.ellipse,
    name: "Ellipse",
    icon: "CircleIcon",
  },
  {
    type: ShapeType.line,
    name: "Line",
    icon: "LineIcon",
  },
  {
    type: ShapeType.arrow,
    name: "Arrow",
    icon: "ArrowIcon",
  },
];

export const DRAG_DIRS = [
  "top",
  "right",
  "bottom",
  "left",
  "top_left",
  "top_right",
  "bottom_left",
  "bottom_right",
];

export const ROTATION_DIRS = ["tl", "tr", "bl", "br"];

export type DragDir = typeof DRAG_DIRS[number];

export const MIN_VALUE = (prop: ValueShapeProp): number => {
  if (prop === "strokeWidth") return 0;
  if (prop === "rotation") return -359;
  return 1;
};
export const MAX_VALUE = (prop: ValueShapeProp): number => {
  if (prop === "strokeWidth") return 20;
  if (prop === "rotation") return 359;
  return 630;
};
