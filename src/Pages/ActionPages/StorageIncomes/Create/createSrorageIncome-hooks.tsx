import { ReactNode, useEffect, useState } from "react";
import { FieldValues, SubmitHandler, useFieldArray, useForm } from "react-hook-form";
import { IAutocompleteItem } from "../../../../Interfaces/componentTypes";
import { useDirectoriesHooks, useGeneralHooks } from "../../../../General/Hooks/hooks";

export interface IStorageIncomeFormValues {
    date: string,
    storageId: IAutocompleteItem,
    supplierId: IAutocompleteItem,
    items: IStorageIncomeItem[]
}

export interface IStorageIncomeItem {
    storage?: string,
    title: string,
    unitId: IAutocompleteItem | null,
    price: string,
    count: string,
    discount: string
    cost: string,
    total: string
};

export interface IFormItemData {
    component: ReactNode
};


const useCreateStorageIncomeHooks = () => {
    const {unitData,warehousesData,suppliersData} = useDirectoriesHooks();
    const { navigate } = useGeneralHooks();

    const [storageName, setStorageName] = useState<string>("");
    const { register, handleSubmit, watch, control, reset,setValue, formState: { errors } } = useForm<IStorageIncomeFormValues>({
        defaultValues: {
            items: [{ storage: storageName, title: '', unitId: null, price: '', count: '', discount: "", cost: '', total: "" }]
        },
        mode:'all'
    });
    const { fields, append, remove } = useFieldArray({
        control,
        name: 'items'
    });

    useEffect(() => {
        const storageName = watch('storageId')?.title!;
        console.log("storageName")
        if (storageName) {
            const item = watch('items')
            setStorageName(storageName)
            console.log(item, "item")
        }
    }, [watch("storageId")]);


    const onAddItem = () => {
        append({ storage: storageName, title: '', unitId: null, price: '', count: '', discount: "", cost: '', total: "" })
    };

    const onCencele = () => {
        navigate('/storage_incomings')
        reset()
    };

    const onSubmit: SubmitHandler<IStorageIncomeFormValues | FieldValues> = (values) => {
        console.log(values)
    };

    return {
        register,
        handleSubmit,
        onSubmit,
        remove,
        append,
        setValue,
        unitData,
        watch,
        control,
        errors,
        fields,
        storageName,
        warehousesData,
        suppliersData,
        onAddItem,
        onCencele
    }
};

export default useCreateStorageIncomeHooks