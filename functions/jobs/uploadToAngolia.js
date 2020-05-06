const admin = require("firebase-admin");
const serviceAccount = require("../serviceAccountKey.json");
const cards = require("../../dump/allcards.min.json").data;

const fs = require("fs");

const algoliasearch = require("algoliasearch");
const algoliaAdminKey = "2e7f4469d8f24ff617ac7ecd5d107e66";
const algoliaAppId = "A5JPX9U9RD";
const algoliaIndexName = "cards";

const algoliaClient = algoliasearch(algoliaAppId, algoliaAdminKey);
const algoliaIndex = algoliaClient.initIndex(algoliaIndexName);

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://yugiohdb-app.firebaseio.com",
});

const firestore = admin.firestore();

class algoliaCardItem {
  constructor(card) {
    this.objectID = card.id;
    this.name = card.name;
    this.description = card.desc;
    this.atk = card.atk;
    this.def = card.def;
    this._tags = [card.type, card.race, card.archetype].filter((tag) => tag !== undefined);
    this.imageURLs = {
      full: `https://storage.googleapis.com/yugiohdb-app.appspot.com/cards/${card.id}.jpg`,
      thumbnail: `https://storage.googleapis.com/yugiohdb-app.appspot.com/card_thumbnails/${card.id}.jpg`,
    };
  }
}

const sendToAlgoliaIndex = () => {
  const data = [];
  cards.forEach((c) => {
    card = new algoliaCardItem(c);
    data.push(card);
  });
  // const jsonObj = ;
  const jsonContent = JSON.stringify(data);
  fs.writeFile("cards.json", jsonContent, "utf8", (err) => {
    if (err) {
      console.log("An error occured while writing JSON Object to File.");
      return console.log(err);
    }
  });
  // algoliaIndex
  //   .saveObject(algoliaCardCollection)
  //   .then(() => console.log("complete!"))
  //   .catch((error) => console.error(error));
};
sendToAlgoliaIndex();
