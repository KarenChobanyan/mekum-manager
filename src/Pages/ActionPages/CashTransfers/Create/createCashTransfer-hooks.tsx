import { useEffect } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { IAutocompleteItem } from "../../../../Interfaces/componentTypes";
import { useAutocompleteData, useCashRegisterHooks, useDirectoriesHooks, useGeneralHooks } from "../../../../General/Hooks/hooks";
import { IPostCashTransfer } from "../../../../Interfaces/requestTypes";
import { usePostCashTransferMutation } from "../../../../API/actionsApi";

export interface ICashTransferFormValues {
    date: string,
    exitCashRegisterId: string,
    balance:string,
    entryCashRegisterId: IAutocompleteItem,
    money: string,
    draft: string
};

const useCreateCashTransferHooks = (id:string) => {
    const { cashRegistersData, allCashRegistersData } = useAutocompleteData();
    const [add, { isLoading, isSuccess, isError }] = usePostCashTransferMutation();
    const { navigate, t } = useGeneralHooks();
    const {balanceData } = useCashRegisterHooks(id!);
    const { register, handleSubmit, control, reset, watch,setValue, formState: { errors } } = useForm<ICashTransferFormValues>({ mode: "all" });
    const exitCashRegister = cashRegistersData?.filter((item)=>item.id === id!)?.[0]!;

    useEffect(()=>{
    setValue('exitCashRegisterId',exitCashRegister.title!)
    },[id]);

    useEffect(() => {
        setValue('balance', String(balanceData?.data!))
      }, [balanceData,id]);

    useEffect(() => {
        if (isSuccess) {
            toast.success(t('Toast.Success.Register'))
            navigate(-1)
            reset();
        } else if (isError) {
            toast.error(t('Toast.Error.Register'))
        }
    }, [isSuccess, isError]);

    const onCencele = () => {
        navigate(-1)
        reset()
    };

    const onSubmit: SubmitHandler<ICashTransferFormValues | FieldValues> = (values) => {
        const payload: IPostCashTransfer = {
            exitCashRegisterId: +exitCashRegister?.id!,
            entryCashRegisterId: +(values.entryCashRegisterId as IAutocompleteItem).id,
            money: +values.money,
        }
        add(payload)
       };

    return {
        register,
        handleSubmit,
        onSubmit,
        onCencele,
        watch,
        cashRegistersData,
        exitCashRegister,
        allCashRegistersData,
        control,
        errors,
        setValue,
        isLoading,
    }
};

export default useCreateCashTransferHooks