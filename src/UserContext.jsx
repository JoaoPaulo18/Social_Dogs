import React from "react";
import { GET_USER, TOKEN_POST, TOKEN_VALIDATE } from "./api";
import { Navigate, useNavigate } from "react-router-dom";
export const UserContext = React.createContext();
export const UserStorage = ({ children }) => {
  const [data, setData] = React.useState(null);
  const [login, setLogin] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [token, setToken] = React.useState(null);
  const [error, setError] = React.useState(null);
  const navigation = useNavigate();

  const Exit = React.useCallback(
    function () {
      setData(null);
      setLoading(false);
      setLogin(false);
      window.localStorage.removeItem("token");
      setToken(null);
      navigation("/login");
    },
    [navigation]
  );

  const getUser = React.useCallback(async function (token) {
    setLoading(true);
    const { url, options } = GET_USER(token);
    const link = await fetch(url, options);
    const response = await link.json();
    setData(response);
    setLoading(false);
    setLogin(true);
  }, []);

  async function tokenPost(username, password) {
    try {
      setError(null);
      setLoading(true);
      const { url, options } = TOKEN_POST({ username, password });
      const link = await fetch(url, options);
      const response = await link.json();
      if (!link.ok) throw new Error();
      window.localStorage.setItem("token", response.token);
      setToken(response.token);
      await getUser(response.token);
    } catch (err) {
      setError("Usuário Inválido");
    } finally {
      setLoading(false);
      navigation("/user");
    }
  }

  React.useEffect(() => {
    async function validateToken() {
      const token = window.localStorage.getItem("token");
      if (token && !login) {
        setLoading(true);
        try {
          const { url, options } = TOKEN_VALIDATE(token);
          const request = await fetch(url, options);
          if (!request.ok) throw new Error();
          await getUser(token);
        } catch (err) {
          setError("Usuário Expirado");
        } finally {
          setLoading(false);
        }
      }
    }

    validateToken();
  }, [getUser, navigation, login, Exit]);

  return (
    <UserContext.Provider
      value={{ tokenPost, Exit, loading, login, data, error }}
    >
      {children}
    </UserContext.Provider>
  );
};
