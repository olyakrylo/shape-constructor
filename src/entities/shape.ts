import { IconName } from "./icon";

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
  rotate: number;
  fill: Color;
  stroke: Color;
  strokeWidth: number;
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
