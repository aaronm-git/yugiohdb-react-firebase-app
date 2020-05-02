import React from "react";
import firebase from "../firebase";
import { Image } from "react-bootstrap";

import Loading from "./Loading";

export default function CardImage({ cardId }) {
  const storage = firebase.storage();
  const [imgURL, setImgURL] = React.useState("");
  const [foundImage, setFoundImage] = React.useState(false);
  React.useEffect(() => {
    async function findImage() {
      try {
        const url = await storage.ref(`cards/${cardId}.jpg`).getDownloadURL();
        setImgURL(url);
      } catch (error) {
        console.error(error, cardId);
      }
      setFoundImage(true);
    }
    findImage();
  }, [cardId, storage]);

  return (
    <>
      {foundImage ? (
        imgURL.length ? (
          <Image src={imgURL} className="w-75" />
        ) : (
          <p className="text-muted">Image Not Found</p>
        )
      ) : (
        <Loading />
      )}
    </>
  );
}
