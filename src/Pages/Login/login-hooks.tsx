import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { ILoginFormValues } from "../../Interfaces/interfaces";
import { useLoginMutation } from "../../API/authApi";
import { useEffect } from "react";
import { useGeneralHooks } from "../../General/Hooks/hooks";
import { getMe } from "../../Store/Slices/authSlice";

const useLoginHooks = () => {
    const { accessToken, navigate, t,dispatch } = useGeneralHooks();
    const { register, handleSubmit, setError, formState: { errors } } = useForm<ILoginFormValues>();
    const [login, { data: loginResponse, isLoading, isSuccess, isError }] = useLoginMutation();
    const onSubmit: SubmitHandler<ILoginFormValues | FieldValues> = (values) => {
        const payload = {
            username: values.username.trim(),
            password: values.password.trim(),
        };
        login(payload);
    };

    useEffect(() => {
        if (accessToken) {
            dispatch(getMe());
            navigate('/home');
        }
        else if (loginResponse?.token) {
            localStorage.setItem('mm_access_token', loginResponse?.token);
            dispatch(getMe());
            // window.location.reload();
            navigate('/home');
        }
        else if (isError) {
            console.log(isError, "error")
            setError("password", { message: t('Input_Errors.Login') })
        }
    }, [isSuccess, accessToken, isError, isLoading]);




    return {
        register,
        onSubmit,
        handleSubmit,
        errors,
        isLoading,
    }
};

export default useLoginHooks