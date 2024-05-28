// export type attributesArrItem = {
//   mainAttrute: string;
//   attributes: Array<string>;
// };
// export const attributesArr: Array<attributesArrItem> = [
//   { mainAttrute: 'Товары/услуги', attributes: ['Рекламодатели', 'Бренды', 'Суб-бренды', 'Модели', 'Категиории'] },
//   { mainAttrute: 'ТВ', attributes: ['Национальная\n телекомпания', 'Регион/\n телекомпания', 'Телекомпания\n оригинала'] },
//   { mainAttrute: 'Радио', attributes: ['Холдинг', 'Радиостанция', 'Радиостанция\n оригинального\n выпуска'] },
//   { mainAttrute: 'Пресса', attributes: ['Издательский\n дом', 'Издание'] },
//   { mainAttrute: 'ООН', attributes: ['Агенство', 'Тип носителя'] },
// ];
export type attributesArrItem = {
  mainAttrute: string;
  attributeNameForMedia?: string;
  attributes: Array<string>;
};

export const attributesArr: Array<attributesArrItem> = [
  { mainAttrute: 'Рекламодатели->Продукты', attributes: ['Рекламодатель', 'Бренд', 'Суб-бренд', 'Продукт'] },
  { mainAttrute: 'Категирии 1->4', attributes: ['Article1', 'Article2', 'Article3', 'Article4'] },
  { mainAttrute: 'СМИ', attributeNameForMedia: 'ТВ', attributes: ['Национальная телекомпания', 'Телекомпания', 'Телекомпания оригинала'] },
  { mainAttrute: 'СМИ', attributeNameForMedia: 'Радио', attributes: ['Холдинг', 'Радиостанция'] },
  { mainAttrute: 'СМИ', attributeNameForMedia: 'Пресса', attributes: ['Издательский дом', 'Издание'] },
  { mainAttrute: 'СМИ', attributeNameForMedia: 'ООН', attributes: ['Сеть', 'Агентство'] },
  { mainAttrute: 'СМИ', attributeNameForMedia: 'Интернет', attributes: ['Площадка', 'Рекламная сетка'] },
];
