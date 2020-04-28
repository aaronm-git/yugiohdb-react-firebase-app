import React from "react";
import "./App.css";
import firebase from "./firebase";
import Input from "./Input";
function App() {
  const [cards, setCards] = React.useState({});
  React.useEffect(() => {
    const db = firebase.firestore();
    return db
      .collection("cards")
      .limit(10)
      .onSnapshot((snapshot) => {
        console.log("Updating");
        const cache = {};
        snapshot.forEach((doc) => (cache[doc.id] = doc.data()));
        setCards(cache);
      });
  }, []);
  return (
    <ul>
      {Object.keys(cards).map((key, index) => (
        <li key={key}>
          <Input card={cards[key]} id={key} />
        </li>
      ))}
    </ul>
  );
}

export default App;
