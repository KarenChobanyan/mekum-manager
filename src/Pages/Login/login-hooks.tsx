import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { ILoginFormValues } from "../../Interfaces/interfaces";
import { useLoginMutation } from "../../API/authApi";
import { useEffect } from "react";
import { useGeneralHooks } from "../../General/Hooks/hooks";

const useLoginHooks = () => {
    const {accessToken,navigate} = useGeneralHooks();
    const { register, handleSubmit, formState: { errors } } = useForm<ILoginFormValues>();
    const [login, { data: loginResponse, isLoading, isSuccess }] = useLoginMutation();
    const onSubmit: SubmitHandler<ILoginFormValues | FieldValues> = (values) => {
        const payload = {
            email: values.email.trim(),
            password: values.password.trim(),
        };
        login(payload);
    };

    useEffect(() => {
       if (isSuccess || accessToken) {
            navigate('/home');
            if (loginResponse?.result?.token) {
                localStorage.setItem('mm_access_token', loginResponse?.result?.token);
                window.location.reload();
                navigate('/home');
        }
    }
    }, [isSuccess, accessToken]);




    return {
        register,
        onSubmit,
        handleSubmit,
        errors,
        isLoading,
    }
};

export default useLoginHooks