import React from 'react';
import { useAppSelector } from '../../../utils/redux_ulils';
import ReactExport from 'react-data-export';
import { MainButton } from '../common/MainButton/MainButton';

const ExcelFile = ReactExport.ExcelFile;
const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;

export const ExportXLS = React.memo(props => {
  const sheet1 = [
    {
      xSteps: 0,
      ySteps: 0,
      columns: [
        {
          title: 'КАНАЛ',
          style: {
            font: { bold: true },
            fill: { patternType: 'solid', fgColor: { rgb: 'B4C6E7' } },
            alignment: { wrapText: true, horizontal: 'center', vertical: 'top' },
            border: { bottom: { style: 'thin', color: { rgb: '000000' } }, top: { style: 'thin', color: { rgb: '000000' } }, left: { style: 'thin', color: { rgb: '000000' } }, right: { style: 'thin', color: { rgb: '000000' } } },
          },
        },
        {
          title: 'BA',
          style: {
            font: { bold: true },
            fill: { patternType: 'solid', fgColor: { rgb: 'B4C6E7' } },
            alignment: { wrapText: true, horizontal: 'center', vertical: 'top' },
            border: { bottom: { style: 'thin', color: { rgb: '000000' } }, top: { style: 'thin', color: { rgb: '000000' } }, left: { style: 'thin', color: { rgb: '000000' } }, right: { style: 'thin', color: { rgb: '000000' } } },
          },
        },
      ],

      data: [
        [
          {
            value: 'hhh',
            style: {
              border: { bottom: { style: 'thin', color: { rgb: '000000' } }, top: { style: 'thin', color: { rgb: '000000' } }, left: { style: 'thin', color: { rgb: '000000' } }, right: { style: 'thin', color: { rgb: '000000' } } },
            },
          },
          {
            value: 'ggg',
            style: {
              alignment: { wrapText: true, horizontal: 'center', vertical: 'top' },
              border: { bottom: { style: 'thin', color: { rgb: '000000' } }, top: { style: 'thin', color: { rgb: '000000' } }, left: { style: 'thin', color: { rgb: '000000' } }, right: { style: 'thin', color: { rgb: '000000' } } },
            },
          },
        ],
      ],
    },
  ];

  return (
    <div>
      <ExcelFile element={<MainButton onClick={() => {}} title={'Выгрузка XLS'} />} filename='export_XLS'>
        <ExcelSheet dataSet={sheet1} name='Лист 1' />
      </ExcelFile>
    </div>
  );
});
