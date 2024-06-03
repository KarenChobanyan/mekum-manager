import React from 'react';
import useCurrentUserInfoHooks from './currentUserInfo-hooks';
import { Unstable_Popup as BasePopup, } from '@mui/base/Unstable_Popup';
import Avatar from '../Avatar/avatar';
import styles from './styles.module.scss';
import { AvatarIcon, LogOutIcon } from '../../Assets/Icons';
import { useGeneralHooks } from '../../General/Hooks/hooks';

interface IProps {
    name: string,
    surename: string,
    image?: string
}
const CurrentUserInfo: React.FC<IProps> = (props) => {
    const { name, surename, image } = props;
    const { t, onLogout, navigate } = useGeneralHooks();
    const { show, setAnchor, headerProfileRef, anchor, setShow } = useCurrentUserInfoHooks();

    return (
        <div
            onClick={() => setShow(!show)}
            ref={node => {
                setAnchor(node);
                headerProfileRef.current = node;
            }}
            className={styles.container}
        >
            <Avatar name={name} image={image} />
            <div className={styles.userData}>
                <span>{name}</span>
                <span>{surename}</span>
            </div>
            <BasePopup
                open={show}
                placement='bottom'
                anchor={anchor}
            >
                <div className={styles.popupConatiner} ref={headerProfileRef} style={{ width: headerProfileRef.current?.offsetWidth! }}>
                    <div
                        className={styles.popupRowNav}
                        onClick={(e) => {
                            e.stopPropagation()
                            navigate('/my_page')
                            setShow(false)
                        }}
                    >
                        <img src={AvatarIcon} alt='AvatarIcon' />
                        <div>
                            <span>
                                {t('Header.My_Page')}
                            </span>
                        </div>
                    </div>
                    <div
                        className={styles.logOutNav}
                        onClick={() => {
                            onLogout()
                            setShow(false)
                        }}
                    >
                        <img src={LogOutIcon} alt='logutIcon' />
                        <div>
                            <span>
                                {t('Header.Log_Out')}
                            </span>
                        </div>
                    </div>
                </div>
            </BasePopup>
        </div>
    )
}

export default CurrentUserInfo
