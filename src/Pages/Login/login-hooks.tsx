import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { ILoginFormValues } from "../../Interfaces/interfaces";

const useLoginHooks = ()=>{
const {register,handleSubmit,formState:{errors}} = useForm<ILoginFormValues>();
const onSubmit:SubmitHandler<ILoginFormValues | FieldValues> = (values)=>{
    console.log(values,"login form values")
};



return {
    register,
    onSubmit,
    handleSubmit,
    errors
}
};

export default useLoginHooks