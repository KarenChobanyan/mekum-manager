import { useState } from "react";
import { useAutocompleteData } from "../../../General/Hooks/hooks";
import { useGetCashTransfersQuery } from "../../../API/actionsApi";
import { ISIN } from "../../../Interfaces/interfaces";
import { ITableFormItemData, ITableHeader, TableCellContentTypes } from "../../../Interfaces/componentTypes";
import { t } from 'i18next';
import { CashOutResponse, GetWarehouseTransferResponse } from "../../../Interfaces/responseTypes";
import styles from '../formTablestyles.module.scss';
import moment from "moment";

const useCashTransfersHook = (id: string) => {
    const { warehouseDataTypes } = useAutocompleteData();
    const [activePage, setActivePage] = useState<number>(0);
    const [offset, setOffset] = useState<number>(0);
    const [isIn, setIsIn] = useState<ISIN>(warehouseDataTypes[0].id as ISIN)
    const { data: transfersData } = useGetCashTransfersQuery({ id: id, limit: 7, offset: offset, isIn: isIn });

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

    const createBodyData = (data: CashOutResponse): Array<ITableFormItemData[]> => {
        return data?.result!.map((item) => {
            return [
                {
                    component:
                        <div className={styles.formItemTextBox}>
                            <div className={styles.formItemText}>
                                {/* {moment(item.date).format("DD/MM/YYYY")} */}
                            </div>
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
                                        item.cashRegister?.name!
                                        :
                                        item.cashRegister?.name!
                                }
                            </div>
                        </div>,
                    contentType: TableCellContentTypes.TEXT
                },
                {
                    component:
                        <div className={styles.formItemTextBox}>
                            <div className={styles.formItemText}>
                                {/* {item.documentNumber!} */}
                            </div>
                        </div>,
                    contentType: TableCellContentTypes.SELECT
                },
            ]
        });


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

export default useCashTransfersHook