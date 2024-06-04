import React from 'react';
import { Control, Controller, FieldArrayWithId, FieldErrors, UseFieldArrayRemove, UseFormRegister, UseFormSetValue, UseFormWatch } from 'react-hook-form';
import { IFormItemData, IStorageOutgoingFormValues } from './createStorageOutgoings-hooks';
import { useAutocompleteData } from '../../../../General/Hooks/hooks';
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

const headerData: string[] = [
    "",
    "Պահեստ",
    "Անվանում",
    "Միավոր",
    "Քանակ",
    "Գին",
    "Զեղչի տոկոս",
    "Արժեք",
    "Գումար",
];

const FormItems: React.FC<IProps> = (props) => {
    const { fields, remove, storageName, register, control, errors, onAddItem, setValue, watch } = props;
    const { getUnitType, goodsData } = useAutocompleteData();
    const createItemForm = (): Array<IFormItemData[]> => {
        return fields.map((item, index): IFormItemData[] => {
            return [
                {
                    component: <img src={RedTrashIcon} alt="redTrash" onClick={() => remove(index)} className={styles.deleteIcon} />
                },
                {
                    component:
                        <div className={styles.formItemTextBox}>
                            <div className={styles.formItemText}>{storageName}</div>
                        </div>
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
                                            error={errors.items?.[index]?.title}
                                            style={styles.formItemBox}
                                        />
                                    </div>
                                );
                            }}
                        />
                },
                {
                    component:
                        <AuthInput
                            register={register}
                            registerName={`items.${index}.unitId`}
                            showTextError={false}
                            inputStyle={styles.formItemInput}
                            required={false}
                            disabled
                            error={errors.items?.[index]?.unitId}
                        />
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
                            error={errors.items?.[index]?.count}
                            inputStyle={styles.formItemInput}
                        />
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
                            error={errors.items?.[index]?.price}
                            inputStyle={styles.formItemInput}
                        />
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
                            error={errors.items?.[index]?.discount}
                            inputStyle={styles.formItemInput}
                            required={false}
                        />
                },
                {
                    component:
                        <AuthInput
                            register={register}
                            registerName={`items.${index}.cost`}
                            showTextError={false}
                            disabled
                            type='number'
                            inputStyle={styles.formItemInput}
                            required={false}
                        />
                },
                {
                    component:
                        <AuthInput
                            register={register}
                            registerName={`items.${index}.total`}
                            showTextError={false}
                            disabled
                            type='number'
                            inputStyle={styles.formItemInput}
                            required={false}
                        />
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
