class algoliaCard {
  constructor(card) {
    this.objectID = card.id;
    this.name = card.name;
    this.description = card.desc;
    this.atk = card.atk;
    this.def = card.def;
    this.race = card.race;
    this.archetype = card.archetype;
    this.level = card.level;
    this.type = {}
    this.type.lvl0 = card.type.includes("Monster")? "Monster": card.type.split(" ")[0]
    if (this.type.lvl0 === "Monster") {
      if (card.type.includes("Fusion")) {
        this.type.lvl1 = "Monster > Extra Deck";
        this.type.lvl2 = "Monster > Extra Deck > Fusion";
      } else if (card.type.includes("Synchro")) {
        this.type.lvl1 = "Monster > Extra Deck";
        this.type.lvl2 = "Monster > Extra Deck > Synchro";
      } else if (card.type.includes("XYZ")) {
        this.type.lvl1 = "Monster > Extra Deck";
        this.type.lvl2 = "Monster > Extra Deck > XYZ";
      } else {
        this.type.lvl1 = "Monster > Main Deck";
        this.type.lvl2 = `Monster > Main Deck > ${card.type.substring(0, card.type.lastIndexOf(" "))}`;
      }
    }
    // this._tags = [card.type].filter((tag) => tag !== undefined);
    this.imageURLs = {
      full: `https://storage.googleapis.com/yugiohdb-app.appspot.com/cards/${card.id}.jpg`,
      thumbnail: `https://storage.googleapis.com/yugiohdb-app.appspot.com/card_thumbnails/${card.id}.jpg`,
    };
  }
}

module.exports = algoliaCard;
