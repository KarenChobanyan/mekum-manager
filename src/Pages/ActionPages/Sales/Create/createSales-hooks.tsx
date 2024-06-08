import {useEffect } from "react";
import { FieldValues, SubmitHandler, useFieldArray, useForm } from "react-hook-form";
import { IAutocompleteItem } from "../../../../Interfaces/componentTypes";
import { useAutocompleteData, useGeneralHooks } from "../../../../General/Hooks/hooks";
import { IGoodBatch } from "../../../../Interfaces/responseTypes";
import { usePostSaleMutation } from "../../../../API/actionsApi";
import { toast } from "react-toastify";
import { IExitGoods, IPostWarehouseExitRequest } from "../../../../Interfaces/requestTypes";
import moment from "moment";

export interface ISalesFormValues {
    documentDate: string,
    warehouseId: IAutocompleteItem,
    partnerId: IAutocompleteItem,
    goods: ISaleGoods[]
}

export interface ISaleGoods {
    materialValueId: IAutocompleteItem | null,
    point: string,
    quantity: string,
    count: string,
    money: string,
    exits:IGoodBatch[] | []
};


const useCreateSalesHooks = (id: string) => {
    const { navigate,t } = useGeneralHooks();
    const [add, { isLoading, isSuccess, isError }] = usePostSaleMutation();
    const { myWarehousesData } = useAutocompleteData();
    const warehouse = myWarehousesData?.filter((item) => item.id === id)[0];
    const { register, handleSubmit, watch, control, reset, setValue, formState: { errors } } = useForm<ISalesFormValues>({
        defaultValues: {
            goods: [{ materialValueId: null, quantity: '', point: '', count: '',  money: "",exits:[] }]
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
        append({ materialValueId: null, quantity: '', point: '',  count: '', money: "",exits:[] })
    };

    const onCencele = () => {
        navigate(-1)
        reset()
    };

    const onSubmit: SubmitHandler<ISalesFormValues | FieldValues> = (values) => {
        const goodsList: IExitGoods[] = values.goods?.map((item: ISaleGoods): IExitGoods => {
            return {
                warehouseId: +(values.warehouseId as IAutocompleteItem).id,
                point: item.point,
                count: +item.count,
                materialValueId: +(item.materialValueId as IAutocompleteItem).id,
                money: +item.money,
                exits: item.exits
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
        onCencele
    }
};

export default useCreateSalesHooks