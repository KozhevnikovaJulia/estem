import React from 'react';
import ReactExport from 'react-export-excel';
import { MainButton } from '../common/MainButton/MainButton';

const ExcelFile = ReactExport.ExcelFile;
const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;
const ExcelColumn = ReactExport.ExcelFile.ExcelColumn;

export const SaveXLS = React.memo(props => {
  const datasetForExport = [{ item: '1' }, { item: '2' }];

  return (
    <div>
      <ExcelFile element={<MainButton onClick={() => {}} title={'Сохранить\n проект'} />} filename='exportXLS2'>
        <ExcelSheet data={datasetForExport} name='данные'>
          <ExcelColumn label='item' value='item' />
        </ExcelSheet>
      </ExcelFile>
    </div>
  );
});
