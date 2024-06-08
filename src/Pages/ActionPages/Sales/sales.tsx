import React, { useState } from 'react';
import { useAutocompleteData, useGeneralHooks, useWarehouseHooks } from '../../../General/Hooks/hooks';
import { AutoComplete, Button, CustomTable, Loading, NoData } from '../../../Components';
import styles from '../styles.module.scss'
import useSalesHooks from './sales-hooks';
import { Controller } from 'react-hook-form';
import { ButtonTypes } from '../../../Interfaces/componentTypes';

const Sales:React.FC = () => {
  const { t, navigate } = useGeneralHooks();
  const { myWarehousesData } = useAutocompleteData();
  const [warehouseId, setWarehouseId] = useState<string | undefined>(myWarehousesData?.[0].id!)
  const { control } = useWarehouseHooks();
  const { salesData,headerData,bodyData} = useSalesHooks(warehouseId! ?? myWarehousesData?.[0].id!);

  return (
    <div className={styles.container}>
      {
        myWarehousesData && salesData
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
                    style={styles.inputBox}
                    labelStyle={styles.formInputLabel}
                  />
                </div>
              );
            }}
          />
          {
            salesData?.length! > 0
            &&
            <Button
              buttonType={ButtonTypes.Primery}
              title={t('Button.Add')}
              onClick={() => navigate(`/sales/create/${warehouseId ?? myWarehousesData?.[0].id!}`)}
              buttonStyle={styles.button}
            />
          }
        </div>
        {salesData?.length! > 0
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
              btnOnclick={() => navigate(`/sales/create/${warehouseId ?? myWarehousesData?.[0].id!}`)}
            />
          </div>
        }
      </>
      :
      <Loading />
      }
      {/* <div className={styles.body}>
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
            btnOnclick={()=>navigate('/sales/create')}
            />
          }
      </div> */}
    </div>
  )
}

export default Sales
