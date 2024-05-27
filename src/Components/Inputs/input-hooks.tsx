import { useState } from "react"

export const useBorder = () => {
    const [border, setBorder] = useState<boolean>(false)
    const renderBorder = () => {
        setBorder(true)
    };
    const removeBorder = () => {
        setBorder(false)
    };
    return ({
        border,
        renderBorder,
        removeBorder
    }
    )
};

export const usePassword = () => {
    const [password, setPassword] = useState<boolean>(true)
    const [confirmPswrd, setConfirmPswrd] = useState<boolean>(true)
    const changeType = () => {
        setPassword(!password)
    };
    const changeConfirmType = ()=>{
        setConfirmPswrd(!confirmPswrd)
    }
    return (
        {
            password,
            confirmPswrd,
            changeType,
            changeConfirmType
        }
    )
};