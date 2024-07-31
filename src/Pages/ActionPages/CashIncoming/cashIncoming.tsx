import React, { useEffect, useState } from 'react';
import { Controller } from 'react-hook-form';
import { useAutocompleteData, useCashRegisterHooks, useGeneralHooks } from '../../../General/Hooks/hooks';
import { AuthInput, AutoComplete, Button, CustomPagination, CustomTable, Loading, NoData } from '../../../Components';
import useCashEntryHooks from './cashEntry-hooks';
import { ButtonTypes } from '../../../Interfaces/componentTypes';
import styles from '../styles.module.scss';

const CashIncoming: React.FC = () => {
  const { t, navigate, renderDataLimit } = useGeneralHooks();
  const { cashRegistersData } = useAutocompleteData();
  const [cashRegisterId, setCashRegisterId] = useState<string | undefined>(cashRegistersData?.[0].id!);
  const { control, register, setValue,balanceData } = useCashRegisterHooks(cashRegisterId ?? cashRegistersData?.[0].id!);
  const { cashEntryData, bodyData, headerData, activePage, setActivePage, setOffset } = useCashEntryHooks(cashRegisterId! ?? cashRegistersData?.[0].id!);

  useEffect(() => {
    setValue('balance', String(balanceData?.data))
  }, [balanceData]);

  return (
    <div className={styles.container}>
      {
        cashRegistersData && cashEntryData
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
                            setCashRegisterId(value?.id!)
                          }}
                          id='warehouseId'
                          data={cashRegistersData}
                          label={t('Forms.CassRegister')}
                          placeholder={t('Forms.Select_CashRegister')}
                          showErrorText={false}
                          labelStyle={styles.formInputLabel}
                        />
                      </div>
                    );
                  }}
                />
                <div className='formAutocomplete'>
                  <AuthInput
                    register={register}
                    registerName='balance'
                    label={t('Forms.Remainder')}
                    showTextError={false}
                    disabled
                    inputStyle={styles.inputBox}
                    inputBoxStyles={styles.inputBox}
                    labelStyle={styles.formInputLabel}
                    style={styles.formInputContainer}
                  />
                </div>
              </div>
              {
                cashEntryData?.result!.length! > 0
                &&
                <Button
                  buttonType={ButtonTypes.Primery}
                  title={t('Button.Add')}
                  onClick={() => navigate(`/cash_incomings/create/${cashRegisterId! ?? cashRegistersData?.[0].id!}`)}
                  buttonStyle={styles.button}
                />
              }
            </div>
            {cashEntryData?.result!.length! > 0
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
                      limit={Math.ceil(cashEntryData?.total! / renderDataLimit)}
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
                  btnOnclick={() => navigate(`/cash_incomings/create/${cashRegisterId! ?? cashRegistersData?.[0].id!}`)}
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

export default CashIncoming
