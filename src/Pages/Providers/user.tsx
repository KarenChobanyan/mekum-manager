import React, { ReactNode, useEffect } from 'react';
import { useGeneralHooks } from '../../General/Hooks/hooks';

interface IProps {
    children:ReactNode
}


const User:React.FC<IProps> = ({children}) => {
    const { currentUser, navigate } = useGeneralHooks();

    useEffect(() => {
        if (currentUser?.role_id !== 2) {
            navigate('/')
        }
    }, [currentUser, navigate]);

    return (
        <div style={{ flex: 1 }}>
            {children}
        </div>
    )
};

export default User
