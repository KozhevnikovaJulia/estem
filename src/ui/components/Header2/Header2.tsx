import React from 'react';
import s from './Header2.module.css';
import redStarBig from '../../../assets/images/RedStarBig.png';
import redLineBig from '../../../assets/images/RedLineBig.png';

export const Header2 = React.memo(() => {
  return (
    <div className={s.bar}>
      <div className={s.barContent}>
        <div className={s.delimiterWrapper}>
          <img src={redStarBig} alt='redStarSmall' style={{ width: '8%', height: '8%' }} />
          <div className={s.logoWrapper}>
            <div className={s.logo}>
              <span> MI&nbsp;</span> Estimator
            </div>
          </div>
          <img src={redLineBig} alt='redLineBig' style={{ width: '60%', height: '8%' }} />
        </div>
      </div>
    </div>
  );
});
