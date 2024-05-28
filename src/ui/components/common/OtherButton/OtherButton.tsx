import React from 'react';
import s from './OtherButton.module.css';

type MainButtonPropsType = {
  onClick: () => void;
  title?: string;
  widthBtn?: number | string;
  children?: any;
};

export const OtherButton = React.memo(({ onClick, title, widthBtn, children }: MainButtonPropsType) => {
  return (
    <div>
      <button className={s.stepButton} onClick={onClick} style={{ width: widthBtn }}>
        <div className={s.childrenWrap}>{children}</div>
        {title}
      </button>
    </div>
  );
});
