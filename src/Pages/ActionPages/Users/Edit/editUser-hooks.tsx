import { useEffect } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { useGetUserByIdQuery, useRegisterMutation } from "../../../../API/authApi";
import { useDirectoriesHooks, useGeneralHooks } from "../../../../General/Hooks/hooks";
import { IRegisterFormValues } from "../Create/createUser-hooks";

const useEditUser = (id:string)=>{
    const { data: currentEmployee } = useGetUserByIdQuery(id!,{ skip: !id });
    const { navigate, t,currentUser } = useGeneralHooks();
    const { roles,employees } = useDirectoriesHooks();
     const [registrate, { isLoading, isSuccess, isError }] = useRegisterMutation();
     const { register, control, handleSubmit, reset, watch, setValue, formState: { errors } } = useForm<IRegisterFormValues>({ mode: "all" });
    
     const onCencele = () => {
         navigate(-1)
         reset()
     };

     useEffect(()=>{
        if(currentEmployee){
            console.log(currentEmployee,'currentEmployee2')
            const employee = employees?.filter((emp) => emp.id === +currentEmployee.id!)[0];
            setValue('employee',{id:String(employee?.id!),title:employee?.fullName!})
        }
     },[currentEmployee])
 
     useEffect(() => {
         const employeID = watch('employee')?.id;
         const companyId = currentUser.company_id;
         if (employeID) {
             const employee = employees?.filter((emp) => emp.id === +employeID)[0];
             setValue('name', employee?.firstName!);
             setValue('surename', employee?.lastName!);
             setValue('mekum_id', employeID);
             setValue('company_id', String(companyId))
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
         currentEmployee
     }
};

export default useEditUser