import { configureStore } from '@reduxjs/toolkit';
import appReducer from './appSlice';
import inputParametersReducer from './inputParametersSlice';
import dataFromBackSlice from './dataFromBackSlice';

export const store = configureStore({
  reducer: {
    app: appReducer,
    input: inputParametersReducer,
    dataFromBack: dataFromBackSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
