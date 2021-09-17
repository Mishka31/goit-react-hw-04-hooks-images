import { useState, useEffect } from "react";
import s from "./ImageGallery.module.css";
import ImageGalleryItem from "../ImageGalleryItem/ImageGalleryItem.jsx";
import Button from "../Button/Button.jsx";
import Loader from "../Loader/Loader.jsx";
import { fetchArray } from "../../api/api.jsx";
import Modal from "../Modal/Modal.jsx";

export function ImageGallery({ value }) {
  const [hitsss, setHitsss] = useState([]);
  const [error, setError] = useState(null);
  const [status, setStatus] = useState("idle");
  const [page, setPage] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [largeUrl, setLargeUrl] = useState("");
  const [tag, setTag] = useState("");

  useEffect(() => {
    if (!value) {
      return;
    }
    setStatus("pending");

    fetchArray(value, 1)
      .then((res) => res.hits)
      .then((hits) => setHitsss(hits))
      .catch((error) => setError(error), setStatus("resolved"))
      .finally(() => setStatus("resolved"), setPage(2));
  }, [value]);

  const onCloseByEscape = () => {
    window.addEventListener("keydown", (e) => {
      if (e.code === "Escape") {
        setShowModal(false);
      }
    });
  };

  const onCloseByOverlay = (e) => {
    if (e.currentTarget === e.target) {
      setShowModal(false);
    }
  };
  const takeNextPage = () => {
    setPage(page + 1);
    fetchArray(value, page).then((res) => {
      setHitsss([...hitsss, ...res.hits]);
      setStatus("resolved");
      window.scrollTo({
        top: document.documentElement.scrollHeight,
        behavior: "smooth",
      });
    });
  };

  const onClickPciture = (e, alt) => {
    setLargeUrl(e);
    setTag(alt);
    setShowModal(true);
  };

  if (status === "idle") {
    return <p className={s.title}>Enter your search word</p>;
  }
  if (status === "pending") {
    return <Loader />;
  }
  if (status === "rejected") {
    return <h1>{error}</h1>;
  }
  if (status === "resolved") {
    return (
      <>
        {showModal && (
          <Modal
            onModalClose={(onCloseByEscape(), onCloseByOverlay)}
            src={largeUrl}
            alt={tag}
          />
        )}
        <ul className={s.ImageGallery}>
          <ImageGalleryItem hits={hitsss} onClick={onClickPciture} />
        </ul>
        {hitsss && <Button page={page} onClick={takeNextPage} />}
      </>
    );
  }
}

export default ImageGallery;
