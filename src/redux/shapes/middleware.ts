import { createListenerMiddleware } from "@reduxjs/toolkit";
import { RootState } from "../store";

export const shapesListenerMiddleware = createListenerMiddleware();

shapesListenerMiddleware.startListening({
  predicate: (action) => {
    return action.type.startsWith("shapes");
  },
  effect: (_, listener) => {
    const { shapes } = listener.getState() as RootState;
    const shapesList = Object.values(shapes.shapes);
    localStorage.setItem("shapes", JSON.stringify(shapesList));
  },
});
