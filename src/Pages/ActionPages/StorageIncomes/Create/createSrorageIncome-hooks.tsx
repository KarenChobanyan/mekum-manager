import { useEffect, useState } from "react";
import { FieldValues, SubmitHandler, useFieldArray, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import moment from "moment";
import { usePostWarehoseEntryMutation } from "../../../../API/actionsApi";
import { IAutocompleteItem } from "../../../../Interfaces/componentTypes";
import { useGeneralHooks } from "../../../../General/Hooks/hooks";
import { IGoodsData, IStorageIncomeRequestData } from "../../../../Interfaces/requestTypes";

export interface IStorageIncomeFormValues {
    documentDate: string,
    warehouseId: IAutocompleteItem,
    partnersId: IAutocompleteItem,
    goods: IStorageIncomeItem[]
}

export interface IStorageIncomeItem {
    storage?: string,
    supplier: string,
    materialValueId: IAutocompleteItem | null,
    point: string,
    price: string,
    count: string,
    discount: string
    cost: string,
    money: string
};




const useCreateStorageIncomeHooks = () => {
    const { navigate,t } = useGeneralHooks();
    const [add, { isLoading, isSuccess, isError }] = usePostWarehoseEntryMutation();
    const [storageName, setStorageName] = useState<string>("");
    const [supplierName, setSupplierName] = useState<string>("");
    const { register, handleSubmit, watch, control, reset, setValue, formState: { errors } } = useForm<IStorageIncomeFormValues>({
        defaultValues: {
            goods: [{ storage: storageName, supplier: supplierName, materialValueId: null, point: '', price: '', count: '', discount: "", cost: '', money: "" }]
        },
        mode: 'all'
    });
    const { fields, append, remove } = useFieldArray({
        control,
        name: 'goods'
    });

    useEffect(() => {
        const storageName = watch('warehouseId')?.title!;
        if (storageName) {
            setStorageName(storageName)
        }
    }, [watch("warehouseId")]);

    useEffect(() => {
        if (isSuccess) {
            toast.success(t('Toast.Success.Register'))
            navigate(-1)
            reset();
        } else if (isError) {
            toast.error(t('Toast.Error.Register'))
        }
    }, [isSuccess, isError]);

    const onAddItem = () => {
        append({ storage: storageName, supplier: supplierName, materialValueId: null, point: '', price: '', count: '', discount: "", cost: '', money: "" })
    };

    const onCencele = () => {
        navigate(-1)
        reset()
    };

    const onSubmit: SubmitHandler<IStorageIncomeFormValues | FieldValues> = (values) => {
        const goodsList: IGoodsData[] = values.goods?.map((item: IStorageIncomeItem): IGoodsData => {
            return {
                warehouseId: +(values.warehouseId as IAutocompleteItem).id,
                point: item.point,
                count: +item.count,
                price: +item.price,
                discount: +item.discount,
                materialValueId: +(item.materialValueId as IAutocompleteItem).id,
                money: +item.money,
                measurementUnitId: 7,
                measurementUnitValue: 10
            }
        });
        const payload: IStorageIncomeRequestData = {
            documentDate: moment(new Date()).format("YYYY-MM-DD"),
            warehouseId: +(values.warehouseId as IAutocompleteItem).id,
            partnersId: +(values.partnersId as IAutocompleteItem).id,
            goods: goodsList
        };
        console.log(payload)
       add(payload)
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
        supplierName,
        isLoading,
        setSupplierName,
        onAddItem,
        onCencele
    }
};

export default useCreateStorageIncomeHooks