import { useEffect } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { toast } from 'react-toastify';
import { useDirectoriesHooks, useGeneralHooks } from "../../../../General/Hooks/hooks";
import {  IAutocompleteItem } from "../../../../Interfaces/componentTypes";
import { useRegisterMutation } from "../../../../API/authApi";

export interface IRegisterFormValues {
    role: IAutocompleteItem,
    name: string,
    surename: string,
    username: string,
    password: string,
    mekum_id: string,
    company_id:string,
    employee?: IAutocompleteItem
};

const useCreateUserHooks = () => {
    const { navigate, t,currentUser } = useGeneralHooks();
   const { roles,employees } = useDirectoriesHooks();
    const [registrate, { isLoading, isSuccess, isError }] = useRegisterMutation();
    const { register, control, handleSubmit, reset, watch, setValue, formState: { errors } } = useForm<IRegisterFormValues>({ mode: "all" });
   
    const onCencele = () => {
        navigate(-1)
        reset()
    };

    useEffect(() => {
        const employeID = watch('employee')?.id;
        const companyId = currentUser.company_id;
        if (employeID) {
            const employee = employees?.filter((emp) => emp.id === +employeID)[0];
            setValue('name', employee?.firstName!);
            setValue('surename', employee?.lastName!);
            setValue('mekum_id', employeID);
            setValue('company_id', String(companyId));
        }
    },[watch('employee')])

    useEffect(() => {
        if (isSuccess) {
            toast.success(t('Toast.Success.Register'))
            navigate(-1)
            reset();
        } else if (isError) {
            toast.error(t('Toast.Error.Register'))
        }
    }, [isSuccess, isError]);

    const onSubmit: SubmitHandler<IRegisterFormValues | FieldValues> = (values) => {
        const payload: IRegisterFormValues = {
            role: values.role.id,
            name: values.name,
            surename: values.surename,
            username: values.username,
            password: values.password,
            mekum_id: values.mekum_id,
            company_id:values.company_id,
        };
        registrate(payload);
    };

    return {
        handleSubmit,
        onCencele,
        register,
        onSubmit,
        roles,
        errors,
        control,
        isLoading,
    }
};

export default useCreateUserHooks