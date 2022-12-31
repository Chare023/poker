class Wins {
  finalCards;
  constructor(finalCards,bet, credit){
    this.finalCards = finalCards;
    this.bet = bet;
    this.credit = credit;
    this.win = document.querySelector('.win_cont');
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
      return true;
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
      return true;
    }
  }

  isFourOfAKind(arrValue){
    if (Object.values(arrValue).filter(e => e === 4).length === 1) {
      console.log('Four Of A Kind');
      return true;
    } else {
      return false;
    }
  }

  isFullHouse(arrValue){
    if (Object.values(arrValue).filter(e => e === 3).length === 1 &&
        Object.values(arrValue).filter(e => e === 2).length === 1) {
          console.log('Full House');
          return true;
    } else {
      return false;
    }
  }

  isFlush(arrSign){
    if(Object.keys(arrSign).length === 1){
      console.log("Flush");
      return true;
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
    return true;
  }
  
  isThreeOfAKind(arrValue){
    if (Object.values(arrValue).filter(e => e === 3).length === 1 &&
        Object.values(arrValue).length === 3) {
      console.log('Three Of A Kind');
      return true;
    } else {
      return false;
    }
  }

  isTwoPair(arrValue){
    if (Object.values(arrValue).filter(e => e === 2).length === 2) {
      console.log('Two Pair');
      return true;
    } else {
      return false;
    }
  }

  isOnePair(arrValue){
    let par = false;
    Object.entries(arrValue).forEach(([key,value])=>{
          if(key.length > 2 && value === 2){
            console.log('One Pair');
            par = true;
          }
        });
        return par;
  }
  
  getWin(){
    let arrSign = [];
    let arrVal = [];
    let unsortedCards = [];
    let sortedCards = [];
    let allCardsValues = [1,2,3,4,5,6,7,8,9,10,12,13,14,15];
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
            sortedCards.push(15);
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

    this.isRoyalFlush(arrSign, sortedCards, allCardsValues) ? this.calculateWin(this.bet, 250) :
    this.isStraightFlush(arrSign, sortedCards, allCardsValues) ? this.calculateWin(this.bet, 60) :
    this.isFourOfAKind(arrVal) ? this.calculateWin(this.bet, 35) :
    this.isFullHouse(arrVal) ? this.calculateWin(this.bet, 12) :
    this.isFlush(arrSign) ? this.calculateWin(this.bet, 8) :
    this.isStraight(sortedCards, allCardsValues) ? this.calculateWin(this.bet, 6) :
    this.isThreeOfAKind(arrVal) ? this.calculateWin(this.bet, 4) :
    this.isTwoPair(arrVal) ? this.calculateWin(this.bet, 3) :
    this.isOnePair(arrVal) ? this.calculateWin(this.bet, 2) :
    this.calculateWin(this.bet, 0);
  }

  calculateWin(bet,win){
    let winn = 0;
    if (win === 0) {
      // let winn = bet * win;
      return;
    } else {
      winn = bet * win;
      let gambling = confirm("double or not");
      if (gambling) {
        console.log("Ovde treba pozvati funkciju za kockanje");
        // Simulacija veca-manja
        if (confirm('veca')) {
          winn *= 2;
        } else {
          winn = 0;
        }
      } else {
      }
    }
    this.win.classList.add('win');
    this.win.innerHTML = 'You won ' + winn;
    game.credit = this.credit + winn;
  }
}
