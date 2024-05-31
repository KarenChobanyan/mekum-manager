import React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableFooter, TableHead, TableRow } from '@mui/material';
import CustomTableCell from './customTableCell';
import { TableCellTypes } from '../../Interfaces/componentTypes';
import { IFormItemData } from '../../Pages/ActionPages/StorageIncomes/Create/createSrorageIncome-hooks';
import { PlusIcon } from '../../Assets/Icons';
import styles from './table.module.scss';

interface IProps {
  bodyData: Array<IFormItemData[]>,
  headerData: any[],
  addAction?: () => void
}

const CustomTable: React.FC<IProps> = (props) => {

  const { headerData, bodyData, addAction = false } = props;
  return (
    <div className='customTable'>
      <TableContainer   >
        <Table sx={{ minWidth: '100%' }} aria-label="customized table">
          <TableHead >
            <TableRow >
              {headerData.map((item, index) => {
                return (
                  <CustomTableCell type={TableCellTypes.HEADER} data={item} index={index} key={item} />
                )
              })}
            </TableRow>
          </TableHead>
          <TableBody>
            {bodyData.map((data, index) => (
              <TableRow key={index} >
                {data.map((item, index) => {
                  return (
                    <CustomTableCell type={TableCellTypes.ITEM} data={item.component} index={index} key={index} />
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
                  <div>Ավելացնել</div>
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
