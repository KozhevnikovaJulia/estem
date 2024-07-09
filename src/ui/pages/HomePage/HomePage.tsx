import React, { useState, useEffect } from 'react';
import { useAppSelector, useAppDispatch } from '../../../utils/redux_ulils';
import s from './HomePage.module.css';
import { Header2 } from '../../components/Header2/Header2';
import { Warning } from '../../components/common/Warning/Warning';
import { Checkbox } from '../../components/common/Checkbox/Checkbox';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarDays, faFileArrowUp, faFileClipboard, faFileContract, faFileImport, faLayerGroup, faPhotoFilm, faRectangleAd } from '@fortawesome/free-solid-svg-icons';
import { TextArea } from '../../components/common/TextArea/TextArea';
import { MainButton } from '../../components/common/MainButton/MainButton';
import { OtherButton } from '../../components/common/OtherButton/OtherButton';
import { SelectCategory } from '../../components/SelectCategory/SelectCategory';
import { Period } from '../../components/Period/Period';
import { Media } from '../../components/Media/Media';
import { Template } from '../../components/Template/Template';
import { setSelectedConditions, setAttributeText, setEstimation, setMonthNum, setShortLists, setAggregation, setExportFormat, setConditionType, setLanguage } from '../../../store/inputParametersSlice';
import { setDataFromSearchAdvertiser, setDataFromSearchArticle } from '../../../store/dataFromBackSlice';
import { onChangeCheckBoxInParametersArrOneSelect } from '../../../helpers/helpers';

