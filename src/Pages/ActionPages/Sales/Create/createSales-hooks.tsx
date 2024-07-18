import { useEffect, useState } from "react";
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
    price: string,
    money: string,
    discount: string,
    exits: IGoodBatch[] | []
};

export interface ISaleModal {
    open: boolean,
    partner: IAutocompleteItem | null,
    money: string | null,
};

const initModal: ISaleModal = {
    open: false,
    partner: null,
    money: null
}


const useCreateSalesHooks = (id: string) => {
    const { navigate, t } = useGeneralHooks();
    const [modal, setModal] = useState<ISaleModal>(initModal);
    const [add, { isLoading, isSuccess, isError }] = usePostSaleMutation();
    const { myWarehousesData, myGoods } = useAutocompleteData(id!);
    const warehouse = myWarehousesData?.filter((item) => item.id === id)[0];
    const { register, handleSubmit, watch, control, reset, setValue, getValues, formState: { errors, isValid } } = useForm<ISalesFormValues>({
        defaultValues: {
            goods: [{ materialValueId: null, quantity: '', discount: '', price: '', point: '', count: '', money: "", exits: [] }]
        },
        mode: 'all'
    });
    const { fields, append, remove } = useFieldArray({
        control,
        name: 'goods'
    });

    useEffect(() => {
        setValue('warehouseId', warehouse!);
    }, [warehouse]);

    useEffect(() => {
        if (isSuccess && modal.money === "0") {
            toast.success(t('Toast.Success.Register'))
            navigate(-1)
            reset();
        } else if (isError) {
            toast.error(t('Toast.Error.Register'))
        }
    }, [isSuccess, isError]);

    const countTotal = () => {
        const tmp = getValues().goods;
        const moneys = tmp.map((item) => +item.money);
        const total = moneys.reduce((acc, item) => acc + item, 0);
        return String(total)
    };

    
    const onCloseModal = () => {
        setModal(initModal)
    };

    const onAddItem = () => {
        append({ materialValueId: null, quantity: '', point: '', price: '', count: '', money: "", discount: '', exits: [] })
    };

    const onCencele = () => {
        navigate(-1)
        reset()
    };

    const setSalePrice = (materialValueId: string) => {
        const material = myGoods?.filter((good) => good.materialValueId === +materialValueId!)?.[0];
        const materialPrice = material?.price!;
        return String(materialPrice)
    };

    const onSubmit: SubmitHandler<ISalesFormValues | FieldValues> = async(values) => {
        const goodsList: IExitGoods[] = values.goods?.map((item: ISaleGoods): IExitGoods => {
            return {
                warehouseId: +(values.warehouseId as IAutocompleteItem).id,
                point: item.point,
                count: +item.count,
                discount: +item.discount,
                materialValueId: +(item.materialValueId as IAutocompleteItem).id,
                money: +item.money,
                exits: item.exits,
                measurementUnitId: 7
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

    const onOpenModal = async() => {
            const tmp: ISaleModal = {
                open: true,
                partner: watch('partnerId'),
                money: countTotal(),
            }
            console.log(tmp,'tmpppp')
            setModal(tmp)
    };

    const handleOpenModal = async () => {
        try {
            setModal({...modal,money:"0"})
            await handleSubmit(onSubmit)();
            onOpenModal();
        } catch (error) {
            console.error('Form submission failed:', error);
        }
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
        setSalePrice,
        modal,
        onCloseModal,
        handleOpenModal,
        isValid,
    }
};

export default useCreateSalesHooks