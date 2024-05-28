import React, { useState, useEffect } from 'react';
import s from './Select.module.css';
import down from '../../../../assets/images/down.png';

type SelectPropsType = {
  items: Array<string>;
  value: string;
  onChange: (item: string, name: string) => void;
  name: string;
  widthSelect?: number | string;
};

export const Select = React.memo(({ items, value, onChange, name, widthSelect }: SelectPropsType) => {
  const [selectListVisible, setSelectListVisible] = useState(false);
  const [selectedCategories, setSelectedCategories] = useState(value);
  const onClickSelect = () => {
    setSelectListVisible(!selectListVisible);
  };
  useEffect(() => {
    setSelectedCategories(value);
  }, [value]);
  return (
    <div className={s.select}>
      <input className={s.select__input} type='hidden' name={name} />
      <div className={s.select__head} onClick={onClickSelect} style={{ width: widthSelect }}>
        {selectedCategories} <img src={down} className={s.img} alt='down' />
      </div>
      <ul className={s.select__list} onPointerLeave={() => {}} style={selectListVisible ? { display: 'inLine' } : { display: 'none' }}>
        {items.map((item, index) => (
          <li
            key={index}
            className={s.select__item}
            onClick={() => {
              setSelectedCategories(item);
              setSelectListVisible(false);
              onChange(item, name);
            }}
          >
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
});
