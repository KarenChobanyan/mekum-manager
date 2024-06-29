import { useEffect, useState } from "react";
import { FieldValues, SubmitHandler, useFieldArray, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import moment from "moment";
import { usePostWarehoseEntryMutation } from "../../../../API/actionsApi";
import { IAutocompleteItem } from "../../../../Interfaces/componentTypes";
import { useAutocompleteData, useGeneralHooks } from "../../../../General/Hooks/hooks";
import { IGoodsData, IPostStorageIncomeRequestData } from "../../../../Interfaces/requestTypes";

export interface IStorageIncomeFormValues {
    documentDate: string,
    warehouseId: IAutocompleteItem,
    partnersId: IAutocompleteItem,
    goods: IStorageIncomeItem[]
}

export interface IStorageIncomeItem {
    warehouse?: string,
    supplier: string,
    materialValueId: IAutocompleteItem | null,
    point: string,
    price: string,
    count: string,
    discount: string
    cost: string,
    money: string
};




const useCreateStorageIncomeHooks = (id: string) => {
    const { myWarehousesData } = useAutocompleteData();
    const warehouse = myWarehousesData?.filter((item) => item.id === id)[0];
    const { navigate, t } = useGeneralHooks();
    const [add, { isLoading, isSuccess, isError }] = usePostWarehoseEntryMutation();
    const [warehouseName, setWarehouseName] = useState<string>("");
    const [partnerName, setPartnerName] = useState<string>("");
    const { register, handleSubmit, watch, control, reset, setValue, formState: { errors } } = useForm<IStorageIncomeFormValues>({
        defaultValues: {
            goods: [{ warehouse: warehouseName, supplier: partnerName, materialValueId: null, point: '', price: '', count: '', discount: "", cost: '', money: "" }]
        },
        mode: 'all'
    });
    const { fields, append, remove } = useFieldArray({
        control,
        name: 'goods'
    });

    useEffect(() => {
        setValue('warehouseId', warehouse!)
        setWarehouseName(warehouse?.title!)
    }, [warehouse]);

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
        append({ warehouse: warehouseName, supplier: partnerName, materialValueId: null, point: '', price: '', count: '', discount: "", cost: '', money: "" })
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
                price: +item.cost!,
                discount: +item.discount,
                materialValueId: +(item.materialValueId as IAutocompleteItem).id,
                money: +item.money,
                measurementUnitId: 7,
                measurementUnitValue: 10
            }
        });
        const payload: IPostStorageIncomeRequestData = {
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
        warehouseName,
        partnerName,
        isLoading,
        setPartnerName,
        onAddItem,
        onCencele
    }
};

export default useCreateStorageIncomeHooks