import React from "react";
import Input from "../Elements/Input";
import useForm from "../../Hooks/useForm";
import useFetch from "../../Hooks/useFetch";
import Button from "../Elements/Button";
import styles from "./UserPost.module.css";
import { PHOTO_POST } from "../../api";
import { useNavigate } from "react-router-dom";

const UserPost = () => {
  const nome = useForm();
  const peso = useForm();
  const idade = useForm();
  const [img, setImg] = React.useState(null);
  const Imagem = React.useRef();
  const { loading, request } = useFetch();
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    if (nome.Validate() && peso.Validate() && idade.Validate() && img) {
      const formData = new FormData();
      formData.append("img", img.raw);
      formData.append("nome", nome.data);
      formData.append("peso", peso.data);
      formData.append("idade", idade.data);

      const { url, options } = PHOTO_POST(formData);
      const { link, response } = await request(url, options);
      if (link.ok) navigate("/user");
    }
  }

  function handleChange(e) {
    const File = URL.createObjectURL(e.target.files[0]);
    setImg({
      preview: File,
      raw: e.target.files[0],
    });
  }

  return (
    <section className={`container animLeft ${styles.container}`}>
      <form onSubmit={handleSubmit}>
        <Input id="nome" type="text" name="Nome" {...nome} />
        <Input id="peso" type="number" name="Peso" {...peso} />
        <Input id="idade" type="number" name="Idade" {...idade} />
        <input onChange={handleChange} type="file" />
        {loading ? (
          <Button disabled>Carregando...</Button>
        ) : (
          <Button>Enviar</Button>
        )}
      </form>

      <div className={styles.wrapper}>
        <div
          ref={Imagem}
          style={img && { backgroundImage: `url('${img.preview}')` }}
          className={styles.Image}
        ></div>
      </div>
    </section>
  );
};

export default UserPost;
