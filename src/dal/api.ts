import Axios from 'axios';

export type ResponseType<D> = {
  resultCode: number;
  messages: Array<string>;
  data: D;
};

export type StartDataFromBackType = {
  Chrono: Array<number>;
  Month: Array<string>;
  'Share OLV': Array<number>;
  TA: Array<Array<string>>;
  freq: Array<number>;
};
type FinalDataItemFromBackType = {
  Chrono: number;
  Month: string;
  'Share OLV': number;
  TA: string;
  TRP: number;
  budget: number;
  freq: number;
  impressions: number;
  media: string;
  rfPlus: number;
};

type FinalDataPayloadType = {
  Client: string;
  Month: string;
  TA: Array<string>;
  chrono: number;
  freq: number;
  share_olv: number;
  marginChrono: number;
};

type StartDataPayloadType = {
  Client: string;
};

export type TV_CBU_Item_Type = {
  reach1: number;
  reach2: number;
  trp2: number;
  Month: string;
  TA: string;
  trp1: number;
};

export type TV_CPP_10mln_Item_Type = {
  CPP: number;
  TA: string;
};

type DataFromUserType = {
  TV_CBU: Array<TV_CBU_Item_Type>;
  TV_CPP_10mln: Array<TV_CPP_10mln_Item_Type>;
};

type CalcNewTaPayloadType = {
  dataFromUser: DataFromUserType;
  userLogin: string;
  selectClient: string;
};

export const API = {
  get_startData(payload: StartDataPayloadType) {
    return Axios.post<StartDataFromBackType>('/get_start_data/', payload);
  },
  post_inputData(payload: FinalDataPayloadType) {
    return Axios.post<Array<FinalDataItemFromBackType>>('/get_final_data/', payload);
  },
  post_UserData(payload: CalcNewTaPayloadType) {
    return Axios.post('/calc_new_ta2/', payload);
  },
};
// export const API = {
//   get_startData(payload: StartDataPayloadType) {
//     return Axios.post<StartDataFromBackType>('https://stage.videobudget.mediainstinctgroup.ru/get_start_data/', payload);
//   },
//   post_inputData(payload: FinalDataPayloadType) {
//     return Axios.post<Array<FinalDataItemFromBackType>>('https://stage.videobudget.mediainstinctgroup.ru/get_final_data/', payload);
//   },
//   post_UserData(payload: CalcNewTaPayloadType) {
//     return Axios.post('https://stage.videobudget.mediainstinctgroup.ru/calc_new_ta2/', payload);
//   },
// };
