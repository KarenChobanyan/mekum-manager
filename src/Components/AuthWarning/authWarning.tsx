import React from 'react';
import styles from './authWarning.module.scss';

interface IProps {
    text: string
};

const AuthWarning: React.FC<IProps> = ({ text }) => {
    return (
        <div className={styles.container}>
            {text}
        </div>
    )
}

export default AuthWarning
