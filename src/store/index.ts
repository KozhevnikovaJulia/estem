import { configureStore } from '@reduxjs/toolkit';
import appReducer from './appSlice';
import inputParametersReducer from './inputParametersSlice';

export const store = configureStore({
  reducer: {
    app: appReducer,
    input: inputParametersReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
