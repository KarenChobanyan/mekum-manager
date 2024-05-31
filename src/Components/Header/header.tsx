import React from 'react';
import Languages from '../Languages/languages';
import styles from './header.module.scss';

interface IProps {
  title?: string
}

const Header: React.FC<IProps> = (props) => {
  const { title } = props;

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
        <Languages />
      </div>
    </div>
  )
}

export default Header
