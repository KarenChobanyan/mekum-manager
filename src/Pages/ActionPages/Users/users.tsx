import React from 'react';
import { useGeneralHooks } from '../../../General/Hooks/hooks';
import { Button, CustomTable, Loading, NoData } from '../../../Components';
import useUsersHooks from './users-hooks';
import { ButtonTypes } from '../../../Interfaces/componentTypes';
import styles from '../styles.module.scss';

const Users:React.FC = () => {
  const {t,navigate} = useGeneralHooks();
  const {usersData,bodyData,headerData} = useUsersHooks();
 const onEdit = (id:number)=>{
  navigate(`/users/edit/${id}`)
 }
  return (
    <div className={styles.container}>
       {
        usersData
          ?
          <>
            <div className={styles.top}>
            <div></div>
              {
                usersData?.length! > 0
                &&
                <Button
                  buttonType={ButtonTypes.Primery}
                  title={t('Button.Add')}
                  onClick={() => navigate('/users/create')}
                  buttonStyle={styles.button}
                />
              }
            </div>
            {usersData?.length! > 0
              ?
              (
                bodyData
                  ?
                  <div className={styles.fullBody}>
                    <CustomTable
                      headerData={headerData}
                      bodyData={bodyData}
                      editable
                      onEdit={onEdit}
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
                  btnOnclick={() => navigate('/users/create')}
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

export default Users
