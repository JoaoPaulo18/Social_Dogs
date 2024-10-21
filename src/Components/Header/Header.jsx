import React from "react";
import styles from "./Header.module.css";
import { Link } from "react-router-dom";
import Dog from "../../Assets/dogs.svg?react";
import Profile from "../../Assets/usuario.svg?react";
import { UserContext } from "../../UserContext";
const Header = () => {
  const { data } = React.useContext(UserContext);
  return (
    <header className={styles.header}>
      <div className={styles.wrapper}>
        <Link to="/">
          <Dog />
        </Link>

        {data ? (
          <Link to="user">
            {data.username} <Profile />
          </Link>
        ) : (
          <Link to="login">
            Login / Criar <Profile />
          </Link>
        )}
      </div>
    </header>
  );
};

export default Header;
