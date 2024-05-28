import React from 'react';
import { useAppSelector, useAppDispatch } from '../../../utils/redux_ulils';
import s from './Media.module.css';
import { Checkbox } from '../common/Checkbox/Checkbox';
import { MainButton } from '../common/MainButton/MainButton';
import { setMedia } from '../../../store/inputParametersSlice';
import { onChangeCheckBoxInParametersArr } from '../../../helpers/helpers';

type MediaPropsType = {
  modalActive: boolean;
  setModalActive: (value: boolean) => void;
};

export const Media = React.memo(({ modalActive, setModalActive }: MediaPropsType) => {
  const dispatch = useAppDispatch();
  const media = useAppSelector(state => state.input.media);

  const onClickSelectAll = () => {
    const updatedMedia = media.map(item => {
      const selectedItem = { ...item };
      selectedItem.isChecked = true;
      return selectedItem;
    });
    dispatch(setMedia(updatedMedia));
  };

  const onClickNothingSelected = () => {
    const updatedMedia = media.map(item => {
      const selectedItem = { ...item };
      selectedItem.isChecked = false;
      return selectedItem;
    });
    dispatch(setMedia(updatedMedia));
  };

  return (
    <div className={modalActive ? s.modal + ' ' + s.active : s.modal}>
      <div className={s.card}>
        <div className={s.titleBlock}>
          <p style={{ margin: '0' }}>Медиа</p>

          <button
            onClick={() => {
              setModalActive(false);
            }}
            className={s.closeButton}
          >
            &times;
          </button>
        </div>

        <div className={s.content}>
          <div className={s.media}>
            {media &&
              media.map((item, ind) => (
                <div className={s.checkBoxWrap}>
                  <Checkbox
                    checked={media[ind].isChecked}
                    onChangeChecked={() => {
                      onChangeCheckBoxInParametersArr(dispatch, media, setMedia, item.name);
                    }}
                    label={item.name}
                    id={item.name}
                    name={item.name}
                  />
                </div>
              ))}
          </div>
          <div className={s.btns}>
            <div className={s.btnWrap}>
              <MainButton onClick={onClickSelectAll} title={'Выделить все'} widthBtn={'100%'} />
            </div>
            <div className={s.btnWrap}>
              <MainButton onClick={onClickNothingSelected} title={'Снять все'} widthBtn={'100%'} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});
