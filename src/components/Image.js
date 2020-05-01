import React from "react";
import firebase from "../firebase";

export default function Image({ cardId }) {
  const storage = firebase.storage();
  (async () => {
    // const cardsRef = storage.child("cards");
    // console.log(cardsRef);
  })();

  return <div></div>;
}
