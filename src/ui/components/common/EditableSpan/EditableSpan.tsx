import React, { useState } from 'react';
import s from './EditableSpan.module.css';
import down from '../../../../assets/images/down.png';

type EditableSpanPropsType = {
  value: string;
  onChange: (newValue: string, name: string) => void;
  name: string;
  isDisabled?: boolean;
  spanWidth?: number | string;
  onBtnClick?: (parameter: string) => void;
};

export const EditableSpan = React.memo(({ value, onChange, name, isDisabled }: EditableSpanPropsType) => {
  const [editMode, setEditMode] = useState(false);
  const [title, setTitle] = useState(value);

  const activateEditMode = () => {
    setEditMode(true);
    setTitle(value);
  };
  const disactivateEditMode = () => {
    setEditMode(false);
    onChange(title, name);
  };
  const onChangeHandler = (e: any) => {
    e.currentTarget.value === '0' ? setTitle('') : setTitle(e.currentTarget.value);
  };

  return editMode ? (
    <div>
      <input name={name} autoFocus onFocus={e => e.currentTarget.select()} onChange={onChangeHandler} onBlur={disactivateEditMode} value={title} className={isDisabled ? `${s.input} ${s.disabled}` : s.input} />
    </div>
  ) : (
    <div>
      <span style={{ cursor: 'pointer' }} onClick={activateEditMode} className={isDisabled ? `${s.span} ${s.disabled}` : s.span}>
        {value}
      </span>
    </div>
  );
});
