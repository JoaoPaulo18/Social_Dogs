import React from "react";

const useFetch = () => {
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState(null);

  const request = React.useCallback(async (url, options) => {
    let link;
    let response;

    setLoading(true);
    try {
      link = await fetch(url, options);
      response = await link.json();
      console.log(response)
    } catch (err) {
      setError("Erro");
    } finally {
      setLoading(false);
      return { link, response };
    }
  }, []);

  return { loading, error, request };
};

export default useFetch;
