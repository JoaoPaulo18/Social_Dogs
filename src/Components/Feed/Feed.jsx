import React from "react";
import { UserContext } from "../../UserContext";
import Loading from "../Elements/Loading";
import styles from "./Feed.module.css";
import FeedPhotos from "./FeedPhotos";
import FeedModal from "./FeedModal";
const Feed = ({ user }) => {
  const { loading } = React.useContext(UserContext);
  const [pages, setPages] = React.useState([1]);
  const [loader, setLoader] = React.useState(false);
  const [infinito, setInfinito] = React.useState(true);
  const [wait, setWait] = React.useState(false);
  const [modal, setModal] = React.useState(null);

  const LoadData = React.useCallback(
    async function () {
      if (infinito && !wait) {
        setPages((pages) => [...pages, pages.length + 1]);
        setWait(true);

        setTimeout(() => {
          setWait(false);
        }, 600);
      }
    },
    [infinito, wait]
  );
  React.useEffect(() => {
    function Verify() {
      const Window = window.innerHeight;
      const Scroll = window.scrollY;
      const off = document.body.offsetHeight;
      if (off - (Window + Scroll + 90) <= 0) LoadData();
    }
    Verify();
    window.addEventListener("scroll", Verify);
    window.addEventListener("wheel", Verify);

    return () => {
      window.removeEventListener("scroll", Verify);
      window.removeEventListener("wheel", Verify);
    };
  }, [LoadData]);

  return (
    <>
      {modal ? <FeedModal id={modal} setModal={setModal} /> : null}
      <section className="container animLeft">
        {loading ? <Loading /> : null}
        {pages.map((pag) => {
          (user)
          return (
            <FeedPhotos
              key={pag}
              pag={pag}
              user={user}
              setInfinito={setInfinito}
              setLoader={setLoader}
              setModal={setModal}
            />
          );
        })}
        {!infinito && !user && (
          <p className={styles.acabou}>Não existem mais postagens.</p>
        )}
      </section>
    </>
  );
};

export default Feed;
