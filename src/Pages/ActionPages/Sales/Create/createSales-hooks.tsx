import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { FieldValues, SubmitHandler, useFieldArray, useForm } from "react-hook-form";
import moment from "moment";
import { IAutocompleteItem } from "../../../../Interfaces/componentTypes";
import { useAutocompleteData, useGeneralHooks, usePartner } from "../../../../General/Hooks/hooks";
import { IGoodBatch } from "../../../../Interfaces/responseTypes";
import { usePostSaleMutation } from "../../../../API/actionsApi";
import { IExitGoods, ISaleRequest } from "../../../../Interfaces/requestTypes";

export interface ISalesFormValues {
    documentDate: string,
    warehouseId: string,
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
    const [total, setTotal] = useState<number>(0);
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
    const { debt } = usePartner(watch('partnerId')?.id!);

    const countTotalForRender = (goods: any[]) => {
        const moneys = goods.map((item) => +item.money);
        const total = moneys.reduce((acc, item) => acc + item, 0);
        return total;
    };

    useEffect(() => {
        const subscription = watch((values) => {
            const newTotal = countTotalForRender(values.goods!);
            setTotal(newTotal);
        });
        return () => subscription.unsubscribe();
    }, [watch]);

    useEffect(() => {
        warehouse && setValue('warehouseId', warehouse!.title);
    }, [warehouse]);


    useEffect(() => {
        if (isSuccess && modal.money === null) {
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
        setModal(initModal);
        navigate(-1)
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


    const onSubmit: SubmitHandler<ISalesFormValues | FieldValues> = async (values) => {
        const goodsList: IExitGoods[] = values.goods?.map((item: ISaleGoods): IExitGoods => {
            return {
                warehouseId: +warehouse?.id!,
                point: item.point,
                count: +item.count,
                discount: +item.discount,
                materialValueId: +(item.materialValueId as IAutocompleteItem).id,
                money: +item.money,
                exits: item.exits,
                measurementUnitId: 7
            }
        });
        const payload: ISaleRequest = {
            documentDate: moment(new Date()).format("YYYY-MM-DD"),
            warehouseId: +warehouse?.id!,
            partnerId: +(values.partnerId as IAutocompleteItem).id,
            goods: goodsList
        };
        await add(payload)
    };

    const setModalAsync = () => {
        return new Promise<void>((resolve) => {
            const tmp: ISaleModal = { ...modal, money: '0' }
            setModal(tmp);
            resolve();
        });
    };

    const onOpenModal = async () => {
        const tmp: ISaleModal = {
            open: true,
            partner: watch('partnerId'),
            money: countTotal(),
        }
        setModal(tmp)
    };

    const handleOpenModal = async () => {
        try {
            await setModalAsync();
            await handleSubmit(onSubmit)();
            await onOpenModal();
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
        total,
    }
};

export default useCreateSalesHooks