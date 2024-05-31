import {t} from 'i18next';
import Button from '../Button/button';
import { ButtonTypes } from '../../Interfaces/componentTypes';
import { NoDataImg } from '../../Assets/Images';
import styles from './noData.module.scss';

interface IProps {
  withButton?: boolean;
  btnText?: string;
  title?: string;
  image?:string,
  description?: string;
  btnOnclick?: () => void;
}

const NoData: React.FC<IProps> = (props) => {
  const { withButton, btnText, btnOnclick, title=t('NoData.NoData'), description,image = NoDataImg} = props;
  return (
    <div className={styles.container}>
      <div className={styles.section}>
        <img className={styles.image} src={image} alt='img'/>
        <div className={styles.title}>
          {title}
        </div>
        <div className={styles.description}>
          {description}
        </div>
        {withButton && (
          <div className={styles.button}>
            <Button
              buttonType={ButtonTypes.Primery}
              title={btnText}
              onClick={btnOnclick}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default NoData;