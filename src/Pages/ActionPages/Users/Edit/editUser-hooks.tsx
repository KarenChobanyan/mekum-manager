import { useEffect, useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { useGetUserByIdQuery, useRegisterMutation } from "../../../../API/authApi";
import { useDirectoriesHooks, useGeneralHooks } from "../../../../General/Hooks/hooks";
import { IRegisterFormValues } from "../Create/createUser-hooks";

const useEditUser = (id: string) => {
    const { data: currentEmployeeData } = useGetUserByIdQuery(id!, { skip: !id });
    const { navigate, t, currentUser } = useGeneralHooks();
    const { roles, employees } = useDirectoriesHooks();
    const [openModal, setOpenModal] = useState<boolean>(false);
    const [registrate, { isLoading, isSuccess, isError }] = useRegisterMutation();
    const { register, control, handleSubmit, reset, watch, setValue, formState: { errors } } = useForm<IRegisterFormValues>({ mode: "all" });

    const onCencele = () => {
        navigate(-1)
        reset()
    };

    const onCloseModal = () => {
        setOpenModal(false)
    };

    const onOpenModal = () => {
        setOpenModal(true)
    };

    useEffect(() => {
        if (currentEmployeeData?.length) {
            const employee = employees?.filter((emp) => emp.id === +currentEmployeeData?.[0].id!)[0];
            setValue('employee', { id: String(employee?.id!), title: employee?.fullName! });
        }
    }, [currentEmployeeData]);

    useEffect(() => {
        const employeID = watch('employee')?.id;
        const companyId = currentUser.company_id;
        const currentEmployee = currentEmployeeData?.[0];
        if (employeID) {
            const employee = employees?.filter((emp) => emp.id === +employeID)[0];
            const currentRole = roles.filter((item) => +item.id === currentEmployee?.role_id!)
            setValue('name', currentEmployee?.name!);
            setValue('surename', currentEmployee?.surname!);
            setValue('mekum_id', employeID);
            setValue('company_id', String(companyId));
            setValue('username', currentEmployee?.username!);
            setValue('role', currentRole[0])
        }
    }, [watch('employee')]);

    useEffect(() => {
        if (isSuccess) {
            toast.success(t('Toast.Success.Register'))
            navigate(-1)
            reset();
        } else if (isError) {
            toast.error(t('Toast.Error.Action'))
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
            company_id: values.company_id,
        };
        registrate(payload);
    };

    return {
        handleSubmit,
        onCencele,
        register,
        onSubmit,
        onCloseModal,
        openModal,
        onOpenModal,
        roles,
        errors,
        control,
        isLoading,
        currentEmployeeData
    }
};

export default useEditUser