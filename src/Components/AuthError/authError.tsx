import React from "react";
import styles from "./authError.module.scss";
interface IProps {
  text: any;
}
const AuthError: React.FC<IProps> = ({ text }) => {
  return <div className={styles.error}>{text}</div>;
};

export default AuthError;