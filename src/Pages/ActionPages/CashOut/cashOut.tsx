import React, { useEffect, useState } from 'react';
import { Controller } from 'react-hook-form';
import { AuthInput, AutoComplete, Button, CustomPagination, CustomTable, Loading, NoData } from '../../../Components';
import { useAutocompleteData, useCashRegisterHooks, useGeneralHooks } from '../../../General/Hooks/hooks';
import useCashOutHooks from './cashOut-hooks';
import { ButtonTypes } from '../../../Interfaces/componentTypes';
import styles from '../styles.module.scss';

const CashOut: React.FC = () => {
  const { t, navigate,renderDataLimit } = useGeneralHooks();
  const { cashRegistersData } = useAutocompleteData();
  const [cashRegisterId, setCashRegisterIdId] = useState<string | undefined>(cashRegistersData?.[0].id!)
  const { control, register, setValue,balanceData } = useCashRegisterHooks(cashRegisterId ?? cashRegistersData?.[0].id!);
  const { cashoutsData, bodyData, headerData, activePage, setActivePage, setOffset } = useCashOutHooks(cashRegisterId! ?? cashRegistersData?.[0].id!);

  useEffect(() => {
    setValue('balance', String(balanceData?.data))
  }, [balanceData]);


  return (
    <div className={styles.container}>
      {
        cashRegistersData && cashoutsData
          ?
          <>
            <div className={styles.top}>
              <div className={styles.topInputs}>
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
                          labelStyle={styles.formInputLabel}
                        />
                      </div>
                    );
                  }}
                />
                <AuthInput
                  register={register}
                  registerName='balance'
                  label={t('Forms.Remainder')}
                  showTextError={false}
                  disabled
                  inputStyle={styles.inputBox}
                  inputBoxStyles={styles.inputBox}
                  labelStyle={styles.formInputLabel}
                />
              </div>
              {
                cashoutsData?.result!.length! > 0
                &&
                <Button
                  buttonType={ButtonTypes.Primery}
                  title={t('Button.Add')}
                  onClick={() => navigate(`/cashouts/create/${cashRegisterId! ?? cashRegistersData?.[0].id!}`)}
                  buttonStyle={styles.button}
                />
              }
            </div>
            {cashoutsData?.result!.length! > 0
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
                      limit={Math.ceil(cashoutsData?.total! / renderDataLimit)}
                      offset={activePage}
                      onChange={(_, page) => {
                        setOffset((page - 1) * 7);
                        setActivePage(page)
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
