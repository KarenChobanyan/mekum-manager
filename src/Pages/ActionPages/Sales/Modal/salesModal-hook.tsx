import { useEffect } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import moment from "moment";
import { usePostCashEntryMutation } from "../../../../API/actionsApi";
import { ISalesFormValues } from "../Create/createSales-hooks";
import { ICachIncomingFormValues } from "../../CashIncoming/Create/createCashIncoming-hooks";
import { useAutocompleteData, useGeneralHooks } from "../../../../General/Hooks/hooks";
import { IAutocompleteItem } from "../../../../Interfaces/componentTypes";
import { ICashoutRequest } from "../../../../Interfaces/requestTypes";

const useSalesModal = (partner: IAutocompleteItem) => {
    const { register, handleSubmit, control, reset, setValue, formState: { errors } } = useForm<ICachIncomingFormValues>({ mode: "all" });
    const { cashRegistersData, partnersData } = useAutocompleteData();
    const { t, navigate } = useGeneralHooks();
    const [add, { isLoading, isSuccess, isError }] = usePostCashEntryMutation();

    useEffect(() => {
        setValue('partner', partner)
    }, [partner, setValue]);

    const onSubmit: SubmitHandler<ICachIncomingFormValues | FieldValues> = async(values) => {
        try {
            const payload: ICashoutRequest = {
                date: moment(new Date()).format("YYYY-MM-DD"),
                cashRegisterId: +(values.cashRegisterId as IAutocompleteItem).id,
                partnersId: +(values.partner as IAutocompleteItem).id,
                money: +values.money
            }
            console.log(payload)
        } catch (error) {
            console.log(error)
        }
        
        // add(payload)
    };
    return {
        register,
        handleSubmit,
        control,
        reset,
        setValue,
        errors,
        onSubmit,
        cashRegistersData,
        t,
    }
};

export default useSalesModal