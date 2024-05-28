import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import { API } from '../dal/api';
import { setError, setStatus, setInfo, AppStateType } from './appSlice';
import { AxiosError } from 'axios';

export type ItemType = {
  name: string;
  isChecked: boolean;
};

export type InputParametersStateType = {
  dataForExportXLS: any;
  mainAttribute: string;
  attributeText: string;
  attributesSaveNamesArr: Array<string>;
  currentNameFromAttributesSaveNamesArr: string;
  selectCategorySearchParam: string;
  selectCategorySearchParam2: string;
  selectCategorySearchParamMedia: string;
  selectCategorySearchText: string;
  media: Array<ItemType>;
  exportFormat: Array<ItemType>;
  estimation: Array<ItemType>;
  monthNum: Array<ItemType>;
  shortLists: Array<ItemType>;
  aggregation: Array<ItemType>;
  conditionType: Array<ItemType>;
  language: Array<ItemType>;
  date_start: string;
  date_end: string;
  selectedConditions: string;
};
const initialState: InputParametersStateType = {
  dataForExportXLS: [],
  mainAttribute: 'Товары/услуги',
  attributeText: '',
  attributesSaveNamesArr: ['fff', 'rrr', 'nnn', 'kkk', 'eee'],
  currentNameFromAttributesSaveNamesArr: 'fff',
  selectCategorySearchParam: 'name',
  selectCategorySearchParam2: 'Рекламодатель',
  selectCategorySearchParamMedia: 'ТВ',
  selectCategorySearchText: '',
  media: [
    { name: 'ТВ Федеральное', isChecked: true },
    { name: 'ТВ Региональное', isChecked: true },
    { name: 'ТВ Неэфирное', isChecked: false },
    { name: 'ТВ Спонсорское', isChecked: false },
    { name: 'Радио', isChecked: true },
    { name: 'Радио (доп.рег)', isChecked: false },
    { name: 'Пресса', isChecked: true },
    { name: 'Наружная реклама', isChecked: true },
    { name: 'Кинотеатры', isChecked: true },
    { name: 'Интернет', isChecked: true },
    { name: 'Интернет (OLV)', isChecked: false },
    { name: 'Интернет SP', isChecked: false },
  ],
  exportFormat: [
    { name: 'TXT', isChecked: false },
    { name: 'EXCEL', isChecked: true },
  ],
  estimation: [
    { name: 'NEW', isChecked: true },
    { name: 'OLD', isChecked: false },
  ],
  monthNum: [
    { name: 'Да', isChecked: true },
    { name: 'Нет', isChecked: false },
  ],
  shortLists: [
    { name: 'Да', isChecked: false },
    { name: 'Нет', isChecked: true },
  ],
  aggregation: [
    { name: 'MO', isChecked: true },
    { name: 'WE', isChecked: false },
  ],
  conditionType: [
    { name: 'SQL', isChecked: false },
    { name: 'TXT', isChecked: true },
  ],
  language: [
    { name: 'Рус', isChecked: true },
    { name: 'Eng', isChecked: false },
  ],
  date_start: '',
  date_end: '',
  selectedConditions: '',
};

// export const setStartData = createAsyncThunk<undefined, string, { rejectValue: string }>('input/setStartData', async function (userGroup, { rejectWithValue, dispatch }) {
//   try {
//     dispatch(setStatus('loading'));

//     const response = await API.get_startData({
//       Client: userGroup,
//     });
//     if (response.data.TA) {
//       const TaItems = makeTaItems(response.data.TA);
//       const PeriodItems = makePeriodItems(response.data.Month);
//       const MaxShareOlvItems = response.data['Share OLV'].map(item => `${+item * 100} %`);

//       dispatch(setTaItemsArr(TaItems));
//       dispatch(setPeriodItemsArr(PeriodItems));
//       dispatch(setMaxShareOlvItemsArr(MaxShareOlvItems));

//       dispatch(setTa(TaItems[0]));
//       dispatch(setPeriod(PeriodItems[0]));
//       dispatch(setFrequency('1 +'));
//       dispatch(setMaxShareOlv(MaxShareOlvItems[0]));
//     } else {
//       dispatch(setError(`В базе нет данных по ${userGroup}`));
//     }

