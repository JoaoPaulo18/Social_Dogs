import React from "react";
import Input from "../Elements/Input";
import Title from "../Elements/Title";
import Button from "../Elements/Button";
import styles from "./Enter.module.css";
import { Link, Navigate } from "react-router-dom";
import useForm from "../../Hooks/useForm";
import { UserContext } from "../../UserContext";
import Error from "../Elements/Error";
const Enter = () => {
  const username = useForm();
  const password = useForm();
  const { tokenPost, loading, error, login } = React.useContext(UserContext);

  function handleSubmit(e) {
    e.preventDefault();
    if (username.Validate() && password.Validate()) {
      tokenPost(username.data, password.data);
    }
  }

  if (login) {
    return <Navigate to="/user" />;
  } else
    return (
      <article className={`animLeft ${styles.container}`}>
        <Title>Login</Title>
        <form onSubmit={handleSubmit}>
          <Input id="username" type="text" name="Usuário" {...username} />
          <Input id="password" type="password" name="Senha" {...password} />
          {loading ? (
            <Button disabled>Carregando...</Button>
          ) : (
            <Button>Entrar</Button>
          )}
          {error && <Error>{error}</Error>}
        </form>

        <Link className={styles.lost} to="perdeu">
          Perdeu a Senha?
        </Link>

        <div className={styles.cadastro}>
          <h3>Cadastre-se</h3>
          <span>Ainda não possui conta? Cadastre-se no site.</span>

          <Link to="cadastro">Cadastro</Link>
        </div>
      </article>
    );
};

export default Enter;
