import React from 'react';
import styles from './home.module.scss'
import { ActionCard, Loading } from '../../Components';
import useHomePageHooks from './homePage-hooks';

const HomePage: React.FC = () => {
  const { optionList } = useHomePageHooks()

  return (
    <div className={styles.container}>
      {optionList.length > 0
        ?
        optionList.map((option) => {
          return (
            <ActionCard
              key={option.title}
              src={option.src}
              title={option.title}
              onClick={option.onClick}
            />
          )
        })
        :
        <Loading />
      }
    </div>
  )
}

export default HomePage
