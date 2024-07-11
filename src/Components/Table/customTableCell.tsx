import React, { ReactNode } from 'react';
import { TableCellContentTypes, TableCellTypes } from '../../Interfaces/componentTypes';
import styles from './table.module.scss';

interface IProps {
  data: string | ReactNode,
  type: TableCellTypes,
  contentType: TableCellContentTypes,
};

const CustomTableCell: React.FC<IProps> = (props) => {
  const { data, type, contentType } = props;

  return (
    <div className={`${styles[`cell${type}`]} ${styles[`item${contentType}`]}`}>
      {data}
    </div>
  )
}

export default CustomTableCell
