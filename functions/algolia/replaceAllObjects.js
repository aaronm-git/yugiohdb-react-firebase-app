require('dotenv').config({ path: '.env.local' });
const cards = require("../other/allcards.json").data;
const AlgoliaCardItem = require("./card");
const algoliasearch = require("algoliasearch");
const algoliaAppId = "A5JPX9U9RD";
const algoliaIndexName = "cards";
const algoliaAdminKey = process.env.ALGOLIA_ADMIN_KEY;

console.log(process.env.ALGOLIA_ADMIN_KEY);
return;
{
const algoliaClient = algoliasearch(algoliaAppId, algoliaAdminKey);
const index = algoliaClient.initIndex(algoliaIndexName);

// class AlgoliaCardItem {
//   constructor(card) {
//     this.objectID = card.id;
//     this.name = card.name;
//     this.description = card.desc;
//     this.atk = card.atk;
//     this.def = card.def;
//     this._tags = [card.type, card.race, card.archetype].filter((tag) => tag !== undefined);
//     this.imageURLs = {
//       full: `https://storage.googleapis.com/yugiohdb-app.appspot.com/cards/${card.id}.jpg`,
//       thumbnail: `https://storage.goo gleapis.com/yugiohdb-app.appspot.com/card_thumbnails/${card.id}.jpg`,
//     };
//   }
// }

const algoliaObjects = [];
cards.forEach((card) => {
  algoliaObject = new AlgoliaCardItem(card);
  algoliaObjects.push(algoliaObject);
});
// const dataJSON = JSON.stringify(algoliaObjects);
//   fs.writeFile("cards.json", jsonContent, "utf8", (err) => {
//     if (err) {
//       console.log("An error occured while writing JSON Object to File.");
//       return console.log(err);
//     }
//   });
index
  .replaceAllObjects(algoliaObjects, { safe: true })
  .then(() => console.log("complete!"))
  .catch((error) => console.error(error));
}