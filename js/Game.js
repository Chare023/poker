class Game {
  constructor(){
    this.btn = document.querySelector('.deal');
    this.cards = document.querySelectorAll('.img-holder');
    this.cardIndex = 0;
    this.randomFiveCards = [];
    this.round = 0;
    this.finalCards = [];
    this.bet = 10;                
    this.credit = 10;
    this.creditValue = document.querySelector('.credit__value');
    this.addCreditBtn = document.querySelector('.credit__add');
    this.betValue = document.querySelector('.bet__value'); 
    this.raiseBet = document.querySelector('.bet__add');
    this.win = document.querySelector('.win_cont');            // TODO treba namestiti dinamicki
  }

  init(){
    this.addCreditBtn.addEventListener('click', () => {
      if (document.querySelector('.deal').textContent !== 'Deal') {
        this.addCredit();
      }
    })
    this.btn.addEventListener('click', ()=> this.flip());
    this.raiseBet.addEventListener('click', ()=> this.riseBet());
    this.creditValue.innerHTML = this.credit;
    this.betValue.innerHTML = this.bet;
  }

  riseBet(){
    if (this.bet < 100) {
      this.bet += 5;
      this.betValue.innerHTML = this.bet;
    } else {
      this.bet = 5;
      this.betValue.innerHTML = this.bet;
    }
  }

  addCredit() {
    this.credit +=10;
    this.creditValue.innerHTML = this.credit;
  }

  flip(){
    if (this.credit >= 0 && this.credit - this.bet > -1){
      this.win.innerHTML = '';
      this.win.classList.remove('win');
      (this.round === 1) ? this.round = 2 : this.round = 1;
      if(this.round === 1){
        this.removeAllSelected();
        this.credit = this.credit - this.bet;
        this.creditValue.innerHTML = this.credit;
        
      }
      if (this.round === 2) {
        setTimeout(()=>{
        let win = new Wins(this.finalCards, this.bet, this.credit);
        win.getWin();
  
        this.creditValue.innerHTML = this.credit;
        setInterval(()=> {
          // console.log('nestooooo');
        },1000)
        }, 1000);
      }
      this.btn.innerHTML = "Deal";
      this.cardIndex = 0;
      this.turnOnBack();
    } else{
      alert('You do not have enough credit, please pay more to continue ');
    }
  }

  removeAllSelected(){
    document.querySelectorAll('.selected').forEach(div=> {
      div.classList.remove('selected');
    })
  }

  turnOnBack() {
    this.cards.forEach(card => {
      let front = card.querySelector('.front:not(.selected)');
      let back = card.children[1];
      if (front) {
        front.style.transform = "perspective(900px) rotateY(180deg)";
        back.style.transform = "perspective(900px) rotateY(0)";
        
      }
    })
    setTimeout(()=>{
      this.shuffleCards();
      this.reveal();
    }, 100)
  }

  reveal(){
    let cardFront = this.cards[this.cardIndex].querySelector('.front:not(.selected)');
    let cardBack = this.cards[this.cardIndex].querySelector('.back');
    if (cardFront) {
      this.finalCards[this.cardIndex] = this.randomFiveCards[this.cardIndex];
      cardFront.children[0].setAttribute('src', this.getImage());
      cardFront.onclick = ()=>{
        cardFront.classList.toggle('selected');

    }
    setTimeout(()=>{
      cardBack.style.transform = "perspective(900px) rotateY(180deg)";
      cardFront.style.transform = "perspective(900px) rotateY(0)";
      this.cardIndex++;
      if(this.cardIndex < this.cards.length){
        this.reveal();
      }
    },100)
    }else {
      this.cardIndex++;
      if(this.cardIndex < this.cards.length){
        this.reveal();
      }
    }
  }

  getImage(){
    return "img/"+this.randomFiveCards[this.cardIndex].sign+"_"+
    this.randomFiveCards[this.cardIndex].value+".png";
  }

  shuffleCards(){
    this.randomFiveCards = deck.fiveRandomCards();
  }
} 

let game = new Game();
game.init();
