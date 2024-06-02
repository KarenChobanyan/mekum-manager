import React from 'react';
import { NoData } from '../../../Components';
import styles from '../styles.module.scss'
import { useGeneralHooks } from '../../../General/Hooks/hooks';

const CashOut:React.FC = () => {
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
            btnOnclick={()=>navigate('/cashouts/create')}
            />
          }
      </div>
    </div>
  )
}

export default CashOut
