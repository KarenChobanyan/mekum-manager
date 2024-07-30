import React from 'react';
import { NotFoundImg } from '../../Assets/Images/index'
import styles from './notFound.module.scss'
import { useGeneralHooks } from '../../General/Hooks/hooks';
import { Button } from '../../Components';
import { ButtonTypes } from '../../Interfaces/componentTypes';

const NotFound: React.FC = () => {
    const { navigate } = useGeneralHooks();
    return (
        <div className={styles.container}>
            <img src={NotFoundImg} alt='notFoundImage' className={styles.image} />
            <p className={styles.text}>
                Page not found
            </p>
            <Button
                buttonType={ButtonTypes.Primery}
                buttonStyle={styles.button}
                title='Main'
                onClick={() => navigate('/')}
            />
        </div>
    )
};

export default NotFound
