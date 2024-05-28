import React, { useState, useEffect, DetailedHTMLProps, InputHTMLAttributes, ChangeEventHandler } from 'react';
import s from './InputText.module.css';

type DefaultInputPropsType = DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>;

type InputTextPropsType = DefaultInputPropsType & {
  // и + ещё пропсы которых нет в стандартном инпуте
  value: string;
  onChange: ChangeEventHandler<HTMLTextAreaElement> & ((value: string) => void);
  name: string;
  widthInputText?: number | string;
};

export const InputText = React.memo(({ value, onChange, name, widthInputText, ...restProps }: InputTextPropsType) => {
  const [title, setTitle] = useState(value);

  const onChangeHandler = (e: any) => {
    setTitle(e.currentTarget.value);
  };
  const saveNewValueInState = () => {
    onChange(title);
  };

  useEffect(() => {
    setTitle(value);
  }, [value]);

  return (
    <>
      <input type='text' name={name} onChange={onChangeHandler} className={s.input} onBlur={saveNewValueInState} style={{ width: widthInputText }} {...restProps} value={title} />
    </>
  );
});
