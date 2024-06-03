import React from 'react';
import { useGeneralHooks } from '../../General/Hooks/hooks';
import Languages from '../Languages/languages';
import CurrentUserInfo from '../CurrentUserInfo/currentUserInfo';
import styles from './header.module.scss';

interface IProps {
  title?: string
}

const Header: React.FC<IProps> = (props) => {
  const { title } = props;
  const { currentUser } = useGeneralHooks();

  return (
    <div className={styles.body}>
      <div className={styles.logo}>
        <div className={styles.bigText}>
          <span>Mekum</span>
        </div>
        <div className={styles.smallText}>
          <span>manager</span>
        </div>
      </div>
      <div className={styles.title}>
        {title!}
      </div>

      <div className={styles.infoBox}>
        {currentUser.role_id
          &&
          <CurrentUserInfo
            name={currentUser.name!}
            surename={currentUser.surname!}
          />
        }
        <Languages />
      </div>
    </div>
  )
}

export default Header
