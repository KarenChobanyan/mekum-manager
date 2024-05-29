import React from 'react'
import useLanguagesHooks from './languages-hooks';
import { ILanguages } from '../../Interfaces/componentTypes';
import { Unstable_Popup as BasePopup, } from '@mui/base/Unstable_Popup';
import styles from './languages.module.scss';

const Languages: React.FC = () => {
  const {
    show,
    anchor,
    containerRef,
    activeLangSrc,
    checkableLanguages,
    setShow,
    setAnchor,
    setActiveLangSrc,
    changeActiveLanguage,
  } = useLanguagesHooks();

  return (
    <div
      className={styles.language}
      ref={node => {
        setAnchor(node);
        containerRef.current = node;
      }}
    >
      <img
        onClick={() => setShow(!show)}
        src={activeLangSrc}
        alt='langIcon'
        className={styles.languageItem}
      />
      <BasePopup
        open={show}
        placement='bottom-end'
        anchor={anchor}
      >
        <div className={styles.popup} ref={containerRef}>
          {checkableLanguages.map((item: ILanguages) => {
            return (
              <img
                src={item.icon}
                key={item.id}
                onClick={() => {
                  setShow(false);
                  setActiveLangSrc(item.icon);
                  changeActiveLanguage(item.code);
                }}
                alt='langIcon'
                className={styles.languageItem}
              />
            );
          })}
        </div>
      </BasePopup>
    </div>
  );
};

export default Languages
