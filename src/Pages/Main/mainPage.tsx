import React, { useEffect } from 'react';
import { getMe } from '../../Store/Slices/authSlice';
import { useGeneralHooks } from '../../General/Hooks/hooks';
import { Loading } from '../../Components';
import styles from './mainPage.module.scss';

const MainPage: React.FC = () => {
    const { accessToken, navigate, dispatch } = useGeneralHooks();

    useEffect(() => {
        setTimeout(() => {
            if (accessToken) {
                dispatch(getMe())
                navigate('/home')
            } else {
                navigate('/login')
            };
        }, 1000);
    }, []);

    return (
        <div className={styles.container}>
            <Loading />
        </div>
    )
}

export default MainPage
