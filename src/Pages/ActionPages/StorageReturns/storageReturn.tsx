import React, { useState } from 'react';
import { useAutocompleteData, useGeneralHooks, useWarehouseHooks } from '../../../General/Hooks/hooks';
import useStorageReturn from './storageReturn-hooks';
import styles from '../styles.module.scss';
import { Controller } from 'react-hook-form';
import { AutoComplete, Button, Loading, NoData } from '../../../Components';
import { ButtonTypes } from '../../../Interfaces/componentTypes';

const StorageReturn:React.FC = () => {
    const { t, navigate } = useGeneralHooks();
    const { myWarehousesData } = useAutocompleteData();
    const [warehouseId, setWarehouseId] = useState<string | undefined>(myWarehousesData?.[0].id!)
    const { control } = useWarehouseHooks();
    const { returnData } = useStorageReturn(warehouseId! ?? myWarehousesData?.[0].id!);

  return (
    <div className={styles.container}>
      {
        myWarehousesData && returnData
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
                returnData?.length! > 0
                &&
                <Button
                  buttonType={ButtonTypes.Primery}
                  title={t('Button.Add')}
                  onClick={() => navigate(`/warehouse_returns/create/${warehouseId ?? myWarehousesData?.[0].id!}`)}
                  buttonStyle={styles.button}
                />
              }
            </div>
            {returnData?.length! > 0
              ?
              (
                <div>Body</div>
                // bodyData
                //   ?
                //   <div className={styles.fullBody}>
                //     <CustomTable
                //       headerData={headerData}
                //       bodyData={bodyData}
                //     />
                //     <CustomPagination
                //       limit={100}
                //       offset={activePage}
                //       onChange={(_, page) => {
                //         setOffset((page -1) * 7);
                //         setActivePage(page);
                //         window.scrollTo(0, 0);
                //       }}
                //     />
                //   </div>
                //   :
                //   <Loading />
              )
              :
              <div className={styles.emptyBody}>
                <NoData
                  withButton
                  btnText={t('Button.Add')}
                  btnOnclick={() => navigate(`/warehouse_returns/create/${warehouseId ?? myWarehousesData?.[0].id!}`)}
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

export default StorageReturn