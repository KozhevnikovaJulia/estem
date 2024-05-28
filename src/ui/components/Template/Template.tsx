import React, { useState } from 'react';
import { useAppSelector, useAppDispatch } from '../../../utils/redux_ulils';
import s from './Template.module.css';
import { InputText } from '../../components/common/InputText/InputText';
import { Select } from '../../components/common/Select/Select';
import { MainButton } from '../common/MainButton/MainButton';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleXmark, faFilter } from '@fortawesome/free-solid-svg-icons';
import { setCurrentNameFromAttributesSaveNamesArr } from '../../../store/inputParametersSlice';

type TemplatePropsType = {
  modalActive: boolean;
  setModalActive: (value: boolean) => void;
};

export const Template = React.memo(({ modalActive, setModalActive }: TemplatePropsType) => {
  const dispatch = useAppDispatch();
  const attributesSaveNamesArr = useAppSelector(state => state.input.attributesSaveNamesArr);
  const currentNameFromAttributesSaveNamesArr = useAppSelector(state => state.input.currentNameFromAttributesSaveNamesArr);
  const [valueForFilter, setValueForFilter] = useState<string>('');

  const onChangeValueForFilter = (e: any) => {
    setValueForFilter(e);
  };
  const onChangeCurrentNameFromAttributesSaveNamesArr = (newValue: string) => {
    dispatch(setCurrentNameFromAttributesSaveNamesArr(newValue));
  };

  return (
    <div className={modalActive ? s.modal + ' ' + s.active : s.modal}>
      <div className={s.card}>
        <div className={s.titleBlock}>
          <p style={{ margin: '0' }}>Шаблоны отчетов</p>

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
          <div className={s.btnWrapStandart}>
            <Select items={attributesSaveNamesArr} value={currentNameFromAttributesSaveNamesArr} onChange={onChangeCurrentNameFromAttributesSaveNamesArr} name='currentNameFromAttributesSaveNamesArr' widthSelect={'100%'} />
          </div>
          <div className={s.filterBlock}>
            <InputText value={valueForFilter} onChange={onChangeValueForFilter} name={'valueForFilter'} widthInputText={'75%'} />
            <MainButton onClick={() => {}}>
              <FontAwesomeIcon icon={faFilter} size='2x' style={{ color: '#ffffff' }} />
            </MainButton>
            <MainButton onClick={() => {}}>
              <FontAwesomeIcon icon={faCircleXmark} size='2x' style={{ color: '#ffffff' }} />
            </MainButton>
          </div>
          <div className={s.btnWrapStandart}>
            <MainButton onClick={() => {}} title={'Загрузить'} widthBtn={'100%'} />
          </div>
          <div className={s.btnWrapStandart}>
            <MainButton onClick={() => {}} title={'Сохранить'} widthBtn={'100%'} />
          </div>
        </div>
      </div>
    </div>
  );
});
