import React from 'react';
import { useAppSelector, useAppDispatch } from '../../../utils/redux_ulils';
import s from './Header.module.css';
import redStarBig from '../../../assets/images/RedStarBig.png';
import redLineBig from '../../../assets/images/RedLineBig.png';
import { useNavigate } from 'react-router-dom';
import { setTabbedConditionsIsActive, setTabbedMediaIsActive } from '../../../store/appSlice';

export const Header = React.memo(() => {
  const tabbedConditionsIsActive = useAppSelector(state => state.app.tabbedConditionsIsActive);
  const tabbedMediaIsActive = useAppSelector(state => state.app.tabbedMediaIsActive);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const onClickTabbedConditions = () => {
    dispatch(setTabbedConditionsIsActive(true));
    dispatch(setTabbedMediaIsActive(false));
    navigate('/');
  };
  const onClickTabbedMedia = () => {
    dispatch(setTabbedMediaIsActive(true));
    dispatch(setTabbedConditionsIsActive(false));
    navigate('/media');
  };

  return (
    <div className={s.bar}>
      <div className={s.barContent}>
        <div className={s.delimiterWrapper}>
          <img src={redStarBig} alt='redStarSmall' />
          <div className={s.logoWrapper}>
            <div className={s.logo}>
              <span> MI&nbsp;</span> Estimator
            </div>
          </div>
          <img src={redLineBig} alt='redLineBig' style={{ width: '60%', height: '6px' }} />
        </div>
        <div className={s.tabbedBlock}>
          <button className={tabbedConditionsIsActive ? `${s.active} ${s.headerButton}` : s.headerButton} onClick={onClickTabbedConditions}>
            Условия
          </button>
          <button className={tabbedMediaIsActive ? `${s.active} ${s.headerButton}` : s.headerButton} onClick={onClickTabbedMedia}>
            Медиа
          </button>
        </div>
      </div>
    </div>
  );
});
