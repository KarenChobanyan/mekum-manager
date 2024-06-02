import React from 'react';
import styles from './home.module.scss'
import { ActionCard } from '../../Components';
import useHomePageHooks from './homePage-hooks';

const HomePage:React.FC = () => {
  const {optionList} = useHomePageHooks(2)
  return (
    <div className={styles.container}>
      {optionList.map((option)=>{
        return (
          <ActionCard
          key={option.title}
          src={option.src}
          title={option.title}
          onClick={option.onClick}
          />
        )
      })}
    </div>
  )
}

export default HomePage
