import { ItemType } from '../store/inputParametersSlice';

export const onChangeCheckBoxInParametersArrOneSelect = (dispatch: any, arr: Array<ItemType>, setArr: (value: Array<ItemType>) => void, selectedName: string) => {
  const updatedArr = arr.map(item => {
    const selectedItem = { ...item };
    selectedItem.isChecked = true;
    const otherItem = { ...item };
    otherItem.isChecked = false;
    return item.name === selectedName ? selectedItem : otherItem;
  });
  dispatch(setArr(updatedArr));
};

export const onChangeCheckBoxInParametersArr = (dispatch: any, arr: Array<ItemType>, setArr: (value: Array<ItemType>) => void, selectedName: string) => {
  const updatedArr = arr.map(item => {
    const selectedItem = { ...item };
    selectedItem.isChecked = !selectedItem.isChecked;
    return item.name === selectedName ? selectedItem : item;
  });
  dispatch(setArr(updatedArr));
};

export const changeCase = (word: string) => {
  if (word === 'Рекламодатели') {
    return 'рекламодателя';
  } else if (word === 'Бренды') {
    return 'бренда';
  } else if (word === 'Суб-бренды') {
    return 'суб-бренда';
  } else if (word === 'Модели') {
    return 'модели';
  } else if (word === 'Категиории') {
    return 'категиории';
  } else if (word === 'Национальная\n телекомпания') {
    return 'национальной\n телекомпании';
  } else if (word === 'Регион/\n телекомпания') {
    return 'регион/\n телекомпании';
  } else if (word === 'Телекомпания\n оригинала') {
    return 'телекомпании\n оригинала';
  } else if (word === 'Холдинг') {
    return 'холдинга';
  } else if (word === 'Радиостанция') {
    return 'радиостанции';
  } else if (word === 'Радиостанция\n оригинального\n выпуска') {
    return 'радиостанции\n оригинального\n выпуска';
  } else if (word === 'Издательский\n дом') {
    return 'издательского\n дома';
  } else if (word === 'Издание') {
    return 'издания';
  } else if (word === 'Агенство') {
    return 'агенства';
  } else if (word === 'Тип носителя') {
    return 'типа носителя';
  } else {
    return word;
  }
};

export const addZero = (str: string) => {
  let newStr = String(str);
  if (newStr.length === 1) {
    newStr = `0${newStr}`;
  }
  return newStr;
};

export const findEntityNameForBackForBack = (name: string) => {
  if (name === 'Рекламодатель') {
    return 'advertiser';
  } else if (name === 'Бренд') {
    return 'brand';
  } else if (name === 'Суб-бренд') {
    return 'subbrand';
  } else if (name === 'Продукт') {
    return 'model';
  } else if (name === 'Article1' || name === 'Article2' || name === 'Article3' || name === 'Article4') {
    return 'article';
  } else {
    return name;
  }
};

export const findEntityChildNameForBackForBack = (name: string) => {
  if (name === 'Рекламодатель') {
    return 'Бренд';
  } else if (name === 'Бренд') {
    return 'Суб-бренд';
  } else if (name === 'Суб-бренд') {
    return 'Продукт';
  } else if (name === 'Article1') {
    return 'Article2';
  } else if (name === 'Article2') {
    return 'Article3';
  } else if (name === 'Article3') {
    return 'Article4';
  } else {
    return name;
  }
};
export const translator = (entity: string) => {
  if (entity === 'Рекламодатель') {
    return 'ADVERTISER';
  } else if (entity === 'Бренд') {
    return 'BRAND';
  } else if (entity === 'Суб-бренд') {
    return 'SUBBRAND';
  } else if (entity === 'Продукт') {
    return 'MODEL';
  } else if (entity === 'Article1') {
    return 'AL1';
  } else if (entity === 'Article2') {
    return 'AL2';
  } else if (entity === 'Article3') {
    return 'AL3';
  } else if (entity === 'Article4') {
    return 'AL4';
  } else if (entity === 'ТВ') {
    return '';
  } else if (entity === 'Радио') {
    return '';
  } else if (entity === 'Пресса') {
    return '';
  } else if (entity === 'ООН') {
    return '';
  } else if (entity === 'Интернет') {
    return '';
  } else {
    return entity;
  }
};
