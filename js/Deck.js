class Deck {
  cards;
  cardsCopy;
  constructor(cards){
    this.cards = cards;
    this.cardsCopy = [].concat(this.cards);
  }

  fiveRandomCards(){
    let fiveRadnomCards = [];
    if(this.cards.length < 6){
      this.cards = [].concat(this.cardsCopy);
    }
    for (let i = 0; i < 5; i++) {
      let rand = Math.floor(Math.random()*this.cards.length);
      fiveRadnomCards.push(this.cards[rand]);
      this.cards.splice(rand, 1);
    }
    return fiveRadnomCards;
  }
}

let deck = new Deck(cardsAll);