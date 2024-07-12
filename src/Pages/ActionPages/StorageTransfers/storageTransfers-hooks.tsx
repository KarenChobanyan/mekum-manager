import { useEffect, useState } from "react";
import moment from "moment";
import { toast } from "react-toastify";
import { t } from 'i18next';
import { Checkbox } from "@mui/material";
import { orange } from "@mui/material/colors";
import { useAcceptWarehouseTransferMutation, useGetWarehouseTransfersQuery } from "../../../API/actionsApi";
import { ISIN } from "../../../Interfaces/interfaces";
import { useAutocompleteData } from "../../../General/Hooks/hooks";
import { ITableBodyData, ITableHeader, TableCellContentTypes } from "../../../Interfaces/componentTypes";
import { ClipLoader } from "react-spinners";
import { GetWarehouseTransferResponse, IGetWarehouseTransferResponseData } from "../../../Interfaces/responseTypes";
import { IAcceptWarehouseTransferRequest, } from "../../../Interfaces/requestTypes";
import { countGoodExits, fetchData } from "../../../Utils/utilits";
import { CheckBox } from "@mui/icons-material";
import styles from '../formTablestyles.module.scss';

interface ICHeckedEntry {
    loading: boolean,
    item: IGetWarehouseTransferResponseData
};

const useStorageTransferHook = (id: string) => {
    const { warehouseDataTypes, getRemainder } = useAutocompleteData();
    const [activePage, setActivePage] = useState<number>(0);
    const [offset, setOffset] = useState<number>(0);
    const [isIn, setIsIn] = useState<ISIN>(warehouseDataTypes[0].id as ISIN);
    const [checkedItems, setCheckedItems] = useState<ICHeckedEntry[] | []>([]);
    const [accept, { isLoading, isSuccess, isError }] = useAcceptWarehouseTransferMutation();
    const { data: transfersData } = useGetWarehouseTransfersQuery({ id: id, limit: 7, offset: offset, isIn: isIn });
    const removeCheckedEntry = (id: number) => {
        const tmp = [...checkedItems];
        const filteredTmp = tmp.filter((item) => item.item.id !== +id);
        setCheckedItems(filteredTmp);
    };

    useEffect(() => {
        if (isSuccess) {
            toast.success(t('Toast.Success.Register'))
        } else if (isError) {
            toast.error(t('Toast.Error.Register'))
        }
    }, [isSuccess, isError]);

    const processEntry = async (item: IGetWarehouseTransferResponseData) => {
        try {
            const goodList = await Promise.all(item.movementNAProduct.map(async (good) => {
                const params = {
                    wharehouseId: String(item.warehouseOutId),
                    materialValueId: String(good.materialValueId)
                };
                const goodBatchesData = await fetchData('mekum/good-batches', params)
                const availability = getRemainder(String(good.materialValueId));
                return {
                    warehouseOutId: item.warehouseOutId,
                    warehouseEnterId: item.warehouseEnterId,
                    availability: availability!,
                    point: good.point,
                    count: good.count,
                    materialValueId: good.materialValueId,
                    measurementUnitId: good.measurementUnitId,
                    exits: countGoodExits(goodBatchesData, good.count)
                };
            }));

            const payload: IAcceptWarehouseTransferRequest = {
                id: +item.id!,
                data: {
                    documentDate: moment(new Date()).format("YYYY-MM-DD"),
                    documentNumber: item.documentNumber,
                    warehouseOutId: item.warehouseOutId,
                    warehouseEnterId: item.warehouseEnterId,
                    goods: goodList!
                }
            };
            await accept(payload);
        } catch (error) {
            toast.error(`${error}`);
        }
    };

    const onSubmitCheckedEntries = async () => {
        const tmp = [...checkedItems];
        tmp.forEach((item) => item.loading = true)
        setCheckedItems(tmp)
        for (const item of checkedItems) {
            await processEntry(item.item).then(() => {
                setCheckedItems([])
            });
        }
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

    const createBodyDataForEntries = (data: GetWarehouseTransferResponse): Array<ITableBodyData> => {
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
            return {
                id: item.id,
                data: [
                    {
                        component: icon,
                        contentType: TableCellContentTypes.ICON
                    },
                    {
                        component: <div className={styles.formItemTextBox}>
                            <div className={styles.formItemText}>{moment(item.date).format("DD/MM/YYYY")}</div>
                        </div>,
                        contentType: TableCellContentTypes.TEXT
                    },
                    {
                        component: <div className={styles.formItemTextBox}>
                            <div className={styles.formItemText}>
                                {
                                    isIn === ISIN.TRUE
                                        ? item.warehouseOut?.name!
                                        : item.warehouseEnter?.name!
                                }
                            </div>
                        </div>,
                        contentType: TableCellContentTypes.SELECT
                    },
                    {
                        component: <div className={styles.formItemTextBox}>
                            <div className={styles.formItemText}>{item.documentNumber!}</div>
                        </div>,
                        contentType: TableCellContentTypes.SELECT
                    },
                ]
            }
        });
    };

    const createBodyDataForExits = (data: GetWarehouseTransferResponse): Array<ITableBodyData> => {
        return data?.result!.map((item) => {
            return {
                id: item.id,
                data: [
                    {
                        component: <div className={styles.formItemTextBox}>
                            <div className={styles.formItemText}>{moment(item.date).format("DD/MM/YYYY")}</div>
                        </div>,
                        contentType: TableCellContentTypes.TEXT
                    },
                    {
                        component: <div className={styles.formItemTextBox}>
                            <div className={styles.formItemText}>
                                {
                                    isIn === ISIN.TRUE
                                        ? item.warehouseOut?.name!
                                        : item.warehouseEnter?.name!
                                }
                            </div>
                        </div>,
                        contentType: TableCellContentTypes.SELECT
                    },
                    {
                        component: <div className={styles.formItemTextBox}>
                            <div className={styles.formItemText}>{item.documentNumber!}</div>
                        </div>,
                        contentType: TableCellContentTypes.SELECT
                    },
                ]
            }
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
        checkedItems,
        onSubmitCheckedEntries,
        setActivePage,
        setCheckedItems,
        setOffset,
        setIsIn,
        isIn
    };
};

export default useStorageTransferHook;