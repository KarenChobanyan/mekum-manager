import React from 'react';
import { Control, Controller, FieldArrayWithId, FieldErrors, UseFieldArrayRemove, UseFormRegister, UseFormSetValue, UseFormWatch } from 'react-hook-form';
import { IStorageOutgoingFormValues } from './createStorageOutgoings-hooks';
import { useAutocompleteData } from '../../../../General/Hooks/hooks';
import { ITableFormItemData, ITableHeader, TableCellContentTypes } from '../../../../Interfaces/componentTypes';
import { AuthInput, AutoComplete, CustomTable } from '../../../../Components';
import { RedTrashIcon } from '../../../../Assets/Icons';
import styles from '../../formTablestyles.module.scss';

interface IProps {
    fields: FieldArrayWithId<IStorageOutgoingFormValues, "items", "id">[],
    remove: UseFieldArrayRemove,
    storageName: string,
    register: UseFormRegister<IStorageOutgoingFormValues>,
    control: Control<IStorageOutgoingFormValues, any>,
    errors: FieldErrors<IStorageOutgoingFormValues>,
    onAddItem: () => void,
    setValue: UseFormSetValue<IStorageOutgoingFormValues>,
    watch: UseFormWatch<IStorageOutgoingFormValues>
};

const headerData: ITableHeader[] = [
    {
        title: "",
        contentType: TableCellContentTypes.ICON
    },
    {
        title: "Պահեստ",
        contentType: TableCellContentTypes.TEXT
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
        title: "Քանակ",
        contentType: TableCellContentTypes.NUMBER
    },
    {
        title: "Գին",
        contentType: TableCellContentTypes.NUMBER
    },
    {
        title: "Զեղչ",
        contentType: TableCellContentTypes.NUMBER
    },
    {
        title: "Արժեք",
        contentType: TableCellContentTypes.NUMBER
    },
    {
        title: "Գումար",
        contentType: TableCellContentTypes.NUMBER
    }
];

const FormItems: React.FC<IProps> = (props) => {
    const { fields, remove, storageName, register, control, errors, onAddItem, setValue, watch } = props;
    const { getUnitType, goodsData } = useAutocompleteData();
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
                        <Controller
                            control={control}
                            name={`items.${index}.title`}
                            rules={{ required: true }}
                            render={({ field: { onChange, name, value } }) => {
                                return (
                                    <div className='tableAutocomplete'>
                                        <AutoComplete
                                            value={value}
                                            name={name}
                                            onChange={(value) => {
                                                const unit = getUnitType(value?.id!)
                                                setValue(`items.${index}.unitId`, unit!)
                                                return onChange(value)
                                            }
                                            }
                                            id={name}
                                            data={goodsData}
                                            placeholder="Ընտրեք ապրանքը"
                                            showErrorText={false}
                                            style={styles.formItemBox}
                                            error={errors.items?.[index]?.title}
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
                            registerName={`items.${index}.unitId`}
                            showTextError={false}
                            inputStyle={styles.formItemInput}
                            inputBoxStyles={styles.formItemInputNumBox}
                            required={false}
                            disabled
                            error={errors.items?.[index]?.unitId}
                        />,
                    contentType: TableCellContentTypes.NUMBER
                },
                {
                    component:
                        <AuthInput
                            register={register}
                            registerName={`items.${index}.count`}
                            showTextError={false}
                            type='number'
                            onChange={(event) => {
                                const count = +event.currentTarget.value;
                                const cost = +watch(`items.${index}.cost`);
                                if (cost !== 0) {
                                    const total = String((cost * count));
                                    setValue(`items.${index}.total`, total);
                                }
                            }
                            }
                            inputStyle={styles.formItemInput}
                            inputBoxStyles={styles.formItemInputNumBox}
                            error={errors.items?.[index]?.count}
                        />,
                    contentType: TableCellContentTypes.NUMBER
                },
                {
                    component:
                        <AuthInput
                            register={register}
                            registerName={`items.${index}.price`}
                            showTextError={false}
                            type='number'
                            onChange={(event) => {
                                const count = +watch(`items.${index}.count`);
                                const price = +event.currentTarget.value;
                                const discount = +watch(`items.${index}.discount`);
                                if (price !== 0) {
                                    const cost = String(price - ((price * discount) / 100));
                                    setValue(`items.${index}.cost`, cost);
                                    if (count !== 0) {
                                        const total = +cost * count
                                        setValue(`items.${index}.total`, String(total))
                                    }
                                } else {
                                    setValue(`items.${index}.cost`, "");
                                }
                            }}
                            inputStyle={styles.formItemInput}
                            inputBoxStyles={styles.formItemInputNumBox}
                            error={errors.items?.[index]?.price}
                        />,
                    contentType: TableCellContentTypes.NUMBER
                },
                {
                    component:
                        <AuthInput
                            register={register}
                            registerName={`items.${index}.discount`}
                            showTextError={false}
                            type='number'
                            maxDate="100"
                            onChange={(event) => {
                                const discount = +event.currentTarget.value;
                                const price = +watch(`items.${index}.price`);
                                const count = +watch(`items.${index}.count`);
                                if (price !== 0) {
                                    const cost = String(price - ((price * discount) / 100));
                                    setValue(`items.${index}.cost`, cost);
                                    if (count !== 0) {
                                        const total = +cost * count;
                                        setValue(`items.${index}.total`, String(total));
                                    }
                                }
                            }
                            }
                            inputStyle={styles.formItemInput}
                            inputBoxStyles={styles.formItemInputNumBox}
                            required={false}
                            error={errors.items?.[index]?.discount}
                        />,
                    contentType: TableCellContentTypes.NUMBER
                },
                {
                    component:
                        <AuthInput
                            register={register}
                            registerName={`items.${index}.cost`}
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
                            registerName={`items.${index}.total`}
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

    const items = createItemForm();

    return (
        <>
            <CustomTable
                headerData={headerData}
                bodyData={items}
                addAction={onAddItem}
            />
        </>
    )
}

export default FormItems
