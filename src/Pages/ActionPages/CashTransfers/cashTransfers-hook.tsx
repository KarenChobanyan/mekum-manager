import { useState } from "react";
import { useAutocompleteData } from "../../../General/Hooks/hooks";
import { useGetCashTransfersQuery } from "../../../API/actionsApi";
import { ISIN } from "../../../Interfaces/interfaces";
import { ITableFormItemData, ITableHeader, TableCellContentTypes } from "../../../Interfaces/componentTypes";
import { t } from 'i18next';
import { CashOutResponse, ICashoutResponseData } from "../../../Interfaces/responseTypes";
import styles from '../formTablestyles.module.scss';
import moment from "moment";
import { ClipLoader } from "react-spinners";
import { Checkbox } from "@mui/material";
import { orange } from "@mui/material/colors";
import { CheckBox } from "@mui/icons-material";

interface ICHeckedEntry {
    loading: boolean,
    item: ICashoutResponseData
};

const useCashTransfersHook = (id: string) => {
    const { warehouseDataTypes } = useAutocompleteData();
    const [activePage, setActivePage] = useState<number>(0);
    const [offset, setOffset] = useState<number>(0);
    const [checkedItems, setCheckedItems] = useState<ICHeckedEntry[] | []>([]);
    const [isIn, setIsIn] = useState<ISIN>(warehouseDataTypes[0].id as ISIN)
    const { data: transfersData } = useGetCashTransfersQuery({ id: id, limit: 7, offset: offset, isIn: isIn });
    const removeCheckedEntry = (id: number) => {
        const tmp = [...checkedItems];
        const filteredTmp = tmp.filter((item) => item.item.id !== +id);
        setCheckedItems(filteredTmp);
    };

    const headerDataForEntries: ITableHeader[] = [
        {
            title: '',
            contentType: TableCellContentTypes.ICON
        },
        {
            title: t('Forms.Date'),
            contentType: TableCellContentTypes.TEXT
        },
        {
            title: isIn === ISIN.TRUE ? t('Forms.Rectifier') : t('Forms.Receptionist'),
            contentType: TableCellContentTypes.SELECT
        },
        {
            title: t('Forms.Document_Number'),
            contentType: TableCellContentTypes.SELECT
        }
    ];

    const headerDataForExits: ITableHeader[] = [
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

    const createBodyDataForEntries = (data: CashOutResponse): Array<ITableFormItemData[]> => {
        return data?.result!.map((item) => {
            const icon = item.draft === 1
                ?
                (
                    checkedItems.some((checked) => item.id === checked.item.id && checked.loading)
                        ?
                        <ClipLoader color="#707EAE" size={20} />
                        :
                        <Checkbox
                            onChange={(e) => {
                                const checked = e.currentTarget.checked;
                                checked
                                    ?
                                    setCheckedItems([...checkedItems, { item: item, loading: false }])
                                    : removeCheckedEntry(item.id);
                            }}
                            sx={{
                                color: orange[900],
                                '&.Mui-checked': {
                                    color: orange[600],
                                },
                            }}
                            size="large"
                        />
                )
                :
                <CheckBox color='success' fontSize="large" />;
            return [
                {
                    component: icon,
                    contentType: TableCellContentTypes.ICON
                },
                {
                    component:
                        <div className={styles.formItemTextBox}>
                            <div className={styles.formItemText}>
                                {moment(item.date).format("DD/MM/YYYY")}
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
                                {item.documentNumber!}
                            </div>
                        </div>,
                    contentType: TableCellContentTypes.SELECT
                },
            ];
        });
    };

    const createBodyDataForExits = (data: CashOutResponse): Array<ITableFormItemData[]> => {
        return data?.result!.map((item) => {
            return [
                {
                    component:
                        <div className={styles.formItemTextBox}>
                            <div className={styles.formItemText}>
                                {moment(item.date).format("DD/MM/YYYY")}
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

    const bodyDataForEntries = createBodyDataForEntries(transfersData!);
    const bodyDataForExits = createBodyDataForExits(transfersData!);

    return {
        transfersData,
        activePage,
        headerDataForEntries,
        headerDataForExits,
        bodyDataForEntries,
        bodyDataForExits,
        setActivePage,
        setOffset,
        setIsIn,
        isIn
    }
};

export default useCashTransfersHook