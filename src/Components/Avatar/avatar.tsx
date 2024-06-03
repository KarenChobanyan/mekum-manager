import React from 'react';
import styles from './styles.module.scss';

interface IProps {
    name: string,
    image?: string,
    style?: string
};

const Avatar: React.FC<IProps> = (props) => {
    const { name, image, style } = props;
    return (
        <>
            {image
                ?
                <img src={image!} alt='userAvatar' className={`${styles.imageBox} ${style}`} />
                :
                <div className={`${styles.nameBox} ${style}`}>
                    <div>{name.trim()[0]}</div>
                </div>
            }
        </>
    )
}

export default Avatar
