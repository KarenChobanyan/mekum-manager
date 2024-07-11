import React from 'react';
import { IActionCard } from '../../Interfaces/componentTypes';
import styles from './actionCard.module.scss';

const ActionCard:React.FC<IActionCard> = (props) => {
    const {src,title,onClick} = props;
  return (
    <div className={styles.container} onClick={onClick}>
      <div className={styles.imageBox}>
      <img src={src} alt='cardImage' className={styles.image}/>
      </div>
      <div className={styles.title}>
        <span>{title}</span>
      </div>
    </div>
  )
}

export default ActionCard
