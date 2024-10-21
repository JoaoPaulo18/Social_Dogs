import React from "react";
import styles from "./Login.module.css";
import { Route, Routes } from "react-router-dom";
import Cadastro from "./Cadastro";
import Enter from "./Enter";
import { Lost } from "./Lost";
const Login = () => {
  return (
    <section className={styles.loginContainer}>
      <Routes>
        <Route path="/" element={<Enter />} />
        <Route path="/cadastro" element={<Cadastro />} />
        <Route path="/perdeu" element={<Lost />} />
      </Routes>
    </section>
  );
};

export default Login;
