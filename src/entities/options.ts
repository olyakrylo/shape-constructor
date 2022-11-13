import { Color, ShapeI, ShapeType } from "./shape";

export type ValueShapeProp = keyof Pick<
  ShapeI,
  "width" | "height" | "strokeWidth" | "rotation"
>;

export type ColorShapeProp = keyof Pick<ShapeI, "fill" | "stroke">;

export type ShapeProp = ValueShapeProp | ColorShapeProp;

export interface OptionI {
  name: string;
  property: ShapeProp;
  on: Set<ShapeType>;
}

export interface ValueOptionI extends OptionI {
  property: ValueShapeProp;
}

export interface ColorOptionI extends OptionI {
  property: ColorShapeProp;
}

export const VALUE_OPTIONS: ValueOptionI[] = [
  {
    name: "Stroke width",
    property: "strokeWidth",
    on: new Set([
      ShapeType.rect,
      ShapeType.ellipse,
      ShapeType.line,
      ShapeType.arrow,
    ]),
  },
  {
    name: "Width",
    property: "width",
    on: new Set([
      ShapeType.rect,
      ShapeType.ellipse,
      ShapeType.line,
      ShapeType.arrow,
    ]),
  },
  {
    name: "Height",
    property: "height",
    on: new Set([ShapeType.rect, ShapeType.ellipse, ShapeType.arrow]),
  },
  {
    name: "Rotation",
    property: "rotation",
    on: new Set([
      ShapeType.rect,
      ShapeType.ellipse,
      ShapeType.line,
      ShapeType.arrow,
    ]),
  },
];

export const COLOR_OPTIONS: ColorOptionI[] = [
  {
    name: "Fill",
    property: "fill",
    on: new Set([ShapeType.rect, ShapeType.ellipse]),
  },
  {
    name: "Stroke",
    property: "stroke",
    on: new Set([
      ShapeType.rect,
      ShapeType.ellipse,
      ShapeType.line,
      ShapeType.arrow,
    ]),
  },
];

export const COLORS = [
  Color.red,
  Color.green,
  Color.blue,
  Color.orange,
  Color.violet,
  Color.black,
  Color.none,
];

export const LOCK: Partial<Record<ValueShapeProp, ValueShapeProp>> = {
  height: "width",
};
