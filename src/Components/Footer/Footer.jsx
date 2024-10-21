import React from "react";
import styles from "./Footer.module.css";
import Dog from "../../Assets/dogs-footer.svg?react";
const Footer = () => {
  return (
    <footer className={styles.footer}>
      <Dog /> Dogs. Alguns direitos reservados
    </footer>
  );
};

export default Footer;
