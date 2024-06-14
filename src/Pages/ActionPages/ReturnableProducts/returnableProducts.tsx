import React from 'react'
import useReturnableProductsHook from './returnableProducts-hooks';
import styles from '../styles.module.scss';
import { Button, CustomTable, Loading, NoData } from '../../../Components';
import { ButtonTypes } from '../../../Interfaces/componentTypes';
import { useGeneralHooks } from '../../../General/Hooks/hooks';

const ReturnableProducts: React.FC = () => {
  const {t,navigate} = useGeneralHooks();
  const { returnableData, bodyData, headerData } = useReturnableProductsHook();

  return (
    <div className={styles.container}>
      {
        returnableData
          ?
          <>
            <div className={styles.top}>
              <div />
              {
                returnableData?.length > 0
                &&
                <Button
                  buttonType={ButtonTypes.Primery}
                  title={t('Button.Add')}
                  onClick={() => navigate(`/returnable/create`)}
                  buttonStyle={styles.button}
                />
              }
            </div>
            {returnableData?.length! > 0
              ?
              (
                bodyData
                  ?
                  <div className={styles.fullBody}>
                    <CustomTable
                      headerData={headerData}
                      bodyData={bodyData}
                    />
                    
                  </div>
                  :
                  <Loading />
              )
              :
              <div className={styles.emptyBody}>
                <NoData
                  withButton
                  btnText={t('Button.Add')}
                  btnOnclick={() => navigate(`/returnable/create`)}
                />
              </div>
            }
          </>
          :
          <Loading />
      }
    </div>
  )
}

export default ReturnableProducts
