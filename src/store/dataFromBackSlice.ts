import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import { API } from '../dal/api';
import { setError, setStatus } from './appSlice';
import { findEntityNameForBackForBack, findEntityChildNameForBackForBack } from '../helpers/helpers';
import { AxiosError } from 'axios';

export type ItemType = {
  id: number;
  name: string;
  ename: string;
  notes: string | null;
  isChacked?: boolean;
};

export type ObjAdvertiserType = {
  Рекламодатель: Array<ItemType>;
  Бренд: Array<ItemType>;
  'Суб-бренд': Array<ItemType>;
  Продукт: Array<ItemType>;
};
export type ObjArticleType = {
  Article1: Array<ItemType>;
  Article2: Array<ItemType>;
  Article3: Array<ItemType>;
  Article4: Array<ItemType>;
};

export type DataFromBackStateType = {
  dataFromSearchAdvertiser: ObjAdvertiserType;
  dataFromSearchArticle: ObjArticleType;
};
const initialState: DataFromBackStateType = {
  dataFromSearchAdvertiser: { Рекламодатель: [], Бренд: [], 'Суб-бренд': [], Продукт: [] },
  dataFromSearchArticle: { Article1: [], Article2: [], Article3: [], Article4: [] },
};

export type get_search_option_Type = {
  entity: string;
  id?: number;
  name?: string;
  ename?: string;
  strict?: boolean;
  limit?: number;
};

export const get_search_by_value = createAsyncThunk<undefined, get_search_option_Type, { rejectValue: string; state: { dataFromBack: DataFromBackStateType } }>('dataFromBack/get_search_by_value', async function (optionObj, { rejectWithValue, dispatch, getState }) {
  const entity = findEntityNameForBackForBack(optionObj.entity);
  const id = optionObj.id && optionObj.id;
  const name = optionObj.name && optionObj.name;
  const ename = optionObj.ename && optionObj.ename;
  const strict = optionObj.strict && optionObj.strict;
  const limit = optionObj.limit && optionObj.limit;

  const dataFromSearchAdvertiser = getState().dataFromBack.dataFromSearchAdvertiser;

  try {
    dispatch(setStatus('loading'));

    const response = await API.get_search_by_value(entity, id, name, ename, strict, limit);
    console.log(response);
    if (response && response.statusText === 'OK') {
      let newDataFromSearchAdvertiser = {
        Рекламодатель: dataFromSearchAdvertiser.Рекламодатель.map(i => {
          return {
            id: i.id,
            name: i.name,
            ename: i.ename,
            notes: i.notes,
            isChacked: false,
          };
        }),
        Бренд: dataFromSearchAdvertiser.Бренд.map(i => {
          return {
            id: i.id,
            name: i.name,
            ename: i.ename,
            notes: i.notes,
            isChacked: false,
          };
        }),
        'Суб-бренд': dataFromSearchAdvertiser['Суб-бренд'].map(i => {
          return {
            id: i.id,
            name: i.name,
            ename: i.ename,
            notes: i.notes,
            isChacked: false,
          };
        }),
        Продукт: dataFromSearchAdvertiser.Продукт.map(i => {
          return {
            id: i.id,
            name: i.name,
            ename: i.ename,
            notes: i.notes,
            isChacked: false,
          };
        }),
      };
      const receivedData = response.data.map(i => {
        return {
          id: i.id,
          name: i.name,
          ename: i.ename,
          notes: i.notes,
          isChacked: false,
        };
      });
      newDataFromSearchAdvertiser[optionObj.entity as keyof ObjAdvertiserType] = receivedData;
      dispatch(setDataFromSearchAdvertiser(newDataFromSearchAdvertiser));
    }

    dispatch(setStatus('success'));
  } catch (error) {
    const err = error as AxiosError;
    dispatch(setError(err.message));
  }
  return undefined;
});

