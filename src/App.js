import React from "react";
import "./App.css";
import firebase from "./firebase";
import Input from "./Input";
function App() {
  const [cards, setCards] = React.useState([]);
  React.useEffect(() => {
    const fetchData = async () => {
      const db = firebase.firestore();
      const cardsSnapshot = await db.collection("cards").limit(25).get();
      const cache = {};
      cardsSnapshot.forEach((snap) => {
        const card = snap;
        cache[snap.id] = card.data();
      });
      setCards(cache);
    };
    fetchData();
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
