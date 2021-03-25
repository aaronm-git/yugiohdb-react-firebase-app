const cardsDump = require("../other/allcards.json").data;
const algoliaCard = require("./card");

const algoliasearch = require("algoliasearch");
const algoliaAdminKey = "";
const algoliaAppId = "A5JPX9U9RD";
const algoliaIndexName = "cards";

const algoliaClient = algoliasearch(algoliaAppId, algoliaAdminKey);
const algoliaIndex = algoliaClient.initIndex(algoliaIndexName);

const cards = [];
cardsDump.forEach((card) => {
  const algoliaCardObject = new algoliaCard(card);
  cards.push(algoliaCardObject);
});
console.log(cards.find((card) => card.objectID === 55794644));
// const jsonObj = ;
// const jsonContent = JSON.stringify(data);
// fs.writeFile("cards.json", jsonContent, "utf8", (err) => {
//   if (err) {
//     console.log("An error occured while writing JSON Object to File.");
//     return console.log(err);
//   }
// });

algoliaIndex
  .saveObjects(cards)
  .then(() => console.log("complete!"))
  .catch((error) => console.error(error));
