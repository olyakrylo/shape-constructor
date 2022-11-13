import { configureStore } from "@reduxjs/toolkit";
import shapesReducer from "./shapes/slice";
import { shapesListenerMiddleware } from "./shapes/middleware";

export const store = configureStore({
  reducer: {
    shapes: shapesReducer,
  },
  middleware: (def) => def().prepend(shapesListenerMiddleware.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
