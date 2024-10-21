import React from "react";
import styles from "./FeedModal.module.css";
import useFetch from "../../Hooks/useFetch";
import Loading from "../Elements/Loading";
import Title from "../Elements/Title";

import { COMMENT_GET, COMMENT_POST, PHOTO_GET } from "../../api";
import { NavLink } from "react-router-dom";
import Eye from "../../Assets/visualizacao-black.svg?react";
import Dog from "../../Assets/enviar.svg?react";
import { UserContext } from "../../UserContext";

const FeedModal = ({ id, setModal }) => {
  const [Data, setData] = React.useState(null);
  const { request, loading } = useFetch();
  const [comments, setComments] = React.useState([]);
  const [comment, setComment] = React.useState("");
  const list = React.useRef();
  const { login, data } = React.useContext(UserContext);

  const getInfos = React.useCallback(
    async function () {
      const { url, options } = PHOTO_GET(id);
      const { link, response } = await request(url, options);
      setComments(response.comments);
      if (link.ok) {
        setData(response.photo);
      }
    },
    [id, request]
  );
  React.useEffect(() => {
    getInfos();
    return () => setComments([]);
  }, [getInfos]);

  function handleClick(e) {
    if (e.target === e.currentTarget) {
      setModal(null);
    }
  }
  /** ARRUMAR COMENTARIO QUE NAO CARREGA APOS SER POSTADO, SO CARREGA COM CONSOLE ABERTO */
  const handleSubmit = React.useCallback(
    async function (e) {
      e.preventDefault();

      const { url, options } = COMMENT_POST(id, { comment });
      const { link, response } = await request(url, options);
      if (link.ok) {
        setComments((comments) => [...comments, comment]);
        setComment("");
      }
    },
    [comment, id, request]
  );

  return (
    <article onClick={handleClick} className={styles.container}>
      {loading && <Loading />}

      {Data && (
        <div className={styles.wrapper}>
          <div className={styles.image}>
            <img src={`${Data.src}`} alt="" />
          </div>
          <div className={styles.infos}>
            <div className={styles.gridBox}>
              <ul className={styles.Author}>
                <NavLink to={`profile/${Data.author}`}>@{Data.author}</NavLink>
                <span>
                  <Eye />
                  {Data.acessos}
                </span>
              </ul>

              <Title>{Data.title}</Title>

              <ul className={styles.age}>
                <span>{Data.peso} kg</span>
                <span>{Data.idade} anos</span>
              </ul>
            </div>

            <ul ref={list} className={styles.commentsList}>
              {comments.map((comment) => (
                <li key={comment.comment_ID || comment}>
                  <span>{comment.comment_author || data.username}:</span>{" "}
                  {comment.comment_content || comment}
                </li>
              ))}
            </ul>

            {login ? (
              <form onSubmit={handleSubmit} className={styles.form}>
                <textarea
                  value={comment}
                  onChange={({ target }) => setComment(target.value)}
                  placeholder="Comente..."
                />
                <button>
                  <Dog />
                </button>
              </form>
            ) : null}
          </div>
        </div>
      )}
    </article>
  );
};

export default FeedModal;
