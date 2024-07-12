import React from 'react';
import { t } from 'i18next';
import { Paper, Table, TableBody, TableCell, TableContainer, TableFooter, TableHead, TableRow } from '@mui/material';
import CustomTableCell from './customTableCell';
import { ITableBodyData, TableCellTypes, TableHeaderData } from '../../Interfaces/componentTypes';
import { PlusIcon } from '../../Assets/Icons';
import styles from './table.module.scss';

interface IProps {
  bodyData: Array<ITableBodyData>,
  headerData: TableHeaderData,
  addAction?: () => void,
  editable?: boolean,
  onEdit?: (id: number) => void
}

const CustomTable: React.FC<IProps> = (props) => {
  const { headerData, bodyData, addAction = false, editable, onEdit } = props;

  return (
    <div className='customTable'>
      <TableContainer component={Paper} >
        <Table sx={{ minWidth: '100%' }} aria-label="customized table">
          <TableHead >
            <TableRow >
              {headerData.map((item, index) => {
                return (
                  <CustomTableCell type={TableCellTypes.HEADER} data={item.title} key={item.title + index} contentType={item.contentType} />
                )
              })}
            </TableRow>
          </TableHead>
          <TableBody>
            {bodyData.map((data, index) => (
              <TableRow key={index}
                className={editable ? styles.editableRow : ''}
                onClick={editable ? () => onEdit!(data.id) : () => { }}
              >
                {data.data.map((item, index) => {
                  return (
                    <CustomTableCell
                      type={TableCellTypes.BODY}
                      data={item.component}
                      key={index}
                      contentType={item.contentType}
                    />
                  )
                })}
              </TableRow>
            ))}
          </TableBody>
          {
            addAction
            &&
            <TableFooter>
              <TableCell>
                <div className={styles.plusFooter} onClick={addAction}>
                  <img src={PlusIcon} alt='plusIcon' />
                  <div>{t('Button.Add')}</div>
                </div>
              </TableCell>
            </TableFooter>
          }

        </Table>
      </TableContainer>
    </div>
  )
}

export default CustomTable