//     dispatch(setStatus('success'));
//   } catch (error) {
//     const err = error as AxiosError;
//     dispatch(setError(err.message));
//   }
//   return undefined;
// });
// export const setStartDataForAdminClient = createAsyncThunk<undefined, string, { rejectValue: string }>('input/setStartData', async function (selectClient, { rejectWithValue, dispatch }) {
//   try {
//     dispatch(setStatus('loading'));
//     const response = await API.get_startData({
//       Client: selectClient,
//     });
//     const taArrForAdminClient = response.data.TA ? makeTaArrForAdminClientWithoutClientName(response.data.TA) : [];

//     dispatch(setTaArrForAdminClient(taArrForAdminClient));

//     dispatch(setStatus('success'));
//   } catch (error) {
//     const err = error as AxiosError;
//     dispatch(setError(err.message));
//   }
//   return undefined;
// });

const inputParametersSlice = createSlice({
  name: 'input',
  initialState,
  reducers: {
    setDataForExportXLS(state, action: PayloadAction<Array<string>>) {
      state.dataForExportXLS = action.payload;
    },
    setMainAttribute(state, action: PayloadAction<string>) {
      state.mainAttribute = action.payload;
    },
    setAttributeText(state, action: PayloadAction<string>) {
      state.attributeText = action.payload;
    },
    setAttributesSaveNamesArr(state, action: PayloadAction<Array<string>>) {
      state.attributesSaveNamesArr = action.payload;
    },
    setCurrentNameFromAttributesSaveNamesArr(state, action: PayloadAction<string>) {
      state.currentNameFromAttributesSaveNamesArr = action.payload;
    },
    setMedia(state, action: PayloadAction<Array<ItemType>>) {
      state.media = action.payload;
    },
    setExportFormat(state, action: PayloadAction<Array<ItemType>>) {
      state.exportFormat = action.payload;
    },

    setEstimation(state, action: PayloadAction<Array<ItemType>>) {
      state.estimation = action.payload;
    },
    setMonthNum(state, action: PayloadAction<Array<ItemType>>) {
      state.monthNum = action.payload;
    },
    setShortLists(state, action: PayloadAction<Array<ItemType>>) {
      state.shortLists = action.payload;
    },
    setAggregation(state, action: PayloadAction<Array<ItemType>>) {
      state.aggregation = action.payload;
    },

    setConditionType(state, action: PayloadAction<Array<ItemType>>) {
      state.conditionType = action.payload;
    },
    setLanguage(state, action: PayloadAction<Array<ItemType>>) {
      state.language = action.payload;
    },
    setDateStart(state, action: PayloadAction<string>) {
      state.date_start = action.payload;
    },
    setDateEnd(state, action: PayloadAction<string>) {
      state.date_end = action.payload;
    },
    setSelectedConditions(state, action: PayloadAction<string>) {
      state.selectedConditions = action.payload;
    },

    setSelectCategorySearchParam(state, action: PayloadAction<string>) {
      state.selectCategorySearchParam = action.payload;
    },
    setSelectCategorySearchParam2(state, action: PayloadAction<string>) {
      state.selectCategorySearchParam2 = action.payload;
    },
    setSelectCategorySearchParamMedia(state, action: PayloadAction<string>) {
      state.selectCategorySearchParamMedia = action.payload;
    },
    setSelectCategorySearchText(state, action: PayloadAction<string>) {
      state.selectCategorySearchText = action.payload;
    },
  },
  extraReducers: builder => {
    // builder.addCase(setStartData.pending, state => {}).addCase(setStartData.fulfilled, (state, action) => {});
  },
});

export const { setSelectCategorySearchParamMedia, setSelectCategorySearchParam, setSelectCategorySearchParam2, setSelectCategorySearchText, setDataForExportXLS, setMainAttribute, setAttributeText, setAttributesSaveNamesArr, setCurrentNameFromAttributesSaveNamesArr, setMedia, setExportFormat, setEstimation, setMonthNum, setShortLists, setAggregation, setConditionType, setLanguage, setDateStart, setDateEnd, setSelectedConditions } = inputParametersSlice.actions;

export default inputParametersSlice.reducer;
