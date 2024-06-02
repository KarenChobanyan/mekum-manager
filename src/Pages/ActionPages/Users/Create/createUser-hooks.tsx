import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import {  useGeneralHooks } from "../../../../General/Hooks/hooks";

export interface ICreateUserFormValues {
    name: string,
    surname: string,
    email: string,
    password: string,
    mekumId:string
};

const useCreateUserHooks = () => {
    const { navigate } = useGeneralHooks();
    const { register, handleSubmit, reset, formState: { errors } } = useForm<ICreateUserFormValues>({mode:"all"});

    const onCencele = () => {
        navigate(-1)
        reset()
    };

    const onSubmit: SubmitHandler<ICreateUserFormValues | FieldValues> = (values) => {
        console.log(values)
    };

    return {
        register,
        handleSubmit,
        onSubmit,
        errors,
        onCencele
    }
};

export default useCreateUserHooks