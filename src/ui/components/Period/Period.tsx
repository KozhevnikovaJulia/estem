import React, { useState } from 'react';
import { useAppSelector, useAppDispatch } from '../../../utils/redux_ulils';
import s from './Period.module.css';
import { MainCalendar } from '../../components/common/MainCalendar/MainCalendar';
import { EditableSpan } from '../../components/common/EditableSpan/EditableSpan';
import { changeCase } from '../../../helpers/helpers';
import { setDateStart, setDateEnd } from '../../../store/inputParametersSlice';

type PeriodPropsType = {
  modalActive: boolean;
  setModalActive: (value: boolean) => void;
  parameter: string;
};

export const Period = React.memo(({ modalActive, setModalActive, parameter }: PeriodPropsType) => {
  const date_start = useAppSelector(state => state.input.date_start);
  const date_end = useAppSelector(state => state.input.date_end);
  const dispatch = useAppDispatch();

  const [valuesArr, setValuesArr] = useState([]);

  const onChangePeriodDate = (newValue: string, name: string) => {
    if (name === 'date_start') {
      dispatch(setDateStart(newValue));
    } else {
      dispatch(setDateEnd(newValue));
    }
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
          <div className={s.smallBlockWrap}>
            <div>Период</div>
            <div className={s.period}>
              <div style={{ marginRight: 5 }}>от</div>
              <div className={s.editableSpanWrap}>
                <EditableSpan value={date_start} onChange={onChangePeriodDate} name={'date_start'} />
              </div>
            </div>

            <div className={s.period}>
              <div style={{ marginRight: 5 }}> до</div>
              <div className={s.editableSpanWrap}>
                <EditableSpan value={date_end} onChange={onChangePeriodDate} name={'date_end'} />
              </div>
            </div>
          </div>
          <div className={s.calendarWrap}>
            <MainCalendar valuesArr={valuesArr} setValuesArr={setValuesArr} />
          </div>
        </div>
      </div>
    </div>
  );
});
