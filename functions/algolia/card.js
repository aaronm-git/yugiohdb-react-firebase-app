class algoliaCard {
  constructor(card) {
    this.objectID = card.id;
    this.name = card.name;
    this.description = card.desc;
    this.atk = card.atk;
    this.def = card.def;
    this.race = card.race;
    this.archetype = card.archetype;
    this._tags = [card.type].filter((tag) => tag !== undefined);
    this.imageURLs = {
      full: `https://storage.googleapis.com/yugiohdb-app.appspot.com/cards/${card.id}.jpg`,
      thumbnail: `https://storage.googleapis.com/yugiohdb-app.appspot.com/card_thumbnails/${card.id}.jpg`,
    };
  }
}

module.exports = algoliaCard;
