import { useEffect } from "react";
import { FieldValues, SubmitHandler, useFieldArray, useForm } from "react-hook-form";
import moment from "moment";
import { IAutocompleteItem } from "../../../../Interfaces/componentTypes";
import { useAutocompleteData, useGeneralHooks } from "../../../../General/Hooks/hooks";
import { IGoodBatch } from "../../../../Interfaces/responseTypes";
import { usePostWarehoseExitMutation } from "../../../../API/actionsApi";
import { IExitGoods, IPostWarehouseExitRequest } from "../../../../Interfaces/requestTypes";
import { toast } from "react-toastify";

export interface IStorageOutgoingFormValues {
    documentDate: string,
    warehouseId: IAutocompleteItem,
    partnerId: IAutocompleteItem,
    goods: IStorageOutgoingItem[]
};

export interface IStorageOutgoingItem {
    materialValueId: IAutocompleteItem | null,
    point: string,
    quantity: string,
    count: string,
    money: string,
    exits: IGoodBatch[] | []
};


const useCreateStorageOutgoingHooks = (id: string) => {
    const [add, { isLoading, isSuccess, isError }] = usePostWarehoseExitMutation();
    const { myWarehousesData } = useAutocompleteData();
    const warehouse = myWarehousesData?.filter((item) => item.id === id)[0];
    const { navigate, t } = useGeneralHooks();

    const { register, handleSubmit, watch, control, reset, setValue, formState: { errors } } = useForm<IStorageOutgoingFormValues>({
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
        setValue('warehouseId', warehouse!)
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

    const onSubmit: SubmitHandler<IStorageOutgoingFormValues | FieldValues> = (values) => {
        const goodsList: IExitGoods[] = values.goods?.map((item: IStorageOutgoingItem): IExitGoods => {
            return {
                warehouseId: +(values.warehouseId as IAutocompleteItem).id,
                point: item.point,
                count: +item.count,
                materialValueId: +(item.materialValueId as IAutocompleteItem).id,
                money: +item.money,
                exits: item.exits,
                measurementUnitId:7
            }
        });
        const payload: IPostWarehouseExitRequest = {
            documentDate: moment(new Date()).format("YYYY-MM-DD"),
            warehouseId: +(values.warehouseId as IAutocompleteItem).id,
            partnerId: +(values.partnerId as IAutocompleteItem).id,
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
        fields,
        isLoading,
        onAddItem,
        onCencele,
    }
};

export default useCreateStorageOutgoingHooks