import Axios from 'axios';

export type ResponseType<D> = {
  resultCode: number;
  messages: Array<string>;
  data: D;
};

type Start_Data_From_Back_Item_Type = {
  id: number;
  name: string;
  ename: string;
  notes: string | null;
};

export type StartDataFromBackType = Array<Start_Data_From_Back_Item_Type>;

// type FinalDataItemFromBackType = {
//   Chrono: number;
//   Month: string;
//   'Share OLV': number;
//   TA: string;
//   TRP: number;
//   budget: number;
//   freq: number;
//   impressions: number;
//   media: string;
//   rfPlus: number;
// };

// type FinalDataPayloadType = {
//   Client: string;
//   Month: string;
//   TA: Array<string>;
//   chrono: number;
//   freq: number;
//   share_olv: number;
//   marginChrono: number;
// };

// type StartDataPayloadType = {
//   Client: string;
// };

// export type TV_CBU_Item_Type = {
//   reach1: number;
//   reach2: number;
//   trp2: number;
//   Month: string;
//   TA: string;
//   trp1: number;
// };

// export type TV_CPP_10mln_Item_Type = {
//   CPP: number;
//   TA: string;
// };

// type DataFromUserType = {
//   TV_CBU: Array<TV_CBU_Item_Type>;
//   TV_CPP_10mln: Array<TV_CPP_10mln_Item_Type>;
// };

// type CalcNewTaPayloadType = {
//   dataFromUser: DataFromUserType;
//   userLogin: string;
//   selectClient: string;
// };

export const API = {
  // get_startData(payload: StartDataPayloadType) {
  //   return Axios.post<StartDataFromBackType>('/get_start_data/', payload);
  // },
  // post_inputData(payload: FinalDataPayloadType) {
  //   return Axios.post<Array<FinalDataItemFromBackType>>('/get_final_data/', payload);
  // },
  get_search_by_value(entity: string, id?: number, name?: string, ename?: string, strict?: boolean, limit?: number) {
    if (id) {
      return Axios.get<StartDataFromBackType>(`http://192.168.1.54:8090/search_by_value/?entity=${entity}&id=${id}`);
    } else if (name) {
      return Axios.get<StartDataFromBackType>(`http://192.168.1.54:8090/search_by_value/?entity=${entity}&name=${name}`);
    } else if (ename) {
      return Axios.get<StartDataFromBackType>(`http://192.168.1.54:8090/search_by_value/?entity=${entity}&ename=${ename}`);
    } else {
      return Axios.get<StartDataFromBackType>(`http://192.168.1.54:8090/search_by_value/?entity=${entity}&id=${id}`);
    }
  },
  get_search_by_root(entity: string, id?: number, limit?: number) {
    if (id) {
      return Axios.get<StartDataFromBackType>(`http://192.168.1.54:8090/search_by_root/?entity=${entity}&id=${id}`);
    } else {
      return Axios.get<StartDataFromBackType>(`http://192.168.1.54:8090/search_by_root/?entity=${entity}`);
    }
  },
};
