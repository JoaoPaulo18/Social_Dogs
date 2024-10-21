import React from "react";
import Input from "../Elements/Input";
import Title from "../Elements/Title";
import Button from "../Elements/Button";
import useForm from "../../Hooks/useForm";

export const Lost = () => {
  const lost = useForm();
  return (
    <article className="animLeft">
      <Title>Perdeu a Senha?</Title>
      <form>
        <Input id="lost" type="email" name="Email / Usuário" {...lost} />
        <Button>Enviar Email</Button>
      </form>
    </article>
  );
};
