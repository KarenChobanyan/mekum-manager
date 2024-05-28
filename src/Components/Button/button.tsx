import React from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import { ButtonTypes } from '../../Interfaces/componentTypes';
import styles from './button.module.scss';

const BUTTON_STYLES = {
  [ButtonTypes.Primery]: {
    button: styles.primeryButton,
    title: styles.bigTitle,
  },
  [ButtonTypes.Disabled]: {
    button: styles.disabledButton,
    title: styles.bigTitle,
  },
  [ButtonTypes.ButtonWithIcon]: {
    button: styles.iconButton,
    title: styles.iconButtonTitle,
  },
  [ButtonTypes.WithoutBg]: {
    button: styles.withoutBgButton,
    title: styles.withoutBgTitle,
  }
};

interface IButton {
  title: string | undefined;
  type?: 'submit' | 'reset' | 'button' | undefined;
  buttonType: ButtonTypes;
  onClick?: (e: React.MouseEvent<HTMLElement>) => void;
  disable?: boolean;
  leftIcon?: string;
  rightIcon?: string;
  buttonStyle?: string;
  buttonTitleStyle?: string;
  isLoading?: boolean;
  agree?: boolean;
}

const Button: React.FC<IButton> = (props) => {
  const {
    title,
    type,
    onClick,
    disable,
    buttonType,
    buttonStyle,
    buttonTitleStyle,
    leftIcon,
    rightIcon,
    isLoading,
  } = props;  

  return (
    <button
      className={`${styles.button} ${[
        BUTTON_STYLES[buttonType].button,
      ]} ${buttonStyle}`}
      type={type}
      onClick={onClick}
      disabled={disable}
    >
      <div>{leftIcon && <img src={leftIcon} alt='userAdd' />}</div>
      {!isLoading ? (
        <div className={styles['btn-content-container']}>
          <div
            className={`${[BUTTON_STYLES[buttonType].title]} ${buttonTitleStyle}`}
          >
            {title}
          </div>
          <div className={styles.alignCenter}>
            {rightIcon && <img src={rightIcon} alt='userAdd' />}
          </div>
        </div>
      ) : (
        <CircularProgress sx={{ color: 'white' }} size='20px' />
      )}
    </button>
  );
};
export default Button;
