import { createSlice, PayloadAction, createAsyncThunk, AnyAction } from '@reduxjs/toolkit';

type DataFromUserType = {
  userEmail: string;
  userPassword: string;
};

export type AppStateType = {
  status: string;
  error: string | null;
  info: string | null;
  isInitialized: boolean;
  tabbedConditionsIsActive: boolean;
  tabbedMediaIsActive: boolean;
};

const initialState: AppStateType = {
  status: 'success',
  error: null,
  info: null,
  isInitialized: false,
  tabbedConditionsIsActive: true,
  tabbedMediaIsActive: false,
};

const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    setStatus(state, action: PayloadAction<string>) {
      state.status = action.payload;
    },
    setError(state, action: PayloadAction<string | null>) {
      state.error = action.payload;
    },
    setInitialized(state, action: PayloadAction<boolean>) {
      state.isInitialized = action.payload;
    },
    setInfo(state, action: PayloadAction<string | null>) {
      state.info = action.payload;
    },
    setTabbedConditionsIsActive(state, action: PayloadAction<boolean>) {
      state.tabbedConditionsIsActive = action.payload;
    },
    setTabbedMediaIsActive(state, action: PayloadAction<boolean>) {
      state.tabbedMediaIsActive = action.payload;
    },
  },
  extraReducers: builder => {
    // builder.addCase(signIn.fulfilled, () => {});
  },
});

export const { setStatus, setError, setInitialized, setInfo, setTabbedConditionsIsActive, setTabbedMediaIsActive } = appSlice.actions;

export default appSlice.reducer;
