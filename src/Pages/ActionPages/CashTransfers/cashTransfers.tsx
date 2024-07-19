import React, { useState } from 'react';
import { useAutocompleteData, useCashRegisterHooks, useGeneralHooks } from '../../../General/Hooks/hooks';
import { AutoComplete, Button, CustomPagination, CustomTable, Loading, NoData } from '../../../Components';
import styles from '../styles.module.scss';
import { useGetCashTransfersQuery } from '../../../API/actionsApi';
import { ISIN } from '../../../Interfaces/interfaces';
import useCashTransfersHook from './cashTransfers-hook';
import { Controller } from 'react-hook-form';
import { ButtonTypes } from '../../../Interfaces/componentTypes';

const CashTransfers: React.FC = () => {
  const { t, navigate } = useGeneralHooks();
  const { cashRegistersData, warehouseDataTypes } = useAutocompleteData();
  const [cashRegisterId, setCashRegisterId] = useState<string | undefined>(cashRegistersData?.[0].id!)
  const { control } = useCashRegisterHooks();
  const { transfersData, activePage, setActivePage, setOffset, setIsIn, isIn, headerDataForEntries, headerDataForExits, bodyDataForEntries, checkedItems, bodyDataForExits, onSubmitCheckedEntries } = useCashTransfersHook(cashRegisterId! ?? cashRegistersData?.[0].id!);


  return (
    <div className={styles.container}>
      {
        cashRegistersData && transfersData
          ?
          <>
            <div className={styles.top}>
              <div className={styles.topSelectors}>
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
                          id='cashRegister'
                          data={cashRegistersData}
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
                  onClick={() => navigate(`/cash_transfers/create/${cashRegisterId ?? cashRegistersData?.[0].id!}`)}
                  buttonStyle={styles.button}
                />
              }
              {
                checkedItems.length > 0 && isIn === ISIN.TRUE
                &&
                <Button
                  buttonType={ButtonTypes.Primery}
                  title={t('Button.Submit')}
                  onClick={onSubmitCheckedEntries}
                  buttonStyle={styles.button}
                />
              }
            </div>
            {transfersData?.result!.length! > 0
              ?
              (
                bodyDataForEntries || bodyDataForExits
                  ?
                  <div className={styles.fullBody}>
                    <CustomTable
                      headerData={isIn === 'true' ? headerDataForEntries : headerDataForExits}
                      bodyData={isIn === 'true' ? bodyDataForEntries : bodyDataForExits}
                    />
                    <CustomPagination
                      limit={Math.ceil(transfersData?.total! / 7)}
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
                  btnOnclick={() => navigate(`/cash_transfers/create/${cashRegisterId ?? cashRegistersData?.[0].id!}`)}
                />
              </div>
            }
          </>
          :
          <Loading />
      }
    </div>
  )
};

export default CashTransfers
