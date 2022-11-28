import { Color, ShapeI, ShapeType } from "./shape";

export type ValueShapeProp = keyof Pick<
  ShapeI,
  "width" | "height" | "strokeWidth" | "rotation" | "fontSize"
>;

export type ColorShapeProp = keyof Pick<
  ShapeI,
  "fill" | "stroke" | "color" | "background"
>;

export type StringShapeProp = keyof Pick<ShapeI, "data">;

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

const ALL_TYPES = [
  ShapeType.rect,
  ShapeType.ellipse,
  ShapeType.line,
  ShapeType.arrow,
  ShapeType.text,
];

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
    on: new Set(ALL_TYPES),
  },
  {
    name: "Height",
    property: "height",
    on: new Set([
      ShapeType.rect,
      ShapeType.ellipse,
      ShapeType.arrow,
      ShapeType.text,
    ]),
  },
  {
    name: "Rotation",
    property: "rotation",
    on: new Set(ALL_TYPES),
  },
  {
    name: "Font size",
    property: "fontSize",
    on: new Set([ShapeType.text]),
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
  {
    name: "Color",
    property: "color",
    on: new Set([ShapeType.text]),
  },
  {
    name: "Background color",
    property: "background",
    on: new Set(ALL_TYPES),
  },
];

export const COLORS = [Color.black, Color.none];

export const PRESET_COLORS = [
  "#CD5C5D",
  "#3BB471",
  "#1D90FF",
  "#FF7F4E",
  "#EE81EE",
];

export const LOCK: Partial<Record<ValueShapeProp, ValueShapeProp>> = {
  height: "width",
};
