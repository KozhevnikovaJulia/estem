import React, { useState } from 'react';
import { useAppSelector, useAppDispatch } from '../../../utils/redux_ulils';
import s from './SelectCategory.module.css';
import { Select } from '../../components/common/Select/Select';
import { InputText } from '../common/InputText/InputText';
import { MainButton } from '../common/MainButton/MainButton';
import { OtherButton } from '../common/OtherButton/OtherButton';
import { TextArea } from '../common/TextArea/TextArea';
import { changeCase } from '../../../helpers/helpers';
import { setSelectCategorySearchParamMedia, setSelectedConditions, setSelectCategorySearchParam, setSelectCategorySearchParam2, setSelectCategorySearchText } from '../../../store/inputParametersSlice';
import { attributesArr } from '../../../assets/data/data';

type SelectCategoryPropsType = {
  modalActive: boolean;
  setModalActive: (value: boolean) => void;
  parameter: string;
};

export const SelectCategory = React.memo(({ modalActive, setModalActive, parameter }: SelectCategoryPropsType) => {
  const dispatch = useAppDispatch();
  const selectedConditions = useAppSelector(state => state.input.selectedConditions);
  const selectCategorySearchParam = useAppSelector(state => state.input.selectCategorySearchParam);
  const selectCategorySearchParam2 = useAppSelector(state => state.input.selectCategorySearchParam2);
  const selectCategorySearchText = useAppSelector(state => state.input.selectCategorySearchText);
  const selectCategorySearchParamMedia = useAppSelector(state => state.input.selectCategorySearchParamMedia);

  const currentAttrMedia = attributesArr.find(item => item.mainAttrute === parameter && item.attributeNameForMedia === selectCategorySearchParamMedia);
  const currentAttrNotMedia = attributesArr.find(item => item.mainAttrute === parameter);
  const currentAttrArr = parameter === 'СМИ' ? currentAttrMedia && currentAttrMedia.attributes : currentAttrNotMedia && currentAttrNotMedia.attributes;

  const onChangeSelectCategorySearchText = (e: any) => {
    dispatch(setSelectCategorySearchText(e));
  };
  const onChangeSelectedConditions = (e: any) => {
    dispatch(setSelectedConditions(e));
  };
  const onClickAdd = () => {
    setModalActive(false);
  };
  const onClickClear = () => {};
  const onClickChoose = () => {};
  const onClickSearch = () => {};

  const onChangeSearchParam = (newValue: string) => {
    dispatch(setSelectCategorySearchParam(newValue));
  };
  const onChangeSearchParam2 = (newValue: string) => {
    dispatch(setSelectCategorySearchParam2(newValue));
  };
  const onChangeSelectCategorySearchParamMedia = (newValue: string) => {
    dispatch(setSelectCategorySearchParamMedia(newValue));
  };

  return (
    <div className={modalActive ? s.modal + ' ' + s.active : s.modal}>
      <div className={s.card}>
        <div className={s.titleBlock}>
          <p style={{ margin: '0' }}>Выбор {changeCase(parameter)}</p>

          <button
            onClick={() => {
              setModalActive(false);
            }}
            className={s.closeButton}
          >
            &times;
          </button>
        </div>

        <div className={s.content}>
          {parameter === 'Рекламодатели->Продукты' && (
            <div className={s.filterBlock}>
              <div className={s.selectWrap1}>
                <Select items={['Рекламодатель', 'Бренд', 'Суб-бренд', 'Продукт']} value={selectCategorySearchParam2} onChange={onChangeSearchParam2} name='searchParam2' widthSelect={'100%'} />
              </div>
            </div>
          )}

          {parameter === 'СМИ' && (
            <div className={s.filterBlock}>
              <div className={s.selectWrap1}>
                <Select items={['ТВ', 'Радио', 'Пресса', 'ООН', 'Интернет']} value={selectCategorySearchParamMedia} onChange={onChangeSelectCategorySearchParamMedia} name='selectCategorySearchParamMedia' widthSelect={'100%'} />
              </div>
            </div>
          )}

          <div className={s.filterBlock}>
            <InputText value={selectCategorySearchText} onChange={onChangeSelectCategorySearchText} name={'selectCategorySearchText'} widthInputText={'60%'} />

            <div className={s.selectWrap2}>
              <Select items={['name', 'id', 'ename']} value={selectCategorySearchParam} onChange={onChangeSearchParam} name='searchParam' widthSelect={'100%'} />
            </div>

            <MainButton onClick={onClickSearch} title={'Поиск'} widthBtn={100} />
          </div>
          <div className={s.articlesBlock}>
            {currentAttrArr &&
              currentAttrArr.map(item => {
                return (
                  <div className={s.articleWrap}>
                    <div className={s.articleName}>{item}:</div>
                    <div className={s.article}></div>
                  </div>
                );
              })}
          </div>

          <div className={s.btnWrapStandart}>
            <MainButton onClick={onClickChoose} title={'Выбрать'} widthBtn={'100%'} />
          </div>

          <div style={{ textAlign: 'center', marginBottom: '2%' }}>Выбранные условия:</div>
          <div className={s.btnsBlock}>
            <div className={s.btnsWrap}>
              <OtherButton onClick={() => {}} title={'('} widthBtn={'100%'} />
            </div>
            <div className={s.btnsWrap}>
              <OtherButton onClick={() => {}} title={')'} widthBtn={'100%'} />
            </div>
            <div className={s.btnsWrap}>
              <OtherButton onClick={() => {}} title={'AND'} widthBtn={'100%'} />
            </div>
            <div className={s.btnsWrap}>
              <OtherButton onClick={() => {}} title={'OR'} widthBtn={'100%'} />
            </div>
            <div className={s.btnsWrap}>
              <OtherButton onClick={() => {}} title={'NOT'} widthBtn={'100%'} />
            </div>
            <div className={s.btnsWrap}>
              <OtherButton onClick={() => {}} title={'<-'} widthBtn={'100%'} />
            </div>
          </div>
          <div className={s.btnWrapStandart}>
            <TextArea name={'selectedConditions'} value={selectedConditions} onChange={onChangeSelectedConditions} widthTextArea={'98%'} />
          </div>

          <div className={s.btnWrapStandart}>
            <MainButton onClick={onClickAdd} title={'Добавить'} widthBtn={'100%'} />
          </div>
          <div className={s.btnWrapStandart}>
            <MainButton onClick={onClickClear} title={'Очистить'} widthBtn={'100%'} />
          </div>
        </div>
      </div>
    </div>
  );
});
