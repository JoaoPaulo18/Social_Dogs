import React from "react";

const useForm = (type) => {
  const [data, setData] = React.useState(null);
  const [error, setError] = React.useState(null);
  const testes = {
    email: {
      regex: /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/,
      menssagem: "Email inválido",
    },
  };
  function Validate(e) {
    if (!e) {
      setError("Preencha o campo a cima");
      return false;
    } else if (type) {
      if (!testes[type].regex.test(e)) {
        setError(testes[type].menssagem);
        return false;
      }
    } else {
      return true;
    }
  }

  function onChange({ target }) {
    error && setError(null);
    setData(target.value);
  }

  function onBlur() {
    Validate(data);
  }

  return { onChange, onBlur, error, data, Validate: () => Validate(data) };
};

export default useForm;
