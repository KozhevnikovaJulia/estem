import React from 'react';
import s from './MainButton.module.css';

type MainButtonPropsType = {
  onClick: () => void;
  title?: string;
  widthBtn?: number | string;
  children?: any;
};

export const MainButton = React.memo(({ onClick, title, widthBtn, children }: MainButtonPropsType) => {
  return (
    <div>
      <button className={s.stepButton} onClick={onClick} style={{ width: widthBtn }}>
        <div className={s.childrenWrap}>{children}</div>
        {title}
      </button>
    </div>
  );
});
