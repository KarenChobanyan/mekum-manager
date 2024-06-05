import React, { ReactNode } from 'react';
import styles from './table.module.scss';
import { ITableFormItemData, ITableHeader, TableCellContentTypes, TableCellTypes } from '../../Interfaces/componentTypes';

interface IProps {
    data:string | ReactNode,
    type:TableCellTypes,
    contentType:TableCellContentTypes,
};

const CustomTableCell:React.FC<IProps> = (props) => {
    const {data,type,contentType} = props;
    console.log(contentType,'contentType');

  return (
    <div className={`${styles[`cell${type}`]} ${styles[`item${contentType}`]}`}>
      {data}
    </div>
  )
}

export default CustomTableCell
