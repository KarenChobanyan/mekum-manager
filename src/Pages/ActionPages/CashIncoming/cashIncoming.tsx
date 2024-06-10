import React, { useState } from 'react';
import { useAutocompleteData, useCashRegisterHooks, useGeneralHooks } from '../../../General/Hooks/hooks';
import { AutoComplete, Button, CustomPagination, CustomTable, Loading, NoData } from '../../../Components';
import styles from '../styles.module.scss';
import useCashEntryHooks from './cashEntry-hooks';
import { Controller } from 'react-hook-form';
import { ButtonTypes } from '../../../Interfaces/componentTypes';

const CashIncoming: React.FC = () => {
  const { t, navigate } = useGeneralHooks();
  const { cashRegistersData } = useAutocompleteData();
  const [cashRegisterId, setCashRegisterIdId] = useState<string | undefined>(cashRegistersData?.[0].id!);
  const { control } = useCashRegisterHooks();
  const { cashEntryData, bodyData, headerData, activePage, setActivePage } = useCashEntryHooks(cashRegisterId! ?? cashRegistersData?.[0].id!);

  return (
    <div className={styles.container}>
      {
        cashRegistersData && cashEntryData
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
                cashEntryData?.length! > 0
                &&
                <Button
                  buttonType={ButtonTypes.Primery}
                  title={t('Button.Add')}
                  onClick={() => navigate(`/cash_incomings/create/${cashRegisterId! ?? cashRegistersData?.[0].id!}`)}
                  buttonStyle={styles.button}
                />
              }
            </div>
            {cashEntryData?.length! > 0
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
                      limit={100}
                      offset={activePage}
                      onChange={(_, page) => {
                        setActivePage(page-1);
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
