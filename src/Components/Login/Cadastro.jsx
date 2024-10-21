import React from "react";
import Input from "../Elements/Input";
import Title from "../Elements/Title";
import Button from "../Elements/Button";
import useForm from "../../Hooks/useForm";
import { USER_POST } from "../../api";
import { UserContext } from "../../UserContext";
import Error from "../Elements/Error";

const Cadastro = () => {
  const email = useForm("email");
  const username = useForm();
  const password = useForm();
  const { tokenPost, loading, error, login } = React.useContext(UserContext);


  async function handleSubmit(event) {
    event.preventDefault()
    
    const {url,options} = USER_POST({
     username:username.data,
     password:password.data,
      email:email.data
    }
    )

    const response = await fetch(url,options);
    if(response.ok){
      tokenPost(username.data, password.data);
    }
  }
  return (
    <article className="animLeft">
      <Title>Cadastre-se</Title>
      <form onSubmit={handleSubmit}>
        <Input id="username" type="text" name="Usuário" {...username} />
        <Input id="email" type="email" name="Email" {...email} />
        <Input id="password" type="password" name="Senha" {...password} />
        <Button>Cadastrar</Button>
        <Error>Existem muitos email cadastrados, caso não consiga, utilize o login dog e senha dog</Error>
      </form>
    </article>
  );
};

export default Cadastro;


