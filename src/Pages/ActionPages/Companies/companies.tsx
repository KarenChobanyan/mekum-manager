import React from 'react';
import styles from '../styles.module.scss';
import { NoData } from '../../../Components';
import { useGeneralHooks } from '../../../General/Hooks/hooks';

const Companies: React.FC = () => {
    const data = [];
    const {navigate,t} = useGeneralHooks();
    return (
        <div className={styles.container}>
            {
                data.length > 0
                    ?
                    <div>data</div>
                    :
                    <div className={styles.emptyBody}>
                        <NoData
                            withButton
                            btnText={t('Button.Add')}
                            btnOnclick={() => navigate(`/companies/create`)}
                        />
                    </div>
            }
        </div>
    )
}

export default Companies
