import React from 'react'
import { AuthInput, AutoComplete, Button, CustomModal } from '../../../../Components';
import { ISaleModal } from '../Create/createSales-hooks';
import useSalesModal from './salesModal-hook';
import { Controller } from 'react-hook-form';
import { ButtonTypes, } from '../../../../Interfaces/componentTypes';
import styles from './saleModal.module.scss';

interface IProps {
    data: ISaleModal
    handleClose: () => void,
}

const SaleModal: React.FC<IProps> = (props) => {
    const { data, handleClose, } = props;
    const { open, money, partner } = data;
    const { control, register, handleSubmit, reset, errors, onSubmit, cashRegistersData, t, isLoading,warning } = useSalesModal(partner!, handleClose);
    const onClose = () => {
        handleClose();
        reset()
    };

    return (
        <CustomModal
            title={t(`Actions.Cash_Income.Title`)}
            titleStyle={styles.title}
            handleClose={onClose}
            open={open}
            children={
                <form onSubmit={handleSubmit(onSubmit)} className={styles.container} >
                    <div className={styles.form}>
                        <Controller
                            control={control}
                            name='cashRegisterId'
                            rules={{
                                required: t('Input_Errors.Required'),
                            }}
                            render={({ field: { onChange, name, value } }) => {
                                return (
                                    <div className='modalAutocomplete'>
                                        <AutoComplete
                                            value={value}
                                            name={name}
                                            onChange={onChange}
                                            id='cashBoxId'
                                            data={cashRegistersData}
                                            label={t('Forms.CassRegister')}
                                            placeholder="Ընտրեք դրամարկղը"
                                            showErrorText={false}
                                            style={styles.inputBox}
                                            labelStyle={styles.formInputLabel}
                                            error={errors.cashRegisterId}
                                        />
                                    </div>
                                );
                            }}
                        />
                        <div className={styles.inputBox}>
                            <p className={styles.formInputLabel}>{t('Forms.Partner')}</p>
                            <div className={styles.textDiv}>
                                <p>{partner?.title}</p>
                            </div>
                        </div>
                        <AuthInput
                            register={register}
                            registerName='debt'
                            label={t('Forms.Debt')}
                            showTextError={false}
                            disabled
                            type='number'
                            style={styles.inputBox}
                            inputStyle={styles.input}
                            labelStyle={styles.formInputLabel}
                            inputBoxStyles={styles.input}
                        />
                        <AuthInput
                            register={register}
                            registerName='money'
                            label={t('Forms.Money')}
                            showTextError={false}
                            type='number'
                            defaultValue={money!}
                            style={styles.inputBox}
                            inputStyle={styles.input}
                            inputBoxStyles={styles.input}
                            labelStyle={styles.formInputLabel}
                            error={errors.money}
                            warning={warning}
                        />
                    </div>
                    <div >
                        <div className={styles.buttons}>
                            <Button
                                type='button'
                                onClick={() => handleClose()}
                                buttonType={ButtonTypes.WithoutBg}
                                title={t('Button.Cancel')}
                                buttonStyle={styles.button}
                            />
                            <Button
                                type='submit'
                                buttonType={ButtonTypes.Primery}
                                title={t('Button.Submit')}
                                buttonStyle={styles.button}
                            />
                        </div>
                    </div>
                </form>
            }
        />
    )
}

export default SaleModal
