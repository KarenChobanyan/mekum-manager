import React from 'react';
import styles from './header.module.scss';

const Header: React.FC = () => {
  return (
    <div className={styles.body}>
      <div className={styles.title}>
        <div className={styles.bigText}>
          <span>Mekum</span>
        </div>
        <div className={styles.smallText}>
          <span>manager</span>
        </div>
      </div>
    </div>
  )
}

export default Header
