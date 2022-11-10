import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Color, ShapeI, ShapeType } from "../../entities/shape";
import { v4 as uuid } from "uuid";
import { RootState } from "../store";
import { ColorShapeProp, ValueShapeProp } from "../../entities/options";

export interface ShapeState {
  shapes: Record<string, ShapeI>;
  selected: string | null;
}

const initialState: ShapeState = {
  shapes: {},
  selected: null,
};

export const shapesSlice = createSlice({
  name: "shapes",
  initialState,
  reducers: {
    addShape: (state, action: PayloadAction<{ type: ShapeType }>) => {
      const id = uuid();
      let height;
      switch (action.payload.type) {
        case ShapeType.line:
          height = 20;
          break;
        case ShapeType.arrow:
          height = 40;
          break;
        default:
          height = 100;
      }
      state.shapes[id] = {
        id,
        type: action.payload.type,
        height,
        width: 100,
        top: 0,
        left: 0,
        rotate: 0,
        fill: Color.none,
        stroke: Color.black,
        strokeWidth: 1,
      };
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
        color: Color;
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
      state.shapes[id][prop] = value;
    },
  },
});

export const {
  addShape,
  removeShape,
  selectShape,
  setShapeColor,
  setShapeValue,
} = shapesSlice.actions;

export const getShapes = (state: RootState) => state.shapes.shapes;
export const getSelectedShapeId = (state: RootState) => state.shapes.selected;
export const getSelectedShape = (state: RootState) => {
  const selectedId = getSelectedShapeId(state);
  if (!selectedId) return null;
  return state.shapes.shapes[selectedId];
};

export default shapesSlice.reducer;
