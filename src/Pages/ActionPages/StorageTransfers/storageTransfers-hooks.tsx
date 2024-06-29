import { useState } from "react";
import { t } from 'i18next';
import moment from "moment";
import { useGetWarehouseTransfersQuery } from "../../../API/actionsApi";
import { ISIN } from "../../../Interfaces/interfaces";
import { useAutocompleteData } from "../../../General/Hooks/hooks";
import { ITableFormItemData, ITableHeader, TableCellContentTypes } from "../../../Interfaces/componentTypes";
import { GetWarehouseTransferResponse } from "../../../Interfaces/responseTypes";
import styles from '../formTablestyles.module.scss';

const useStorageTransferHook = (id: string) => {
    const { warehouseDataTypes } = useAutocompleteData();
    const [activePage, setActivePage] = useState<number>(0);
    const [offset, setOffset] = useState<number>(0);
    const [isIn, setIsIn] = useState<ISIN>(warehouseDataTypes[0].id as ISIN)
    const { data: transfersData } = useGetWarehouseTransfersQuery({ id: id, limit: 7, offset: offset, isIn: isIn });

    const headerData: ITableHeader[] = [
        {
            title: `${t('Forms.Date')}`,
            contentType: TableCellContentTypes.TEXT
        },
        {
            title: isIn === ISIN.TRUE ? `${t('Forms.Rectifier')}` : `${t('Forms.Receptionist')}`,
            contentType: TableCellContentTypes.SELECT
        },
        {
            title: `${t('Forms.Document_Number')}`,
            contentType: TableCellContentTypes.SELECT
        }
    ];

    const createBodyData = (data: GetWarehouseTransferResponse): Array<ITableFormItemData[]> => {
        return data?.result!.map((item) => {
            return [
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
                            <div className={styles.formItemText}>
                                {
                                    isIn === ISIN.TRUE
                                        ?
                                        item.warehouseOut?.name!
                                        :
                                        item.warehouseEnter?.name!
                                }
                            </div>
                        </div>,
                    contentType: TableCellContentTypes.TEXT
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

    const bodyData = createBodyData(transfersData!);


    return {
        transfersData,
        activePage,
        headerData,
        bodyData,
        setActivePage,
        setOffset,
        setIsIn,
        isIn
    }
};

export default useStorageTransferHook