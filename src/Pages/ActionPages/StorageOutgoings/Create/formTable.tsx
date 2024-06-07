import React, { useState } from 'react';
import { Control, Controller, FieldArrayWithId, FieldErrors, UseFieldArrayRemove, UseFormRegister, UseFormSetError, UseFormSetValue, UseFormWatch } from 'react-hook-form';
import { IStorageOutgoingFormValues } from './createStorageOutgoings-hooks';
import { useAutocompleteData } from '../../../../General/Hooks/hooks';
import { ITableFormItemData, ITableHeader, TableCellContentTypes } from '../../../../Interfaces/componentTypes';
import { AuthInput, AutoComplete, CustomTable, TotalExitsCounter } from '../../../../Components';
import { RedTrashIcon } from '../../../../Assets/Icons';
import styles from '../../formTablestyles.module.scss';

interface IProps {
    fields: FieldArrayWithId<IStorageOutgoingFormValues, "goods", "id">[],
    remove: UseFieldArrayRemove,
    register: UseFormRegister<IStorageOutgoingFormValues>,
    control: Control<IStorageOutgoingFormValues, any>,
    errors: FieldErrors<IStorageOutgoingFormValues>,
    id: string,
    onAddItem: () => void,
    setValue: UseFormSetValue<IStorageOutgoingFormValues>,
    watch: UseFormWatch<IStorageOutgoingFormValues>,
};

const headerData: ITableHeader[] = [
    {
        title: "",
        contentType: TableCellContentTypes.ICON
    },
    {
        title: "Անվանում",
        contentType: TableCellContentTypes.SELECT
    },
    {
        title: "Միավոր",
        contentType: TableCellContentTypes.NUMBER
    },
    {
        title: "Մնացորդ",
        contentType: TableCellContentTypes.NUMBER
    },
    {
        title: "Քանակ",
        contentType: TableCellContentTypes.NUMBER
    },
    {
        title: "Գումար",
        contentType: TableCellContentTypes.NUMBER
    }
];

const FormItems: React.FC<IProps> = (props) => {
    const { fields, remove, register, control, errors, id, onAddItem, setValue, watch } = props;
    const { getGoodsUnitType, myGoodsdata, getRemainder } = useAutocompleteData(id!);

    const createItemForm = (): Array<ITableFormItemData[]> => {
        return fields.map((item, index): ITableFormItemData[] => {
            return [
                {
                    component: <img src={RedTrashIcon} alt="redTrash" onClick={() => remove(index)} className={styles.deleteIcon} />,
                    contentType: TableCellContentTypes.ICON
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
                                                const unit = getGoodsUnitType(value?.id!)
                                                const materialValueId = value?.id!
                                                if (materialValueId) {
                                                    setValue(`goods.${index}.quantity`, String(getRemainder(materialValueId!)))
                                                }
                                                setValue(`goods.${index}.point`, unit!)
                                                return onChange(value)
                                            }
                                            }
                                            id={name}
                                            data={myGoodsdata}
                                            placeholder="Ընտրեք ապրանքը"
                                            showErrorText={false}
                                            style={styles.formItemBox}
                                            error={errors.goods?.[index]?.materialValueId}
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
                            registerName={`goods.${index}.quantity`}
                            showTextError={false}
                            inputStyle={styles.formItemInput}
                            inputBoxStyles={styles.formItemInputNumBox}
                            required={false}
                            disabled
                            error={errors.goods?.[index]?.quantity}
                        />,
                    contentType: TableCellContentTypes.NUMBER
                },
                {
                    component:
                        <Controller
                            control={control}
                            name={`goods.${index}.count`}
                            rules={{ max: getRemainder(watch(`goods.${index}.materialValueId`)?.id!) }}
                            render={({ field: { onChange, name, value } }) => {
                                return (
                                    <AuthInput
                                        register={register}
                                        registerName={`goods.${index}.count`}
                                        showTextError={false}
                                        type='number'
                                        inputStyle={styles.formItemInput}
                                        inputBoxStyles={styles.formItemInputNumBox}
                                        error={errors.goods?.[index]?.count}
                                    />
                                )
                            }
                            }
                        />,
                    contentType: TableCellContentTypes.NUMBER
                },
                {
                    component:
                        <div className={styles.formItemTextBox}>
                            <div className={styles.formItemText}>
                            <TotalExitsCounter
                            warehouseId={id!}
                            materialValueId={watch(`goods.${index}.materialValueId`)?.id!}
                            count={watch(`goods.${index}.count`)}
                            setValue={setValue}
                            index={index}
                            />
                            </div>
                        </div>,
                    contentType: TableCellContentTypes.NUMBER
                },
            ]
        })
    };

    const bodyData = createItemForm();

    return (
        <>
            <CustomTable
                headerData={headerData}
                bodyData={bodyData}
                addAction={onAddItem}
            />
        </>
    )
}

export default FormItems
