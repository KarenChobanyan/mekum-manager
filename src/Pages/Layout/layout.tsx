import React, { ReactNode } from 'react';
import styles from './layout.module.scss';
import Header from '../../Components/Header/header';

interface IProps {
    children: ReactNode
}

const Layout: React.FC<IProps> = (props) => {
    const { children } = props;
    return (
        <div className={styles.container}>
            <Header />
            <div className={styles.page}>
                {children}
            </div>
        </div>
    )
}

export default Layout
