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
    title: IAutocompleteItem | null,
    unitId: string,
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
    const {suppliersData} = useDirectoriesHooks();
    const { navigate } = useGeneralHooks();
    const [storageName, setStorageName] = useState<string>("");
    const { register, handleSubmit, watch, control, reset,setValue, formState: { errors } } = useForm<IStorageIncomeFormValues>({
        defaultValues: {
            items: [{ storage: storageName, title: null, unitId: '', price: '', count: '', discount: "", cost: '', total: "" }]
        },
        mode:'all'
    });
    const { fields, append, remove } = useFieldArray({
        control,
        name: 'items'
    });

    useEffect(() => {
        const storageName = watch('storageId')?.title!;
        if (storageName) {
            const item = watch('items')
            setStorageName(storageName)
            console.log(item, "item")
        }
    }, [watch("storageId")]);


    const onAddItem = () => {
        append({ storage: storageName, title: null, unitId: '', price: '', count: '', discount: "", cost: '', total: "" })
    };

    const onCencele = () => {
        navigate(-1)
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
        watch,
        control,
        errors,
        fields,
        storageName,
        suppliersData,
        onAddItem,
        onCencele
    }
};

export default useCreateStorageIncomeHooks