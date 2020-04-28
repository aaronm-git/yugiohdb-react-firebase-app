import React from "react";
import firebase from "./firebase";

function Input({ card, id }) {
  const [name, setName] = React.useState(card.name);
  React.useEffect(() => {
    setName(card.name);
  }, [card.name]);
  const onUpdate = () => {
    const db = firebase.firestore();
    db.collection("cards")
      .doc(id)
      .set({ ...card, name });
  };
  return (
    <div>
      <input value={name} onChange={(e) => setName(e.target.value)} />
      <button onClick={onUpdate}>Update</button>
    </div>
  );
}

export default Input;
