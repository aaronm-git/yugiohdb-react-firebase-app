import React from "react";
import firebase from "../firebase";

import { Image } from "react-bootstrap";
import Loading from "./Loading";

export default function CardImage({ cardId }) {
  const [imgURL, setImgURL] = React.useState("");
  const [runComplete, setRunComplete] = React.useState(false);
  const [foundImage, setFoundImage] = React.useState(false);
  const verifyImgExists = firebase.functions().httpsCallable("verifyImgExists");
  // const verifyImgExists = firebase
  //   .functions()
  //   .useFunctionsEmulator("http://localhost:5001/yugiohdb-app/us-central1/verifyImgExists");
  React.useEffect(() => {
    if (cardId && runComplete === false) {
      async function findImage() {
        try {
          const result = await verifyImgExists({ cardId });
          console.log(result);
          if (result.data.Data.exists && result.data.Status !== 500) {
            const url = await firebase.storage().ref(`cards/${cardId}.jpg`).getDownloadURL();
            console.log(url);
            setImgURL(url);
          }
        } catch (error) {
          console.error(error);
          setImgURL("https://sportzor.com/images/ygo_cardback_sleeves19.jpg");
        }
        setFoundImage(true);
      }
      findImage();
      setRunComplete(true);
    }
  }, [cardId, imgURL, runComplete, verifyImgExists]);

  return <>{foundImage ? <Image src={imgURL} className="w-75" /> : <Loading />}</>;
}