export const get_search_by_root = createAsyncThunk<undefined, get_search_option_Type, { rejectValue: string; state: { dataFromBack: DataFromBackStateType } }>('dataFromBack/get_search_by_root', async function (optionObj, { rejectWithValue, dispatch, getState }) {
  const entity = findEntityNameForBackForBack(optionObj.entity);
  const id = optionObj.id && optionObj.id;
  const limit = optionObj.limit && optionObj.limit;

  const dataFromSearchAdvertiser = getState().dataFromBack.dataFromSearchAdvertiser;
  const dataFromSearchArticle = getState().dataFromBack.dataFromSearchArticle;

  try {
    dispatch(setStatus('loading'));

    const response = await API.get_search_by_root(entity, id, limit);
    if (response && response.statusText === 'OK') {
      if (optionObj.entity === 'Рекламодатель' || optionObj.entity === 'Бренд' || optionObj.entity === 'Суб-бренд' || optionObj.entity === 'Продукт') {
        let newDataFromSearchAdvertiser = {
          Рекламодатель: dataFromSearchAdvertiser.Рекламодатель.map(i => {
            // const find = (i: any) => {
            //   if (i.id === id) {
            //     return true;
            //   } else if (i.isChacked === true && i.id !== id) {
            //     return optionObj.entity === 'Рекламодатель' ? false : true;
            //   } else {
            //     return false;
            //   }
            // };
            return {
              id: i.id,
              name: i.name,
              ename: i.ename,
              notes: i.notes,
              isChacked: i.id === id || (i.isChacked === true && i.id !== id && optionObj.entity !== 'Рекламодатель') ? true : false,
            };
          }),
          Бренд:
            optionObj.entity === 'Рекламодатель'
              ? []
              : dataFromSearchAdvertiser.Бренд.map(i => {
                  return {
                    id: i.id,
                    name: i.name,
                    ename: i.ename,
                    notes: i.notes,
                    isChacked: i.id === id || (i.isChacked === true && i.id !== id && optionObj.entity !== 'Бренд') ? true : false,
                  };
                }),
          'Суб-бренд':
            optionObj.entity === 'Рекламодатель' || optionObj.entity === 'Бренд'
              ? []
              : dataFromSearchAdvertiser['Суб-бренд'].map(i => {
                  return {
                    id: i.id,
                    name: i.name,
                    ename: i.ename,
                    notes: i.notes,
                    isChacked: i.id === id || (i.isChacked === true && i.id !== id && optionObj.entity !== 'Суб-бренд') ? true : false,
                  };
                }),
          Продукт:
            optionObj.entity === 'Рекламодатель' || optionObj.entity === 'Бренд' || optionObj.entity === 'Суб-бренд' || optionObj.entity === 'Продукт'
              ? []
              : dataFromSearchAdvertiser.Продукт.map(i => {
                  return {
                    id: i.id,
                    name: i.name,
                    ename: i.ename,
                    notes: i.notes,
                    isChacked: i.id === id || (i.isChacked === true && i.id !== id && optionObj.entity !== 'Продукт') ? true : false,
                  };
                }),
        };

        const childEntity = findEntityChildNameForBackForBack(optionObj.entity);
        const receivedData = response.data.map(i => {
          return {
            id: i.id,
            name: i.name,
            ename: i.ename,
            notes: i.notes,
            isChacked: false,
          };
        });
        newDataFromSearchAdvertiser[childEntity as keyof ObjAdvertiserType] = receivedData;
        dispatch(setDataFromSearchAdvertiser(newDataFromSearchAdvertiser));
      } else if (optionObj.entity === 'Article1' || optionObj.entity === 'Article2' || optionObj.entity === 'Article3' || optionObj.entity === 'Article4') {
        let newDataFromSearchArticle = {
          Article1: dataFromSearchArticle.Article1.map(i => {
            return {
              id: i.id,
              name: i.name,
              ename: i.ename,
              notes: i.notes,
              isChacked: i.id === id || (i.isChacked === true && i.id !== id && optionObj.entity !== 'Article1') ? true : false,
            };
          }),
          Article2:
            optionObj.entity === 'Article1'
              ? []
              : dataFromSearchArticle.Article2.map(i => {
                  return {
                    id: i.id,
                    name: i.name,
                    ename: i.ename,
                    notes: i.notes,
                    isChacked: i.id === id || (i.isChacked === true && i.id !== id && optionObj.entity !== 'Article2') ? true : false,
                  };
                }),
          Article3:
            optionObj.entity === 'Article1' || optionObj.entity === 'Article2'
              ? []
              : dataFromSearchArticle.Article3.map(i => {
                  return {
                    id: i.id,
                    name: i.name,
                    ename: i.ename,
                    notes: i.notes,
                    isChacked: i.id === id || (i.isChacked === true && i.id !== id && optionObj.entity !== 'Article3') ? true : false,
                  };
                }),
          Article4:
            optionObj.entity === 'Article1' || optionObj.entity === 'Article2' || optionObj.entity === 'Article3' || optionObj.entity === 'Article4'
              ? []
              : dataFromSearchArticle.Article4.map(i => {
                  return {
                    id: i.id,
                    name: i.name,
                    ename: i.ename,
                    notes: i.notes,
                    isChacked: i.id === id || (i.isChacked === true && i.id !== id && optionObj.entity !== 'Article4') ? true : false,
                  };
                }),
        };

        const childEntity = optionObj.id ? findEntityChildNameForBackForBack(optionObj.entity) : 'Article1';
        const receivedData = response.data.map(i => {
          return {
            id: i.id,
            name: i.name,
            ename: i.ename,
            notes: i.notes,
            isChacked: false,
          };
        });
        newDataFromSearchArticle[childEntity as keyof ObjArticleType] = receivedData;
        dispatch(setDataFromSearchArticle(newDataFromSearchArticle));
      }
    }

    dispatch(setStatus('success'));
  } catch (error) {
    const err = error as AxiosError;
    dispatch(setError(err.message));
  }
  return undefined;
});

const dataFromBackSlice = createSlice({
  name: 'dataFromBack',
  initialState,
  reducers: {
    setDataFromSearchAdvertiser(state, action: PayloadAction<ObjAdvertiserType>) {
      state.dataFromSearchAdvertiser = action.payload;
    },
    setDataFromSearchArticle(state, action: PayloadAction<ObjArticleType>) {
      state.dataFromSearchArticle = action.payload;
    },
  },
  extraReducers: builder => {
    builder.addCase(get_search_by_value.pending, state => {}).addCase(get_search_by_value.fulfilled, (state, action) => {});
    builder.addCase(get_search_by_root.pending, state => {}).addCase(get_search_by_root.fulfilled, (state, action) => {});
  },
});

export const { setDataFromSearchAdvertiser, setDataFromSearchArticle } = dataFromBackSlice.actions;

export default dataFromBackSlice.reducer;
