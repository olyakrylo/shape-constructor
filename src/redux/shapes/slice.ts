import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Color, ShapeI, ShapeType } from "../../entities/shape";
import { v4 as uuid } from "uuid";
import { RootState } from "../store";
import {
  ColorShapeProp,
  StringShapeProp,
  ValueShapeProp,
} from "../../entities/options";
import { Root } from "react-dom/client";

export interface ShapeState {
  shapes: Record<string, ShapeI>;
  selected: string | null;
  dragging: boolean;
  markup: boolean;
  zoom: number;
}

const initialState: ShapeState = {
  shapes: {},
  selected: null,
  dragging: false,
  markup: false,
  zoom: 1,
};

export const shapesSlice = createSlice({
  name: "shapes",
  initialState: () => {
    const stringShapes = localStorage.getItem("shapes") || "[]";
    const shapeList = JSON.parse(stringShapes) as ShapeI[];
    const shapes = shapeList.reduce(
      (res, curr) => ({
        ...res,
        [curr.id]: curr,
      }),
      {} as Record<string, ShapeI>
    );
    return { ...initialState, shapes };
  },
  reducers: {
    addShape: (state, action: PayloadAction<{ type: ShapeType }>) => {
      const id = uuid();
      let height;
      switch (action.payload.type) {
        case ShapeType.line:
          height = 0.02;
          break;
        case ShapeType.arrow:
          height = 0.04;
          break;
        default:
          height = 0.1;
      }
      state.shapes[id] = {
        id,
        type: action.payload.type,
        height,
        width: 0.1,
        top: 0.1,
        left: 0.1,
        rotation: 0,
        fill: Color.none,
        color: Color.black,
        stroke: Color.black,
        background: Color.none,
        strokeWidth: 1,
        fontSize: 12,
        data: "",
      };
      state.selected = id;
    },
    copyShape: (state, action: PayloadAction<{ shape: ShapeI }>) => {
      const { shape } = action.payload;
      const id = uuid();
      state.shapes[id] = { ...shape, id, top: 0.1, left: 0.1 };
      state.selected = id;
    },
    removeShape: (state, action: PayloadAction<{ id: string }>) => {
      const { id } = action.payload;
      delete state.shapes[id];
      if (state.selected === id) {
        state.selected = null;
      }
    },
    selectShape: (state, action: PayloadAction<{ id: string | null }>) => {
      state.selected = action.payload.id;
    },
    setShapeColor: (
      state,
      action: PayloadAction<{
        id: string;
        color: Color | string;
        prop: ColorShapeProp;
      }>
    ) => {
      const { id, prop, color } = action.payload;
      state.shapes[id][prop] = color;
    },
    setShapeValue: (
      state,
      action: PayloadAction<{ id: string; prop: ValueShapeProp; value: number }>
    ) => {
      const { id, prop, value } = action.payload;
      // if (state.shapes[id].locked) {
      //   const lastWidth = state.shapes[id].width;
      //   const lastHeight = state.shapes[id].height;
      //   const rel = lastWidth / lastHeight;
      //   if (prop === "width") {
      //     state.shapes[id].height = Math.round((value / rel) * 100) / 100;
      //   } else if (prop === "height") {
      //     state.shapes[id].width = Math.round(value * rel * 100) / 100;
      //   }
      // }
      state.shapes[id][prop] = value;
    },
    setShapeData: (
      state,
      action: PayloadAction<{
        id: string;
        value: string;
      }>
    ) => {
      const { id, value } = action.payload;
      state.shapes[id].data = value;
    },
    setShapeCoords: (
      state,
      action: PayloadAction<{ id: string; top: number; left: number }>
    ) => {
      const { id, top, left } = action.payload;
      state.shapes[id].top = top;
      state.shapes[id].left = left;
    },
    setDragging: (state, action: PayloadAction<boolean>) => {
      state.dragging = action.payload;
    },
    toggleLock: (state, action: PayloadAction<{ id: string }>) => {
      const { id } = action.payload;
      state.shapes[id].locked = !state.shapes[id].locked;
    },
    toggleMarkup: (state) => {
      state.markup = !state.markup;
    },
    changeZoom: (
      state,
      action: PayloadAction<{ mode: "add" | "subtract" }>
    ) => {
      const { mode } = action.payload;
      if (mode === "add") {
        state.zoom += 0.1;
      } else {
        state.zoom -= 0.1;
      }
    },
    resetZoom: (state) => {
      state.zoom = 1;
    },
  },
});

export const {
  addShape,
  removeShape,
  selectShape,
  setShapeColor,
  setShapeValue,
  setShapeData,
  setShapeCoords,
  setDragging,
  toggleLock,
  copyShape,
  toggleMarkup,
  changeZoom,
  resetZoom,
} = shapesSlice.actions;

export const getShapes = (state: RootState) => state.shapes.shapes;
export const getSelectedShapeId = (state: RootState) => state.shapes.selected;
export const getSelectedShape = (state: RootState) => {
  const selectedId = getSelectedShapeId(state);
  if (!selectedId) return null;
  return state.shapes.shapes[selectedId];
};
export const isShapeDragging = (state: RootState) => state.shapes.dragging;

export const getMarkupState = (state: RootState) => state.shapes.markup;

export const getZoom = (state: RootState) => state.shapes.zoom;

export default shapesSlice.reducer;
