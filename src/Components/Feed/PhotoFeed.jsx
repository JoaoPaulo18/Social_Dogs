import React from "react";
import styles from "./PhotoFeed.module.css";
import Eyes from "../../Assets/visualizacao.svg?react";
const PhotoFeed = ({ id, acessos, src, setModal }) => {
  return (
    <div className={styles.container} onClick={() => setModal(id)}>
      <span>
        <Eyes />
        {acessos}
      </span>
      <img src={src} />
    </div>
  );
};

export default PhotoFeed;
