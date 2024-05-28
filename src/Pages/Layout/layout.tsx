import React, { ReactNode, useEffect } from 'react';
import styles from './layout.module.scss';
import Header from '../../Components/Header/header';
import { useGeneralHooks } from '../../General/Hooks/hooks';

interface IProps {
    children: ReactNode
}

const Layout: React.FC<IProps> = (props) => {
    const { children } = props;
    const {accessToken,navigate,location} = useGeneralHooks();
    useEffect(()=>{
        if(!accessToken && location.pathname !== '/login'){
            navigate('/login')
        }
    },[]);

    return (
        <div className={styles.container}>
            <Header />
            <div className={styles.page}>
                {children}
            </div>
        </div>
    )
};

export default Layout
