import React, { useState, useRef, useEffect } from 'react';
import '../../../App.css';
import { useAppSelector, useAppDispatch } from '../../../utils/redux_ulils';
import s from './SelectCategory.module.css';
import { Warning } from '../common/Warning/Warning';
import { Select } from '../../components/common/Select/Select';
import { InputText } from '../common/InputText/InputText';
import { MainButton } from '../common/MainButton/MainButton';
import { OtherButton } from '../common/OtherButton/OtherButton';
import { TextArea } from '../common/TextArea/TextArea';
import { changeCase, translator } from '../../../helpers/helpers';
import { setAttributeText, setSelectCategorySearchParamMedia, setSelectedConditions, setSelectCategorySearchParam, setSelectCategorySearchParam2, setSelectCategorySearchText } from '../../../store/inputParametersSlice';
import { attributesArr } from '../../../assets/data/data';
import { get_search_by_value, get_search_option_Type, ObjAdvertiserType, get_search_by_root, ObjArticleType } from '../../../store/dataFromBackSlice';

type SelectCategoryPropsType = {
  modalActive: boolean;
  setModalActive: (value: boolean) => void;
  parameter: string;
};

export const SelectCategory = React.memo(({ modalActive, setModalActive, parameter }: SelectCategoryPropsType) => {
  const dispatch = useAppDispatch();
  const selectedConditions = useAppSelector(state => state.input.selectedConditions);
  const selectCategorySearchParam = useAppSelector(state => state.input.selectCategorySearchParam);
  const selectCategorySearchParam2 = useAppSelector(state => state.input.selectCategorySearchParam2);
  const selectCategorySearchText = useAppSelector(state => state.input.selectCategorySearchText);
  const selectCategorySearchParamMedia = useAppSelector(state => state.input.selectCategorySearchParamMedia);
  const dataFromSearchAdvertiser = useAppSelector(state => state.dataFromBack.dataFromSearchAdvertiser);
  const dataFromSearchArticle = useAppSelector(state => state.dataFromBack.dataFromSearchArticle);

  const currentAttrMedia = attributesArr.find(item => item.mainAttrute === parameter && item.attributeNameForMedia === selectCategorySearchParamMedia);
  const currentAttrNotMedia = attributesArr.find(item => item.mainAttrute === parameter);
  const currentAttrArr = parameter === 'СМИ' ? currentAttrMedia && currentAttrMedia.attributes : currentAttrNotMedia && currentAttrNotMedia.attributes;
  const attributeText = useAppSelector(state => state.input.attributeText);

  const [objForSearchByValue, setObjForSearchByValue] = useState<get_search_option_Type>({ entity: '', name: '', id: 0 });
  const [selectElement, setSelectElement] = useState<string>('');
  const [currentPos, setCurrentPos] = useState<number>(0);
  const [quesVisible, setQuesVisible] = useState<boolean>(false);

  const innerRef = React.createRef<HTMLInputElement>();

  function newColor(e: any) {
    // const allElements = document.querySelectorAll('.item');
    // allElements.forEach(el => el.classList.remove('selected'));
    // allElements.forEach(el => el.classList.contains('selected') && el.classList.add('oldSelected'));

    const element = e.target;
    if (element.classList.contains('selected')) {
    } else {
      e.target.classList.add('selected');
    }
  }
  const onChangeSelectCategorySearchText = (e: any) => {
    const updatedSelectCategorySearchText = selectCategorySearchText.map(item => {
      const otherItem = { ...item };
      const selectedItem = { ...item };
      selectedItem.text = e;
      return selectedItem.parameter === parameter ? selectedItem : otherItem;
    });
    dispatch(setSelectCategorySearchText(updatedSelectCategorySearchText));
  };
  const onChangeSelectedConditions = (e: any) => {
    dispatch(setSelectedConditions(e));
  };
  const onClickAdd = () => {
    const newAttributeText = attributeText.concat(`(${selectedConditions}) `);
    dispatch(setAttributeText(newAttributeText));
    setModalActive(false);
  };
  const onClickClear = () => {
    dispatch(setSelectedConditions(''));
    setCurrentPos(0);
  };
  const onClickChoose = () => {
    const newSelectedConditions = selectedConditions.concat(`${selectElement} `);
    setCurrentPos(currentPos + ` ${newSelectedConditions} `.length);
    dispatch(setSelectedConditions(newSelectedConditions));
  };
  const onClickSearch_by_value_advertiser_param = () => {
    dispatch(get_search_by_value(objForSearchByValue));
  };
  const onClickSearch_by_value_media_param = () => {};
  const onClickSearch_by_value_article_param = () => {};

  const onChangeSearchParam = (newValue: string) => {
    dispatch(setSelectCategorySearchParam(newValue));
  };
  const onChangeSearchParam2 = (newValue: string) => {
    dispatch(setSelectCategorySearchParam2(newValue));
  };
  const onChangeSelectCategorySearchParamMedia = (newValue: string) => {
    dispatch(setSelectCategorySearchParamMedia(newValue));
  };

  const onClickTextInputBlockBtn = (symbol: string) => {
    const arr = selectedConditions.split('');
    arr.splice(currentPos, 0, ` ${symbol} `.toUpperCase());
    const newSelectedConditions = arr.join('');
    dispatch(setSelectedConditions(newSelectedConditions));
    setCurrentPos(currentPos + ` ${symbol} `.length);

    setTimeout(() => {
      innerRef.current && innerRef.current.focus();
    }, 100);
  };

  const findArticleView = (item: string) => {
    if (parameter === 'Рекламодатели->Продукты') {
      return (
        <div className={s.article}>
          {dataFromSearchAdvertiser[item as keyof ObjAdvertiserType][0] &&
            dataFromSearchAdvertiser[item as keyof ObjAdvertiserType].map(i => {
              return (
                <div
                  className={i.isChacked ? 'oldSelected' : 'item'}
                  onClick={e => {
                    newColor(e);
                    setSelectElement(`${translator(item)}=[${i.name}]`);
                    item !== 'Продукт' &&
                      dispatch(
                        get_search_by_root({
                          entity: item,
                          id: i.id,
                        })
                      );
                  }}
                >
                  {i.name}
                </div>
              );
            })}
        </div>
      );
    } else if (parameter === 'Категирии 1->4') {
      return (
        <div className={s.article}>
          {dataFromSearchArticle[item as keyof ObjArticleType][0] &&
            dataFromSearchArticle[item as keyof ObjArticleType].map(i => {
              return (
                <div
                  className={i.isChacked ? 'oldSelected' : 'item'}
                  onClick={e => {
                    newColor(e);
                    setSelectElement(`${translator(item)}=[${i.name}]`);
                    item !== 'Article4' &&
                      dispatch(
                        get_search_by_root({
                          entity: item,
                          id: i.id,
                        })
                      );
                  }}
                >
                  {i.name}
                </div>
              );
            })}
        </div>
      );
    } else {
      return <div className={s.article}></div>;
    }
  };

  const findSearchView = () => {
    const currentValue = selectCategorySearchText.find(i => i.parameter === parameter)?.text;
    if (parameter === 'Рекламодатели->Продукты') {
      return (
        <div className={s.filterBlock}>
          <InputText value={currentValue} onChange={onChangeSelectCategorySearchText} name={'selectCategorySearchText_advertiser_param'} widthInputText={'60%'} />
          <div className={s.selectWrap2}>
            <Select items={['name', 'id', 'ename']} value={selectCategorySearchParam} onChange={onChangeSearchParam} name='searchParam' widthSelect={'100%'} />
          </div>
          <MainButton onClick={onClickSearch_by_value_advertiser_param} title={'Поиск'} widthBtn={100} />
        </div>
      );
    } else if (parameter === 'СМИ') {
      return (
        <div className={s.filterBlock}>
          <InputText value={currentValue} onChange={onChangeSelectCategorySearchText} name={'selectCategorySearchText_media_param'} widthInputText={'60%'} />
          <div className={s.selectWrap2}>
            <Select items={['name', 'id', 'ename']} value={selectCategorySearchParam} onChange={onChangeSearchParam} name='searchParam' widthSelect={'100%'} />
          </div>
          <MainButton onClick={onClickSearch_by_value_media_param} title={'Поиск'} widthBtn={100} />
        </div>
      );
    } else if (parameter === 'Категирии 1->4') {
      return (
        <div className={s.filterBlock}>
          <InputText value={currentValue} onChange={onChangeSelectCategorySearchText} name={'selectCategorySearchText_article_param'} widthInputText={'60%'} />
          <MainButton onClick={onClickSearch_by_value_article_param} title={'Поиск'} widthBtn={100} />
        </div>
      );
    }
  };

  useEffect(() => {
    const currentValueSelectCategorySearchText = selectCategorySearchText.find(i => i.parameter === parameter)?.text;
    if (selectCategorySearchParam === 'name') {
      setObjForSearchByValue({
        entity: selectCategorySearchParam2,
        name: currentValueSelectCategorySearchText,
      });
    } else if (selectCategorySearchParam === 'id') {
      setObjForSearchByValue({
        entity: selectCategorySearchParam2,
        id: currentValueSelectCategorySearchText ? +currentValueSelectCategorySearchText : 0,
      });
    }
  }, [selectCategorySearchText, selectCategorySearchParam, selectCategorySearchParam2]);

  useEffect(() => {
    if (parameter === 'Категирии 1->4') {
      dispatch(
        get_search_by_root({
          entity: 'Article1',
        })
      );
    }
  }, []);

  return (
    <div className={modalActive ? s.modal + ' ' + s.active : s.modal}>
      <div className={s.card}>
        <div className={s.titleBlock}>
          <p style={{ margin: '0' }}>Выбор {changeCase(parameter)}</p>

          <button
            onClick={() => {
              selectedConditions !== '' ? setQuesVisible(true) : setModalActive(false);
            }}
            className={s.closeButton}
          >
            &times;
          </button>
        </div>

        <div className={s.content}>
          {parameter === 'Рекламодатели->Продукты' && (
            <div className={s.filterBlock}>
              <div className={s.selectWrap1}>
                <Select items={['Рекламодатель', 'Бренд', 'Суб-бренд', 'Продукт']} value={selectCategorySearchParam2} onChange={onChangeSearchParam2} name='searchParam2' widthSelect={'100%'} />
              </div>
            </div>
          )}

          {parameter === 'СМИ' && (
            <div className={s.filterBlock}>
              <div className={s.selectWrap1}>
                <Select items={['ТВ', 'Радио', 'Пресса', 'ООН', 'Интернет']} value={selectCategorySearchParamMedia} onChange={onChangeSelectCategorySearchParamMedia} name='selectCategorySearchParamMedia' widthSelect={'100%'} />
              </div>
            </div>
          )}

          {findSearchView()}

          <div className={s.articlesBlock}>
            {currentAttrArr &&
              currentAttrArr.map(item => {
                return (
                  <div className={s.articleWrap}>
                    <div className={s.articleName}>{item}:</div>
                    {findArticleView(item)}
                  </div>
                );
              })}
          </div>

          <div className={s.btnWrapStandart}>
            <MainButton onClick={onClickChoose} title={'Выбрать'} widthBtn={'100%'} />
          </div>

          <div style={{ textAlign: 'center', marginBottom: '2%' }}>Выбранные условия:</div>
          <div className={s.btnsBlock}>
            <div className={s.btnsWrap}>
              <OtherButton
                onClick={() => {
                  onClickTextInputBlockBtn('(');
                }}
                title={'('}
                widthBtn={'100%'}
              />
            </div>
            <div className={s.btnsWrap}>
              <OtherButton
                onClick={() => {
                  onClickTextInputBlockBtn(')');
                }}
                title={')'}
                widthBtn={'100%'}
              />
            </div>
            <div className={s.btnsWrap}>
              <OtherButton
                onClick={() => {
                  onClickTextInputBlockBtn('AND');
                }}
                title={'AND'}
                widthBtn={'100%'}
              />
            </div>
            <div className={s.btnsWrap}>
              <OtherButton
                onClick={() => {
                  onClickTextInputBlockBtn('OR');
                }}
                title={'OR'}
                widthBtn={'100%'}
              />
            </div>
            <div className={s.btnsWrap}>
              <OtherButton
                onClick={() => {
                  onClickTextInputBlockBtn('NOT');
                }}
                title={'NOT'}
                widthBtn={'100%'}
              />
            </div>
            <div className={s.btnsWrap}>
              <OtherButton
                onClick={() => {
                  onClickTextInputBlockBtn('<-');
                }}
                title={'<-'}
                widthBtn={'100%'}
              />
            </div>
          </div>
          <div className={s.btnWrapStandart}>
            <TextArea name={'selectedConditions'} value={selectedConditions} onChange={onChangeSelectedConditions} widthTextArea={'98%'} innerRef={innerRef} />
          </div>

          <div className={s.btnWrapStandart}>
            <MainButton onClick={onClickAdd} title={'Добавить'} widthBtn={'100%'} />
          </div>
          <div className={s.btnWrapStandart}>
            <MainButton onClick={onClickClear} title={'Очистить'} widthBtn={'100%'} />
          </div>
        </div>
      </div>
      {
        <Warning text={'Сохранить условия?'} warningVisible={quesVisible} setWarningVisible={setQuesVisible} isQuestion>
          <div className={s.btnsBlock}>
            <div className={s.btnWrapStandart} style={{ marginRight: 10 }}>
              <OtherButton onClick={onClickAdd} title={'Да'} widthBtn={'100%'} />
            </div>
            <div className={s.btnWrapStandart}>
              <OtherButton
                onClick={() => {
                  setModalActive(false);
                }}
                title={'Нет'}
                widthBtn={'100%'}
              />
            </div>
          </div>
        </Warning>
      }
    </div>
  );
});
