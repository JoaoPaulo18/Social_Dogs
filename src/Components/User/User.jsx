import React from "react";
import Title from "../Elements/Title";
import styles from "./User.module.css";
import Fotos from "../../Assets/feed.svg?react";
import Stats from "../../Assets/estatisticas.svg?react";
import Add from "../../Assets/adicionar.svg?react";
import Out from "../../Assets/sair.svg?react";

import { NavLink, Route, Routes, useLocation } from "react-router-dom";
import { UserContext } from "../../UserContext";

import Feed from "../Feed/Feed";
import UserPost from "./UserPost";

const User = () => {
  const [title, setTitle] = React.useState("Minha Conta");
  const [mobile, setMobile] = React.useState(false);
  const [openMob, setOpenMob] = React.useState(false);
  const { pathname } = useLocation();
  const { Exit, data, loading } = React.useContext(UserContext);

  React.useEffect(() => {
    setOpenMob(false);
    if (pathname.endsWith("add")) setTitle("Poste Sua Foto");
    else if (pathname.endsWith("stats")) setTitle("Estatísticas");
    else setTitle("Minha Conta");
  }, [pathname]);

  React.useEffect(() => {
    function handleResize() {
      const size = window.matchMedia("(max-width:640px)").matches;
      if (size) setMobile(true);
      else setMobile(false);
    }
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  function handleClick() {
    setOpenMob(!openMob);
  }
  if (loading || !data) return null;
  return (
    <section className={`${styles.container} animLeft`}>
      <header className={`${styles.header} container`}>
        <Title>{title}</Title>
        {mobile ? (
          <button
            onClick={handleClick}
            className={`${styles.menuBtn} ${openMob ? styles.active : null}`}
          ></button>
        ) : null}
        <ul className={mobile ? styles.ulMob : styles.ulNav}>
          <NavLink to="/user" end>
            <Fotos />
            {mobile ? <span>Minhas Fotos</span> : null}
          </NavLink>
         
          <NavLink to="add">
            <Add />
            {mobile ? <span>Adicionar Foto</span> : null}
          </NavLink>
          <button onClick={() => Exit()}>
            <Out />
            {mobile ? <span>Sair</span> : null}
          </button>
        </ul>
      </header>

      <Routes>
        <Route path="/" element={<Feed user={data.id} />} />

        <Route path="/add" element={<UserPost />} />
      </Routes>
    </section>
  );
};

export default User;
