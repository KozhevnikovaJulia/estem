import React, { ChangeEvent, ChangeEventHandler, MutableRefObject, DetailedHTMLProps, InputHTMLAttributes } from 'react';
import s from './Checkbox.module.css';

type DefaultInputPropsType = DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>;

type CheckBoxPropsType = DefaultInputPropsType & {
  isDisabled?: boolean;
  checked: boolean;
  onChange?: ChangeEventHandler<HTMLTextAreaElement> & ((checked: boolean) => void);
  onChangeChecked?: ChangeEventHandler<HTMLTextAreaElement> & ((checked: boolean) => void);
  label: string;
  id: string;
  name: string;
};

export const Checkbox = React.memo(({ isDisabled, checked, onChangeChecked, onChange, label, id, name, ...restProps }: CheckBoxPropsType) => {
  const onChangeCallback = (e: ChangeEvent<HTMLInputElement>) => {
    onChange && onChange(e);
    onChangeChecked && onChangeChecked(e.currentTarget.checked);
  };

  return (
    <div>
      <input disabled={isDisabled} name={name} type={'checkbox'} id={id} onChange={onChangeCallback} checked={checked} className={s.input} {...restProps} />
      <label className={s.label} htmlFor={id}>
        {label}
      </label>
    </div>
  );
});
