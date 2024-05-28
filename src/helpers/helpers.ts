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
