import React from "react";
import styles from "./Input.module.css";
import Error from "./Error";
const Input = ({ id, type, name, error, ...props }) => {
  return (
    <div className={styles.input}>
      <label htmlFor={id}>{name}</label>
      <input type={type} id={id} name={name} {...props} />
      {error && <Error>{error}</Error>}
    </div>
  );
};

export default Input;
