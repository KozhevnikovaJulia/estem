import React from 'react';
import s from './Warning.module.css';
import { setError, setInfo } from '../../../../store/appSlice';
import { useAppDispatch } from '../../../../utils/redux_ulils';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleQuestion, faTriangleExclamation } from '@fortawesome/free-solid-svg-icons';

type WarningPropsType = {
  text: string | null;
  warningVisible: boolean;
  setWarningVisible: (warningVisible: boolean) => void;
  children?: any;
  isQuestion?: boolean;
};

export const Warning = React.memo(({ text, warningVisible, setWarningVisible, children, isQuestion }: WarningPropsType) => {
  const dispatch = useAppDispatch();

  return (
    <div
      className={warningVisible ? s.warning + ' ' + s.active : s.warning}
      onClick={() => {
        setWarningVisible(false);
        dispatch(setError(null));
        dispatch(setInfo(null));
      }}
    >
      <div className={s.warningCard}>
        {/* <div className={s.titleBlock}>
          <p style={{ margin: '0' }}>Внимание</p>

          <button
            onClick={() => {
              setWarningVisible(false);
            }}
            className={s.closeButton}
          >
            &times;
          </button>
        </div> */}
        <FontAwesomeIcon icon={isQuestion ? faCircleQuestion : faTriangleExclamation} size='3x' style={{ color: '#d32f2f', marginBottom: 10 }} />
        <div style={{ marginBottom: 10 }}>{text}</div>

        {children}
      </div>
    </div>
  );
});
