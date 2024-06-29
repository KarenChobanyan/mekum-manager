import React, { useState } from 'react'
import { Controller } from 'react-hook-form';
import { useAutocompleteData, useGeneralHooks, useWarehouseHooks } from '../../../General/Hooks/hooks';
import useStorageTransferHook from './storageTransfers-hooks';
import { ButtonTypes } from '../../../Interfaces/componentTypes';
import { ISIN } from '../../../Interfaces/interfaces';
import { AutoComplete, Button, CustomPagination, CustomTable, Loading, NoData } from '../../../Components';
import styles from '../styles.module.scss';

const StorageTransfers: React.FC = () => {
  const { t, navigate } = useGeneralHooks();
  const { myWarehousesData, warehouseDataTypes } = useAutocompleteData();
  const [warehouseId, setWarehouseId] = useState<string | undefined>(myWarehousesData?.[0].id!)
  const { control } = useWarehouseHooks();
  const { transfersData, activePage, setActivePage, setOffset, setIsIn, isIn, headerData, bodyData } = useStorageTransferHook(warehouseId! ?? myWarehousesData?.[0].id!);

  return (
    <div className={styles.container}>
      {
        myWarehousesData && transfersData
          ?
          <>
            <div className={styles.top}>
              <div className={styles.topSelectors}>
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
                          style={styles.inputBox}
                          labelStyle={styles.formInputLabel}
                        />
                      </div>
                    );
                  }}
                />
                <Controller
                  control={control}
                  name='type'
                  rules={{
                    required: t('Input_Errors.Required'),
                  }}
                  render={({ field: { onChange, name, value } }) => {
                    return (
                      <div className='formAutocomplete'>
                        <AutoComplete
                          value={value ?? warehouseDataTypes?.[0]!}
                          name={name}
                          onChange={(value) => {
                            onChange(value)
                            setIsIn(value?.id! as ISIN)
                          }}
                          id='warehouseId'
                          data={warehouseDataTypes}
                          label={t('Forms.Type')}
                          placeholder={t('Forms.Select_Warehouse')}
                          showErrorText={false}
                          style={styles.inputBox}
                          labelStyle={styles.formInputLabel}
                        />
                      </div>
                    );
                  }}
                />
              </div>
              {
                (transfersData?.result!.length! > 0 && isIn === ISIN.FALSE)
                &&
                <Button
                  buttonType={ButtonTypes.Primery}
                  title={t('Button.Add')}
                  onClick={() => navigate(`/storage_transfers/create/${warehouseId ?? myWarehousesData?.[0].id!}`)}
                  buttonStyle={styles.button}
                />
              }
            </div>
            {transfersData?.result!.length! > 0
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
                      limit={transfersData?.total!}
                      offset={activePage}
                      onChange={(_, page) => {
                        setOffset((page - 1) * 7);
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
                  withButton={isIn === ISIN.FALSE}
                  btnText={t('Button.Add')}
                  btnOnclick={() => navigate(`/storage_transfers/create/${warehouseId ?? myWarehousesData?.[0].id!}`)}
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

export default StorageTransfers
