import React, { ChangeEvent, ChangeEventHandler, MutableRefObject, DetailedHTMLProps, InputHTMLAttributes } from 'react';
import s from './TextArea.module.css';

type DefaultInputPropsType = DetailedHTMLProps<InputHTMLAttributes<HTMLTextAreaElement>, HTMLTextAreaElement>;

type TextAreaPropsType = DefaultInputPropsType & {
  value: string;
  onChange: ChangeEventHandler<HTMLTextAreaElement> & ((value: string) => void);
  name: string;
  currentPos?: number;
  setCurrentPos?: (value: number) => void;
  innerRef?: MutableRefObject<any>;
  widthTextArea: number | string;
};

export const TextArea = React.memo(({ value, onChange, name, currentPos, setCurrentPos, innerRef, widthTextArea, ...restProps }: TextAreaPropsType) => {
  const onChangeHandler = (e: any) => {
    onChange(e.currentTarget.value);
    setCurrentPos && setCurrentPos(e.target.selectionStart);
  };

  const onClickTextArea = (e: any) => {
    setCurrentPos && setCurrentPos(e.target.selectionStart);
  };

  return (
    <>
      <textarea
        style={{ width: widthTextArea }}
        onClick={e => {
          onClickTextArea(e);
        }}
        name={name}
        onChange={onChangeHandler}
        className={s.textarea}
        value={value}
        // ref={innerRef}
        // onFocus={e => {
        //   currentPos === 0 ? e.currentTarget.setSelectionRange(e.currentTarget.value.length, e.currentTarget.value.length) : e.currentTarget.setSelectionRange(currentPos, currentPos);
        // }}
        {...restProps}
      />
    </>
  );
});
