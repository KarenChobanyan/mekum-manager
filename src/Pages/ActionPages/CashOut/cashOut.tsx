import React, { useState } from 'react';
import { AutoComplete, Button, CustomTable, Loading, NoData } from '../../../Components';
import styles from '../styles.module.scss'
import { useAutocompleteData, useCashRegisterHooks, useGeneralHooks } from '../../../General/Hooks/hooks';
import useCashOutHooks from './cashOut-hooks';
import { Controller } from 'react-hook-form';
import { ButtonTypes } from '../../../Interfaces/componentTypes';

const CashOut:React.FC = () => {
  const {t,navigate} = useGeneralHooks();
  const { cashRegistersData } = useAutocompleteData();
  const [cashRegisterId, setCashRegisterIdId] = useState<string | undefined>(cashRegistersData?.[0].id!)
  const { control } = useCashRegisterHooks();
  const {cashoutsData,bodyData,headerData} = useCashOutHooks(cashRegisterId! ?? cashRegistersData?.[0].id!)

  return (
    <div className={styles.container}>
       {
        cashRegistersData && cashoutsData
        ?
        <>
        <div className={styles.top}>
          <Controller
            control={control}
            name='cashRegister'
            rules={{
              required: t('Input_Errors.Required'),
            }}
            render={({ field: { onChange, name, value } }) => {
              return (
                <div className='formAutocomplete'>
                  <AutoComplete
                    value={value ?? cashRegistersData?.[0]!}
                    name={name}
                    onChange={(value) => {
                      onChange(value)
                      setCashRegisterIdId(value?.id!)
                    }}
                    id='warehouseId'
                    data={cashRegistersData}
                    label={t('Forms.CassRegister')}
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
            cashoutsData?.length! > 0
            &&
            <Button
              buttonType={ButtonTypes.Primery}
              title={t('Button.Add')}
              onClick={() => navigate(`/cashouts/create/${cashRegisterId! ?? cashRegistersData?.[0].id!}`)}
              buttonStyle={styles.button}
            />
          }
        </div>
        {cashoutsData?.length! > 0
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
              btnOnclick={() => navigate(`/cashouts/create/${cashRegisterId! ?? cashRegistersData?.[0].id!}`)}
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

export default CashOut
