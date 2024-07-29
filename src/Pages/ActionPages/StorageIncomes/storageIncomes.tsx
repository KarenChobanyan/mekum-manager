import React, { useState } from 'react';
import { Controller } from 'react-hook-form';
import { useAutocompleteData, useGeneralHooks, useWarehouseHooks } from '../../../General/Hooks/hooks';
import { ButtonTypes } from '../../../Interfaces/componentTypes';
import useStorageIncome from './storageIncome-hooks';
import { AutoComplete, Button, CustomPagination, CustomTable, Loading, NoData } from '../../../Components';
import styles from '../styles.module.scss';

const StorageIncomes: React.FC = () => {
  const { t, navigate } = useGeneralHooks();
  const { myWarehousesData } = useAutocompleteData();
  const [warehouseId, setWarehouseId] = useState<string | undefined>(myWarehousesData?.[0].id!)
  const { control } = useWarehouseHooks();
  const { headerData, bodyData, entryData,activePage,setActivePage,setOffset } = useStorageIncome(warehouseId! ?? myWarehousesData?.[0].id!);

  return (
    <div className={styles.container}>
      {
        myWarehousesData && entryData
          ?
          <>
            <div className={styles.top}>
              <Controller
                control={control}
                name='warehouse'
                rules={{
                  required: t('Input_Errors.Required'),
                }}
                render={({ field: { onChange, name, value } }) => {
                  return (
                    <div className='formAutocomplete'>
                      <AutoComplete
                        value={value ?? myWarehousesData?.[0]!}
                        name={name}
                        onChange={(value) => {
                          onChange(value)
                          setWarehouseId(value?.id!)
                        }}
                        id='warehouseId'
                        data={myWarehousesData}
                        label={t('Forms.Warehouse')}
                        placeholder={t('Forms.Select_Warehouse')}
                        showErrorText={false}
                        labelStyle={styles.formInputLabel}
                      />
                    </div>
                  );
                }}
              />
              {
                entryData?.result!.length! > 0
                &&
                <Button
                  buttonType={ButtonTypes.Primery}
                  title={t('Button.Add')}
                  onClick={() => navigate(`/storage_incomings/create/${warehouseId ?? myWarehousesData?.[0].id!}`)}
                  buttonStyle={styles.button}
                />
              }
            </div>
            {entryData?.result!.length! > 0
              ?
              (
                bodyData
                  ?
                  <div className={styles.fullBody}>
                    <CustomTable
                      headerData={headerData}
                      bodyData={bodyData}
                    />
                    <CustomPagination
                      limit={Math.ceil(entryData?.total! / 7)}
                      offset={activePage}
                      onChange={(_, page) => {
                        setOffset((page -1) * 7);
                        setActivePage(page);
                        window.scrollTo(0, 0);
                      }}
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
                  btnOnclick={() => navigate(`/storage_incomings/create/${warehouseId ?? myWarehousesData?.[0].id!}`)}
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

export default StorageIncomes
