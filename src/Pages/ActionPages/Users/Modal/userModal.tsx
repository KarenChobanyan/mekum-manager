import React, { useEffect } from 'react';
import { Button, CustomModal } from '../../../../Components';
import styles from './userModal.module.scss';
import { useRemoveUserMutation } from '../../../../API/authApi';
import { useGeneralHooks } from '../../../../General/Hooks/hooks';
import { ButtonTypes } from '../../../../Interfaces/componentTypes';
import { toast } from 'react-toastify';

interface IProps {
    id: string,
    open: boolean,
    handleClose: () => void
}

const UserModal: React.FC<IProps> = (props) => {
    const { id, open, handleClose } = props;
    const { t, navigate } = useGeneralHooks();
    const [remove, { isLoading, isSuccess, isError }] = useRemoveUserMutation();
    const onRemove = async () => {
        await remove(id)
    };

    useEffect(() => {
        if (isSuccess) {
            toast.success(t('Toast.Success.Remove'))
            handleClose()
            navigate(-1)
        } else if (isError) {
            toast.error(t('Toast.Error.Action'))
        }
    }, [isSuccess, isError]);

    return (
        <CustomModal
            title={t('Actions.Remove_User.Title')}
            open={open}
            handleClose={handleClose}
            loading={isLoading}
            children={
                <div className={styles.container}>
                    <p className={styles.text}>{t('Actions.Remove_User.Text')}</p>
                    <div className={styles.buttonRow}>
                        <Button
                            buttonType={ButtonTypes.WithoutBg}
                            title={t('Button.Close')}
                            onClick={handleClose}
                            buttonStyle={styles.button}
                        />
                        <Button
                            buttonType={ButtonTypes.Primery}
                            title={t('Button.Submit')}
                            onClick={onRemove}
                            buttonStyle={styles.button}
                        />
                    </div>

                </div>
            }

        />
    )
}

export default UserModal
