import { ReactNode, useEffect, useState } from "react";
import { FieldValues, SubmitHandler, useFieldArray, useForm } from "react-hook-form";
import { IAutocompleteItem } from "../../../../Interfaces/componentTypes";
import { useAutocompleteData, useDirectoriesHooks, useGeneralHooks } from "../../../../General/Hooks/hooks";

export interface ISalesferFormValues {
    date: string,
    storageId: IAutocompleteItem,
    buyerId: IAutocompleteItem,
    items: ISaleItem[]
}

export interface ISaleItem {
    storage?: string,
    buyer?: string,
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


const useCreateSalesHooks = () => {
    const { navigate } = useGeneralHooks();
    const [storageName, setStorageName] = useState<string>("");
    const [buyerName, setBuyerName] = useState<string>("");
    const { register, handleSubmit, watch, control, reset, setValue, formState: { errors } } = useForm<ISalesferFormValues>({
        defaultValues: {
            items: [{ storage: storageName, buyer: buyerName, title: null, unitId: '', price: '', count: '', discount: "", cost: '', total: "" }]
        },
        mode: 'all'
    });
    const { fields, append, remove } = useFieldArray({
        control,
        name: 'items'
    });

    useEffect(() => {
        const storageName = watch('storageId')?.title!;
        const buyerName = watch('buyerId')?.title!;
        if (storageName || buyerName) {
            setStorageName(storageName)
            setBuyerName(buyerName)
        }
    }, [watch("storageId"), watch("buyerId")]);


    const onAddItem = () => {
        append({ storage: storageName, buyer: buyerName, title: null, unitId: '', price: '', count: '', discount: "", cost: '', total: "" })
    };

    const onCencele = () => {
        navigate(-1)
        reset()
    };

    const onSubmit: SubmitHandler<ISalesferFormValues | FieldValues> = (values) => {
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
        buyerName,
        onAddItem,
        onCencele
    }
};

export default useCreateSalesHooks