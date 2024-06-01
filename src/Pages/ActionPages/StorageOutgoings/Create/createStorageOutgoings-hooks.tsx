import { ReactNode, useEffect, useState } from "react";
import { FieldValues, SubmitHandler, useFieldArray, useForm } from "react-hook-form";
import { IAutocompleteItem } from "../../../../Interfaces/componentTypes";
import { useDirectoriesHooks, useGeneralHooks } from "../../../../General/Hooks/hooks";

export interface IStorageOutgoingFormValues {
    date: string,
    storageId: IAutocompleteItem,
    recipientId: IAutocompleteItem,
    items: IStorageOutgoingItem[]
}

export interface IStorageOutgoingItem {
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


const useCreateStorageOutgoingHooks = () => {
    const {unitData,recipientData,warehousesData} = useDirectoriesHooks();
    const { navigate } = useGeneralHooks();

    const [storageName, setStorageName] = useState<string>("");
    const { register, handleSubmit, watch, control, reset,setValue, formState: { errors } } = useForm<IStorageOutgoingFormValues>({
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

    const onSubmit: SubmitHandler<IStorageOutgoingFormValues | FieldValues> = (values) => {
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
        recipientData,
        warehousesData,
        onAddItem,
        onCencele
    }
};

export default useCreateStorageOutgoingHooks