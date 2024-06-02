import React from 'react';
import { useGeneralHooks } from '../../../General/Hooks/hooks';
import { NoData } from '../../../Components';
import styles from '../styles.module.scss';

const CashTransfers:React.FC = () => {
  const {t,navigate} = useGeneralHooks();
  const data = [];
  
  return (
    <div className={styles.container}>
      <div className={styles.body}>
        {data.length > 0
          &&
          <div className={styles.header}></div>
        }
          {data.length > 0
            ?
           <div>StorageIncomes</div> 
            :
            <NoData
            withButton
            btnText={t('Button.Add')}
            btnOnclick={()=>navigate('/cash_transfers/create')}
            />
          }
      </div>
    </div>
  )
}

export default CashTransfers
