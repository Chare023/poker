class Wins {
  finalCards;
  constructor(finalCards){
    this.finalCards = finalCards;
  }

  isRoyalFlush(arrSign, sortedCards, allCardsValues){
    let firstIndexOfAllCards = allCardsValues.slice(9);
    if (Object.keys(arrSign).length === 1) {
      for (let i = 0; i < sortedCards.length; i++) {
        if(sortedCards[i] !== firstIndexOfAllCards[i]){
          return false;
        }
      }
      console.log('Royal Flush');
    }
  }

  isStraightFlush(arrSign, sortedCards, allCardsValues){
    let firstCard = sortedCards[0];
    let firstIndexOfAllCards = allCardsValues.slice(firstCard - 1, firstCard + 4);
    if (Object.keys(arrSign).length === 1) {
      for (let i = 0; i < sortedCards.length; i++) {
        if(sortedCards[i] !== firstIndexOfAllCards[i]){
          return false;
        }
      }
      console.log('Straight Flush');
    }
  }

  isFourOfAKind(arrValue){
    if (Object.values(arrValue).filter(e => e === 4).length === 1) {
      console.log('Four Of A Kind');
    } else {
      return false;
    }
  }

  isFullHouse(arrValue){
    if (Object.values(arrValue).filter(e => e === 3).length === 1 &&
        Object.values(arrValue).filter(e => e === 2).length === 1) {
      return console.log('Full House');
    } else {
      return false;
    }
  }

  isFlush(arrSign){
    if(Object.keys(arrSign).length === 1){
      return console.log("Flush");
    } else {
      return false;
    }
  }

  isStraight(sortedCards, allCardsValues){
    let firstCard = sortedCards[0];
    let firstIndexOfAllCards = allCardsValues.slice(firstCard - 1, firstCard + 4);
    for (let i = 0; i < sortedCards.length; i++) {
      if(sortedCards[i] !== firstIndexOfAllCards[i]){
        return false;
      }
    }
    console.log('Straight');
  }
  
  isThreeOfAKind(arrValue){
    if (Object.values(arrValue).filter(e => e === 3).length === 1 &&
        Object.values(arrValue).length === 3) {
      console.log('Three Of A Kind');
    } else {
      return false;
    }
  }

  isTwoPair(arrValue){
    if (Object.values(arrValue).filter(e => e === 2).length === 2) {
      console.log('Two Pair');
    } else {
      return false;
    }
  }

  isOnePair(arrValue){
    if(Object.values(arrValue).length === 4){
      Object.entries(arrValue).forEach(([key,value])=>{
        if(key.length > 2 && value === 2){
          console.log('Pair');
        }
      })
    } else{
      return false;
    }
  }
  
  getWin(){
    let arrSign = [];
    let arrVal = [];
    let unsortedCards = [];
    let sortedCards = [];
    let allCardsValues = [1,2,3,4,5,6,7,8,9,10,11,12,13,14];
    this.finalCards.forEach(card => {
      arrSign[card.sign] = (arrSign[card.sign]|| 0) + 1;
      arrVal[card.value] = (arrVal[card.value]|| 0) + 1;
      unsortedCards.push(card.value);
    });

    unsortedCards.forEach((card)=>{
      switch (card) {
        case 'ace':
          if (unsortedCards.includes('king') || 
              unsortedCards.includes('queen') || 
              unsortedCards.includes('jack')) {
            sortedCards.push(11);
          } else {
            sortedCards.push(1);
          }
          break;
        case 'jack':
          sortedCards.push(12);
          break;
        case 'queen':
          sortedCards.push(13);
          break;
        case 'king':
          sortedCards.push(14);
          break;
        default:
          sortedCards.push(card);
          break;
        }
      })
    
    sortedCards.sort((a,b)=>{  
      return a-b;
    });
    arrSign.sort();
    arrVal.sort();

    this.isRoyalFlush(arrSign, sortedCards, allCardsValues);
    this.isStraightFlush(arrSign, sortedCards, allCardsValues);
    this.isFourOfAKind(arrVal);
    this.isFullHouse(arrVal);
    this.isFlush(arrSign);
    this.isStraight(sortedCards, allCardsValues);
    this.isThreeOfAKind(arrVal);
    this.isTwoPair(arrVal);
    this.isOnePair(arrVal);
  }
}
