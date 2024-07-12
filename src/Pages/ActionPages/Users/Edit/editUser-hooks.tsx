import { useEffect } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { useRegisterMutation } from "../../../../API/authApi";
import { useDirectoriesHooks, useGeneralHooks } from "../../../../General/Hooks/hooks";
import { IRegisterFormValues } from "../Create/createUser-hooks";

const useEditUser = (id:string)=>{
    const { navigate, t } = useGeneralHooks();
    const { roles,employees } = useDirectoriesHooks();
     const [registrate, { isLoading, isSuccess, isError }] = useRegisterMutation();
     const { register, control, handleSubmit, reset, watch, setValue, formState: { errors } } = useForm<IRegisterFormValues>({ mode: "all" });
    
     const onCencele = () => {
         navigate(-1)
         reset()
     };
 
     useEffect(() => {
         const employeID = watch('employee')?.id;
         if (employeID) {
             const employee = employees?.filter((emp) => emp.id === +employeID)[0];
             setValue('name', employee?.firstName!);
             setValue('surename', employee?.lastName!);
             setValue('mekum_id', employeID)
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
             mekum_id: values.mekum_id
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

export default useEditUser