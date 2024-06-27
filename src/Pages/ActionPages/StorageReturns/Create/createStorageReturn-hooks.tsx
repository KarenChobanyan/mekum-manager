import { useEffect } from "react";
import { FieldValues, SubmitHandler, useFieldArray, useForm } from "react-hook-form";
import moment from "moment";
import { IAutocompleteItem } from "../../../../Interfaces/componentTypes";
import { useAutocompleteData, useGeneralHooks } from "../../../../General/Hooks/hooks";
import {  usePostWarehouseReturnMutation } from "../../../../API/actionsApi";
import { toast } from "react-toastify";
import { IStorageOutgoingFormValues } from "../../StorageOutgoings/Create/createStorageOutgoings-hooks";
import { IPostWarehouseReturnRequest, IWarehouseReturnGood } from "../../../../Interfaces/requestTypes";

export interface IStorageReturnFormValues {
    documentDate: string,
    warehouseId: string,
    partnerId: IAutocompleteItem,
    goods: IStorageRetunItem[]
};

export interface IStorageRetunItem {
    materialValueId: IAutocompleteItem | null,
    point: string,
    count: string,
    measurementUnitId?: string,
};


const useCreateStorageReturnHooks = (id: string) => {
    const [add, { isLoading, isSuccess, isError }] = usePostWarehouseReturnMutation();
    const { myWarehousesData } = useAutocompleteData();
    const warehouse = myWarehousesData?.filter((item) => item.id === id)[0];
    const { navigate, t } = useGeneralHooks();

    const { register, handleSubmit, watch, control, reset, setValue, formState: { errors } } = useForm<IStorageReturnFormValues>({
        defaultValues: {
            goods: [{ materialValueId: null, point: '', count: '' }]
        },
        mode: 'all'
    });
    const { fields, append, remove } = useFieldArray({
        control,
        name: 'goods'
    });


    useEffect(() => {
        setValue('warehouseId', warehouse?.title!)
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
        append({ materialValueId: null,  point: '', count: '' })
    };

    const onCencele = () => {
        navigate(-1)
        reset()
    };

    const onSubmit: SubmitHandler<IStorageOutgoingFormValues | FieldValues> = (values) => {
        const goodsList: IWarehouseReturnGood[] = values.goods?.map((item: IStorageRetunItem): IWarehouseReturnGood => {
            return {
                warehouseId: +(warehouse as IAutocompleteItem).id,
                point: item.point,
                count: +item.count,
                materialValueId: +(item.materialValueId as IAutocompleteItem).id,
                measurementUnitId:+item.measurementUnitId!,
                }
                });
                const payload: IPostWarehouseReturnRequest = {
                    documentDate: moment(new Date()).format("YYYY-MM-DD"),
                    warehouseId: +(warehouse as IAutocompleteItem).id,
                    partnerId: +(values.partnerId as IAutocompleteItem).id,
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
        isLoading,
        onAddItem,
        onCencele,
    }
};

export default useCreateStorageReturnHooks