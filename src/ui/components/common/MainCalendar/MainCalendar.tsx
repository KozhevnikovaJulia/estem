import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../../../utils/redux_ulils';
import './MainCalendar.css';
import { Calendar, DateObject } from 'react-multi-date-picker';
import { addZero } from '../../../../helpers/helpers';
import { setDateStart, setDateEnd } from '../../../../store/inputParametersSlice';

type MainCalendarPropsType = {
  valuesArr: Array<string> | DateObject[];
  setValuesArr: (value: any) => void;
};

export const MainCalendar = ({ valuesArr, setValuesArr }: MainCalendarPropsType) => {
  console.log(valuesArr);

  const date_start = useAppSelector(state => state.input.date_start);
  const date_end = useAppSelector(state => state.input.date_end);
  const dispatch = useAppDispatch();
  console.log(date_start);
  const weekDays = ['В', 'П', 'В', 'С', 'Ч', 'П', 'С'];
  const months = ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'];

  const onChangeDate = (date: any) => {
    const date_start = `${addZero(date[0].day)}.${addZero(date[0].month.number)}.${date[0].year}`;
    dispatch(setDateStart(date_start));

    const date_end = date[1] ? `${addZero(date[1].day)}.${addZero(date[1].month.number)}.${date[1].year}` : `${addZero(date[0].day)}.${addZero(date[0].month.number)}.${date[0].year}`;
    dispatch(setDateEnd(date_end));
  };

  useEffect(() => {
    if (date_start !== '') {
      debugger;
      const date_startArrStr = date_start.split('.');
      const date_endArrStr = date_end.split('.');
      const newValuesArr = [new DateObject().set({ year: +date_startArrStr[2], month: +date_startArrStr[1], day: +date_startArrStr[0] }), new DateObject().set({ year: +date_endArrStr[2], month: +date_endArrStr[1], day: +date_endArrStr[0] })];

      console.log(newValuesArr);
      setValuesArr(newValuesArr);
    }
  }, []);

  return <Calendar range weekStartDayIndex={1} value={valuesArr} onChange={onChangeDate} weekDays={weekDays} months={months} className='custom-calendar' />;
};
