import React from 'react';
import { Control, Controller, FieldArrayWithId, FieldErrors, UseFieldArrayRemove, UseFormRegister, UseFormSetValue, UseFormWatch } from 'react-hook-form';
import { t } from 'i18next';
import { IStorageIncomeFormValues } from './createSrorageIncome-hooks';
import { ITableFormItemData, ITableHeader, TableCellContentTypes } from '../../../../Interfaces/componentTypes';
import { useAutocompleteData } from '../../../../General/Hooks/hooks';
import { AuthInput, AutoComplete, CustomTable } from '../../../../Components';
import { RedTrashIcon } from '../../../../Assets/Icons';
import styles from '../../formTablestyles.module.scss';

interface IProps {
    fields: FieldArrayWithId<IStorageIncomeFormValues, "goods", "id">[],
    remove: UseFieldArrayRemove,
    storageName: string,
    register: UseFormRegister<IStorageIncomeFormValues>,
    control: Control<IStorageIncomeFormValues, any>,
    errors: FieldErrors<IStorageIncomeFormValues>,
    partnerName: string,
    onAddItem: () => void,
    setValue: UseFormSetValue<IStorageIncomeFormValues>,
    watch: UseFormWatch<IStorageIncomeFormValues>
};

const FormItems: React.FC<IProps> = (props) => {
    const headerData: ITableHeader[] = [
        {
            title: "",
            contentType: TableCellContentTypes.ICON
        },
        {
            title: `${t('Forms.Warehouse')}`,
            contentType: TableCellContentTypes.TEXT
        },
        {
            title: `${t('Forms.PartnerIn')}`,
            contentType: TableCellContentTypes.TEXT
        },
        {
            title: `${t('Forms.Material')}`,
            contentType: TableCellContentTypes.SELECT
        },
        {
            title: `${t('Forms.Point')}`,
            contentType: TableCellContentTypes.NUMBER
        },
        {
            title: `${t('Forms.Count')}`,
            contentType: TableCellContentTypes.NUMBER
        },
        {
            title: `${t('Forms.Price')}`,
            contentType: TableCellContentTypes.NUMBER
        },
        {
            title: `${t('Forms.Discount')}`,
            contentType: TableCellContentTypes.NUMBER
        },
        {
            title: `${t('Forms.Cost')}`,
            contentType: TableCellContentTypes.NUMBER
        },
        {
            title: `${t('Forms.Money')}`,
            contentType: TableCellContentTypes.NUMBER
        }
    ];
    const { fields, remove, storageName, register, control, errors, partnerName, onAddItem, setValue, watch } = props;
    const { getAllGoodsUnitType,allGoodsData} = useAutocompleteData();

    const createItemForm = (): Array<ITableFormItemData[]> => {
        return fields.map((item, index): ITableFormItemData[] => {
            return [
                {
                    component: <img src={RedTrashIcon} alt="redTrash" onClick={() => remove(index)} className={styles.deleteIcon} />,
                    contentType: TableCellContentTypes.ICON
                },
                {
                    component:
                        <div className={styles.formItemTextBox}>
                            <div className={styles.formItemText}>{storageName}</div>
                        </div>,
                    contentType: TableCellContentTypes.TEXT
                },
                {
                    component:
                        <div className={styles.formItemTextBox}>
                            <div className={styles.formItemText}>{partnerName}</div>
                        </div>,
                    contentType: TableCellContentTypes.TEXT
                },
                {
                    component:
                        <Controller
                            control={control}
                            name={`goods.${index}.materialValueId`}
                            rules={{ required: true }}
                            render={({ field: { onChange, name, value } }) => {
                                return (
                                    <div className='tableAutocomplete'>
                                        <AutoComplete
                                            value={value}
                                            name={name}
                                            onChange={(value) => {
                                                const unit = getAllGoodsUnitType(value?.id!)
                                                setValue(`goods.${index}.point`, unit!)
                                                return onChange(value)
                                            }
                                            }
                                            id={name}
                                            data={allGoodsData}
                                            placeholder={t('Forms.Select_Material')}
                                            showErrorText={false}
                                            error={errors.goods?.[index]?.materialValueId}
                                            style={styles.formItemBox}
                                        />
                                    </div>
                                );
                            }}
                        />,
                    contentType: TableCellContentTypes.SELECT
                },
                {
                    component:
                        <AuthInput
                            register={register}
                            registerName={`goods.${index}.point`}
                            showTextError={false}
                            inputStyle={styles.formItemInput}
                            inputBoxStyles={styles.formItemInputNumBox}
                            required={false}
                            disabled
                            error={errors.goods?.[index]?.point}
                        />,
                    contentType: TableCellContentTypes.NUMBER
                },
                {
                    component:
                        <AuthInput
                            register={register}
                            registerName={`goods.${index}.count`}
                            showTextError={false}
                            type='number'
                            onChange={(event) => {
                                const count = +event.currentTarget.value;
                                const cost = +watch(`goods.${index}.cost`);
                                if (cost !== 0) {
                                    const total = String((cost * count));
                                    setValue(`goods.${index}.money`, total);
                                }
                            }
                            }
                            inputStyle={styles.formItemInput}
                            inputBoxStyles={styles.formItemInputNumBox}
                            error={errors.goods?.[index]?.count}
                        />,
                    contentType: TableCellContentTypes.NUMBER
                },
                {
                    component:
                        <AuthInput
                            register={register}
                            registerName={`goods.${index}.price`}
                            showTextError={false}
                            type='number'
                            onChange={(event) => {
                                const count = +watch(`goods.${index}.count`);
                                const price = +event.currentTarget.value;
                                const discount = +watch(`goods.${index}.discount`);
                                if (price !== 0) {
                                    const cost = String(price - ((price * discount) / 100));
                                    setValue(`goods.${index}.cost`, cost);
                                    if (count !== 0) {
                                        const total = +cost * count
                                        setValue(`goods.${index}.money`, String(total))
                                    }
                                } else {
                                    setValue(`goods.${index}.cost`, "");
                                }
                            }}
                            inputStyle={styles.formItemInput}
                            inputBoxStyles={styles.formItemInputNumBox}
                            error={errors.goods?.[index]?.price}
                        />,
                    contentType: TableCellContentTypes.NUMBER
                },
                {
                    component:
                        <AuthInput
                            register={register}
                            registerName={`goods.${index}.discount`}
                            showTextError={false}
                            type='number'
                            maxDate="100"
                            onChange={(event) => {
                                const discount = +event.currentTarget.value;
                                const price = +watch(`goods.${index}.price`);
                                const count = +watch(`goods.${index}.count`);
                                if (price !== 0) {
                                    const cost = String(price - ((price * discount) / 100));
                                    setValue(`goods.${index}.cost`, cost);
                                    if (count !== 0) {
                                        const total = +cost * count;
                                        setValue(`goods.${index}.money`, String(total));
                                    }
                                }
                            }
                            }
                            inputStyle={styles.formItemInput}
                            inputBoxStyles={styles.formItemInputNumBox}
                            required={false}
                            error={errors.goods?.[index]?.discount}
                        />,
                    contentType: TableCellContentTypes.NUMBER
                },
                {
                    component:
                        <AuthInput
                            register={register}
                            registerName={`goods.${index}.cost`}
                            showTextError={false}
                            disabled
                            type='number'
                            required={false}
                            inputStyle={styles.formItemInput}
                            inputBoxStyles={styles.formItemInputNumBox}
                        />,
                    contentType: TableCellContentTypes.NUMBER
                },
                {
                    component:
                        <AuthInput
                            register={register}
                            registerName={`goods.${index}.money`}
                            showTextError={false}
                            disabled
                            type='number'
                            required={false}
                            inputStyle={styles.formItemInput}
                            inputBoxStyles={styles.formItemInputNumBox}
                        />,
                    contentType: TableCellContentTypes.NUMBER
                },
            ]
        })
    };

    const goods = createItemForm();

    return (
        <>
            <CustomTable
                headerData={headerData}
                bodyData={goods}
                addAction={onAddItem}
            />
        </>
    )
}

export default FormItems
