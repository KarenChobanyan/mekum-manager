import React, { ReactNode, useEffect } from 'react';
import { useGeneralHooks } from '../../General/Hooks/hooks';
import { Header } from '../../Components';
import styles from './layout.module.scss';
import { getMe } from '../../Store/Slices/authSlice';

interface IProps {
    children: ReactNode,
    title?:string
}

const Layout: React.FC<IProps> = (props) => {
    const { children,title } = props;
   
    const { accessToken, navigate, location,dispatch } = useGeneralHooks();
    useEffect(() => {
        if (!accessToken && location.pathname !== '/login') {
            navigate('/login')
        }else if(accessToken){
            dispatch(getMe())
        }
    }, [accessToken,location.pathname,navigate]);

    return (
        <div className={styles.container}>
            <Header title={title!} />
            <div className={styles.page}>
                {children}
            </div>
        </div>
    )
};

export default Layout