export const HomePage = React.memo(() => {
  const [currentPos, setCurrentPos] = useState<number>(0);

  const [modalCategoryActive, setModalCategoryActive] = useState<boolean>(false);
  const [currentParameter, setCurrentParameter] = useState<string>('');

  const [modalCalendarActive, setModalCalendarActive] = useState<boolean>(false);
  const [currentParameterCalendar, setCurrentParameterCalendar] = useState<string>('');

  const [modalMediaActive, setModalMediaActive] = useState<boolean>(false);
  const [modalTemplateActive, setModalTemplateActive] = useState<boolean>(false);

  const [wornCondVisible, setWornCondVisible] = useState<boolean>(false);
  const [wornAddLinkingOperatorVisible, setWornAddLinkingOperatorVisible] = useState<boolean>(false);

  const attributeText = useAppSelector(state => state.input.attributeText);
  const exportFormat = useAppSelector(state => state.input.exportFormat);
  const estimation = useAppSelector(state => state.input.estimation);
  const monthNum = useAppSelector(state => state.input.monthNum);
  const shortLists = useAppSelector(state => state.input.shortLists);
  const aggregation = useAppSelector(state => state.input.aggregation);
  const conditionType = useAppSelector(state => state.input.conditionType);
  const language = useAppSelector(state => state.input.language);

  const dispatch = useAppDispatch();
  const innerRef = React.createRef<HTMLInputElement>();

  const onChangeAttributeText = (e: any) => {
    dispatch(setAttributeText(e));
  };

  const onClickAttrParameter = (parameter: string, fromWornCard: boolean) => {
    if (fromWornCard || attributeText === '') {
      setModalCategoryActive(true);
      setCurrentParameter(parameter);
      dispatch(setDataFromSearchAdvertiser({ Рекламодатель: [], Бренд: [], 'Суб-бренд': [], Продукт: [] }));
      dispatch(setDataFromSearchArticle({ Article1: [], Article2: [], Article3: [], Article4: [] }));
      dispatch(setSelectedConditions(''));
    } else {
      setCurrentParameter(parameter);
      setWornAddLinkingOperatorVisible(true);
    }
  };

  const onClickTextInputBlockBtn = (symbol: string) => {
    const arr = attributeText.split('');
    arr.splice(currentPos, 0, ` ${symbol} `.toUpperCase());
    const newAttributeText = arr.join('');
    dispatch(setAttributeText(newAttributeText));
    setCurrentPos(currentPos + ` ${symbol} `.length);

    setTimeout(() => {
      innerRef.current && innerRef.current.focus();
    }, 100);
  };

  useEffect(() => {
    innerRef.current !== null && innerRef.current.focus();
    setCurrentPos(attributeText.length);
  }, [attributeText]);

  return (
    <>
      <div className={s.pageWrapper}>
        <Header2 />

        <div className={s.contentBlock}>
          <div className={s.mediaBlock}>
            <div className={s.mediaBlockTitle}>Условия для отчета</div>

            <div className={s.btnWrapStandart}>
              <OtherButton
                onClick={() => {
                  setModalCalendarActive(true);
                }}
                title={'Календарь'}
                widthBtn={'100%'}
              >
                <FontAwesomeIcon icon={faCalendarDays} size='2x' style={{ color: '#ffffff' }} />
              </OtherButton>
            </div>

            <div className={s.twoBtnWrap}>
              <div className={s.btnWrapStandart}>
                <OtherButton
                  onClick={() => {
                    onClickAttrParameter('Рекламодатели->Продукты', false);
                  }}
                  title={'Рекламодатели->Продукты'}
                  widthBtn={'100%'}
                >
                  <FontAwesomeIcon icon={faRectangleAd} size='2x' style={{ color: '#ffffff' }} />
                </OtherButton>
              </div>
              <div className={s.btnWrapStandart}>
                <OtherButton
                  onClick={() => {
                    onClickAttrParameter('Категирии 1->4', false);
                  }}
                  title={'Категирии 1->4'}
                  widthBtn={'100%'}
                >
                  <FontAwesomeIcon icon={faLayerGroup} size='2x' style={{ color: '#ffffff' }} />
                </OtherButton>
              </div>
            </div>

            <div className={s.btnWrapStandart}>
              <OtherButton
                onClick={() => {
                  onClickAttrParameter('СМИ', false);
                }}
                title={'СМИ'}
                widthBtn={'100%'}
              >
                <FontAwesomeIcon icon={faPhotoFilm} size='2x' style={{ color: '#ffffff' }} />
              </OtherButton>
            </div>
            <div className={s.btnWrapStandart}>
              <MainButton
                onClick={() => {
                  setModalMediaActive(true);
                }}
                title={'СМИ'}
                widthBtn={'100%'}
              />
            </div>
          </div>

          <div className={s.mediaBlock}>
            <div className={s.mediaBlockTitle}>Настройки отчета</div>
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
            <TextArea name={'attributeText'} value={attributeText} onChange={onChangeAttributeText} currentPos={currentPos} setCurrentPos={setCurrentPos} innerRef={innerRef} widthTextArea={'90%'} />

            <div className={s.smallBlockWrap}>
              <div>Вид условия</div>
              <Checkbox
                checked={conditionType[0].isChecked}
                onChangeChecked={() => {
                  onChangeCheckBoxInParametersArrOneSelect(dispatch, conditionType, setConditionType, 'SQL');
                }}
                label={'SQL'}
                id={'SQL'}
                name={'SQL'}
              />
              <Checkbox
                checked={conditionType[1].isChecked}
                onChangeChecked={() => {
                  onChangeCheckBoxInParametersArrOneSelect(dispatch, conditionType, setConditionType, 'TXT');
                }}
                label={'TXT'}
                id={'TXT'}
                name={'TXT'}
              />
            </div>

            <div className={s.smallBlockWrap}>
              <div>Язык отчета</div>
              <Checkbox
                checked={language[0].isChecked}
                onChangeChecked={() => {
                  onChangeCheckBoxInParametersArrOneSelect(dispatch, language, setLanguage, 'Рус');
                }}
                label={'Рус'}
                id={'Рус'}
                name={'Рус'}
              />
              <Checkbox
                checked={language[1].isChecked}
                onChangeChecked={() => {
                  onChangeCheckBoxInParametersArrOneSelect(dispatch, language, setLanguage, 'Eng');
                }}
                label={'Eng'}
                id={'Eng'}
                name={'Eng'}
              />
            </div>

            <div className={s.btnWrapStandart}>
              <OtherButton
                onClick={() => {
                  setModalTemplateActive(true);
                }}
                title={'Шаблоны отчетов'}
                widthBtn={'100%'}
              >
                <FontAwesomeIcon icon={faFileImport} size='2x' style={{ color: '#ffffff' }} />
              </OtherButton>
            </div>
          </div>
          <div className={s.mediaBlock}>
            <div className={s.mediaBlockTitle}>Отчет</div>

            <div className={s.smallBlockWrap}>
              <div>Эстимация</div>
              <Checkbox
                checked={estimation[0].isChecked}
                onChangeChecked={() => {
                  onChangeCheckBoxInParametersArrOneSelect(dispatch, estimation, setEstimation, 'NEW');
                }}
                label={'NEW'}
                id={'NEW'}
                name={'NEW'}
              />
              <Checkbox
                checked={estimation[1].isChecked}
                onChangeChecked={() => {
                  onChangeCheckBoxInParametersArrOneSelect(dispatch, estimation, setEstimation, 'OLD');
                }}
                label={'OLD'}
                id={'OLD'}
                name={'OLD'}
              />
            </div>

            <div className={s.smallBlockWrap}>
              <div>№ Месяца</div>
              <Checkbox
                checked={monthNum[0].isChecked}
                onChangeChecked={() => {
                  onChangeCheckBoxInParametersArrOneSelect(dispatch, monthNum, setMonthNum, 'Да');
                }}
                label={'Да'}
                id={'monthNum_yes'}
                name={'monthNum_yes'}
              />
              <Checkbox
                checked={monthNum[1].isChecked}
                onChangeChecked={() => {
                  onChangeCheckBoxInParametersArrOneSelect(dispatch, monthNum, setMonthNum, 'Нет');
                }}
                label={'Нет'}
                id={'monthNum_no'}
                name={'monthNum_no'}
              />
            </div>

            <div className={s.smallBlockWrap}>
              <div>Short-листы</div>
              <Checkbox
                checked={shortLists[0].isChecked}
                onChangeChecked={() => {
                  onChangeCheckBoxInParametersArrOneSelect(dispatch, shortLists, setShortLists, 'Да');
                }}
                label={'Да'}
                id={'shortLists_yes'}
                name={'shortLists_yes'}
              />
              <Checkbox
                checked={shortLists[1].isChecked}
                onChangeChecked={() => {
                  onChangeCheckBoxInParametersArrOneSelect(dispatch, shortLists, setShortLists, 'Нет');
                }}
                label={'Нет'}
                id={'shortLists_no'}
                name={'shortLists_no'}
              />
            </div>

            <div className={s.smallBlockWrap}>
              <div>Агрегирование</div>
              <Checkbox
                checked={aggregation[0].isChecked}
                onChangeChecked={() => {
                  onChangeCheckBoxInParametersArrOneSelect(dispatch, aggregation, setAggregation, 'MO');
                }}
                label={'MO'}
                id={'MO'}
                name={'MO'}
              />
              <Checkbox
                checked={aggregation[1].isChecked}
                onChangeChecked={() => {
                  onChangeCheckBoxInParametersArrOneSelect(dispatch, aggregation, setAggregation, 'WE');
                }}
                label={'WE'}
                id={'WE'}
                name={'WE'}
              />
            </div>

            <div className={s.smallBlockWrap}>
              <div>Формат отчета:</div>
              <Checkbox
                checked={exportFormat[1].isChecked}
                onChangeChecked={() => {
                  onChangeCheckBoxInParametersArrOneSelect(dispatch, exportFormat, setExportFormat, 'EXCEL');
                }}
                label={'XLS'}
                id={'exportEXCEL'}
                name={'EXCEL'}
              />
              <Checkbox
                checked={exportFormat[0].isChecked}
                onChangeChecked={() => {
                  onChangeCheckBoxInParametersArrOneSelect(dispatch, exportFormat, setExportFormat, 'TXT');
                }}
                label={'TXT'}
                id={'exportTXT'}
                name={'TXT'}
              />
            </div>
            <div className={s.btnWrapStandart}>
              <MainButton onClick={() => {}} title={'Рассчитать отчет'} widthBtn={'100%'}>
                <FontAwesomeIcon icon={faFileContract} size='2x' style={{ color: '#ffffff' }} />
              </MainButton>
            </div>
          </div>
        </div>
      </div>
      {modalCategoryActive && <SelectCategory modalActive={modalCategoryActive} setModalActive={setModalCategoryActive} parameter={currentParameter} />}
      {modalCalendarActive && <Period modalActive={modalCalendarActive} setModalActive={setModalCalendarActive} parameter={currentParameterCalendar} />}
      {modalMediaActive && <Media modalActive={modalMediaActive} setModalActive={setModalMediaActive} />}
      {modalTemplateActive && <Template modalActive={modalTemplateActive} setModalActive={setModalTemplateActive} />}
      {<Warning text={'Условия выборки не заданы'} warningVisible={wornCondVisible} setWarningVisible={setWornCondVisible} />}
      {
        <Warning text={'Перед добавлением нового условия не забудьте добавить связующий оператор (OR или AND)'} warningVisible={wornAddLinkingOperatorVisible} setWarningVisible={setWornAddLinkingOperatorVisible}>
          <div className={s.btnWrapStandart}>
            <OtherButton
              onClick={() => {
                onClickAttrParameter(currentParameter, true);
              }}
              title={'Ок'}
              widthBtn={'100%'}
            />
          </div>
        </Warning>
      }
    </>
  );
});
