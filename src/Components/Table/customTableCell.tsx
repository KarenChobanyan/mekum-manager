import React from 'react';
import styles from './table.module.scss';
import { TableCellTypes } from '../../Interfaces/componentTypes';

interface IProps {
    data:any,
    type:TableCellTypes,
    index:number
};

const CustomTableCell:React.FC<IProps> = (props) => {
    const {data,type,index} = props;
  return (
    <div className={
        index === 0
        ?
        styles.cellDelete
        :
        type === TableCellTypes.HEADER ? styles.cellHeader : styles.cellItem}
        >
      {data}
    </div>
  )
}

export default CustomTableCell
