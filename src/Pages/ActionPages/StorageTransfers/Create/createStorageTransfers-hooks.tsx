import { useEffect } from "react";
import { toast } from "react-toastify";
import { FieldValues, SubmitHandler, useFieldArray, useForm } from "react-hook-form";
import moment from "moment";
import { usePostWarehouseTransferMutation } from "../../../../API/actionsApi";
import { useAutocompleteData, useGeneralHooks } from "../../../../General/Hooks/hooks";
import { IAutocompleteItem } from "../../../../Interfaces/componentTypes";
import { IGoodBatch } from "../../../../Interfaces/responseTypes";
import { IWarehouseTransferGood, IWarehouseTransferRequest } from "../../../../Interfaces/requestTypes";

export interface IStorageTransferFormValues {
    documentDate: string,
    warehouseOutId: string,
    warehouseEnterId: IAutocompleteItem,
    goods: IStorageTransferItem[]
};

export interface IStorageTransferItem {
    materialValueId: IAutocompleteItem | null,
    point: string,
    count: string,
    quantity: string,
    measurementUnitId?: string,
    money: string,
    exits: IGoodBatch[] | []
};


const useCreateStorageTransfersHooks = (id:string) => {
    const { myWarehousesData } = useAutocompleteData();
    const warehouse = myWarehousesData?.filter((item)=>item.id === id)[0];
    const [add, { isLoading, isSuccess, isError }] = usePostWarehouseTransferMutation();
    const { navigate, t } = useGeneralHooks();

    const { register, handleSubmit, watch, control, reset, setValue, formState: { errors } } = useForm<IStorageTransferFormValues>({
        defaultValues: {
            goods: [{ materialValueId: null, quantity: '', point: '', count: '', money: "", exits: [] }]
        },
        mode: 'all'
    });
    const { fields, append, remove } = useFieldArray({
        control,
        name: 'goods'
    });

    useEffect(() => {
        setValue('warehouseOutId',warehouse?.title!)
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
        append({ materialValueId: null, quantity: '', point: '', count: '', money: "", exits: [] })
    };

    const onCencele = () => {
        navigate(-1)
        reset()
    };

    const onSubmit: SubmitHandler<IStorageTransferFormValues | FieldValues> = (values) => {
        console.log(values, 'values')
        const goodsList: IWarehouseTransferGood[] = values.goods?.map((item: IStorageTransferItem): IWarehouseTransferGood => {
            return {
                warehouseOutId: +(warehouse as IAutocompleteItem).id,
                warehouseEnterId: +(values.warehouseEnterId as IAutocompleteItem).id,
                availability: +item.quantity,
                point: item.point,
                count: +item.count,
                materialValueId: +(item.materialValueId as IAutocompleteItem).id,
                measurementUnitId: +item.measurementUnitId!,
                exits: item.exits
            }
        });

        const payload: IWarehouseTransferRequest = {
            documentDate: moment(new Date()).format("YYYY-MM-DD"),
            warehouseOutId: +(warehouse as IAutocompleteItem).id,
            warehouseEnterId: +(values.warehouseEnterId as IAutocompleteItem).id,
            goods: goodsList
        };
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
        warehouse,
        fields,
        isLoading,
        onAddItem,
        onCencele,
    }
};

export default useCreateStorageTransfersHooks