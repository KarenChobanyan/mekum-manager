import { useState } from "react";
import { t } from 'i18next';
import moment from "moment";
import { useGetWarehouseExitsQuery } from "../../../API/actionsApi"
import { ITableFormItemData, ITableHeader, TableCellContentTypes } from "../../../Interfaces/componentTypes";
import { WarehouseExitResponse } from "../../../Interfaces/responseTypes";
import styles from '../formTablestyles.module.scss';

const useStorageExits = (id: string) => {
    const [activePage, setActivePage] = useState<number>(0);
    const [offset, setOffset] = useState<number>(0);
    const { data: exitsData } = useGetWarehouseExitsQuery({ id: id, limit: 7, offset: offset });
    const headerData: ITableHeader[] = [
        {
            title: `${t('Forms.Warehouse')}`,
            contentType: TableCellContentTypes.SELECT
        },
        {
            title: `${t('Forms.Date')}`,
            contentType: TableCellContentTypes.SELECT
        },
        {
            title:`${t('Forms.Document_Number')}`,
            contentType: TableCellContentTypes.SELECT
        }
    ];

    const createBodyData = (data: WarehouseExitResponse): Array<ITableFormItemData[]> => {
        return data?.result!.map((item) => {
            return [
                {
                    component:
                        <div className={styles.formItemTextBox}>
                            <div className={styles.formItemText}>{item.warehouse?.name!}</div>
                        </div>,
                    contentType: TableCellContentTypes.SELECT
                },
                {
                    component:
                        <div className={styles.formItemTextBox}>
                            <div className={styles.formItemText}>{moment(item.date).format("DD/MM/YYYY")}</div>
                        </div>,
                    contentType: TableCellContentTypes.SELECT
                },
                {
                    component:
                        <div className={styles.formItemTextBox}>
                            <div className={styles.formItemText}>{item.documentNumber!}</div>
                        </div>,
                    contentType: TableCellContentTypes.SELECT
                },
            ]
        })
    };

    const bodyData = createBodyData(exitsData!);

    return {
        exitsData,
        headerData,
        bodyData,
        activePage,
        setActivePage,
        setOffset
    }
};

export default useStorageExits