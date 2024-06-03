import React, { ReactNode, useEffect } from 'react';
import { useGeneralHooks } from '../../General/Hooks/hooks';
import { Header } from '../../Components';
import styles from './layout.module.scss';

interface IProps {
    children: ReactNode,
    title?:string
}

const Layout: React.FC<IProps> = (props) => {
    const { children,title } = props;
   
    const { accessToken, navigate, location } = useGeneralHooks();
    useEffect(() => {
        if (!accessToken && location.pathname !== '/login') {
            navigate('/login')
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
