import React from "react";
import useFetch from "../../Hooks/useFetch";
import styles from "./FeedPhotos.module.css";
import { PHOTOS_GET } from "../../api";
import PhotoFeed from "./PhotoFeed";
const FeedPhotos = ({ pag, setInfinito, user, setLoader, setModal }) => {
  const { request, loading } = useFetch();
  const [data, setData] = React.useState(null);
  React.useEffect(() => {
    setLoader(true);

    async function GetData() {
      const { url, options } = PHOTOS_GET(6, pag, user);
      const { response } = await request(url, options);
      setData(response);
      if (response.length < 6) setInfinito(false);
      if(response.length == 0) {
      const { url, options } = PHOTOS_GET(2, pag, user);
      const { response } = await request(url, options);
      setData(response);

      }
      setLoader(false);
    }
    GetData();
  }, [setLoader, setInfinito, pag, request, user]);

  return (
    <div className={styles.container}>
      {data &&
        data.map((item) => (
          <PhotoFeed
            key={item.id}
            src={item.src}
            id={item.id}
            acessos={item.acessos}
            setModal={setModal}
          />
        ))}
    </div>
  );
};

export default FeedPhotos;
