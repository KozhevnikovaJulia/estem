import React from 'react';
import s from './Progress.module.css';

export const Progress = React.memo(props => {
  return (
    <div className={s.progressWrapper}>
      <div className={`${s.meter} ${s.red}`}>
        <span style={{ width: '100%' }}></span>
        <div className={s.spinnerContainer}>
          <div className={s.loadingSpinner}></div>
        </div>
      </div>
    </div>
  );
});
