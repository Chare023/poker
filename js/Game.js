class Game {
  constructor(){
    this.btn = document.querySelector('button');
    this.cards = document.querySelectorAll('.img-holder');
    this.cardIndex = 0;
    this.randomFiveCards = [];
    this.round = 0;
    this.finalCards = [];
  }
  
  init(){
    this.btn.addEventListener('click', ()=> this.flip());
  }

  flip(){
    (this.round === 1) ? this.round = 2 : this.round = 1;
    if(this.round === 1){
      this.removeAllSelected();
    }
    if (this.round === 2) {
      setTimeout(()=>{
     let win = new Wins(this.finalCards);
     win.getWin();

      }, 1000);
    }
    this.btn.innerHTML = "Start "+ this.round;
    this.cardIndex = 0;
    this.turnOnBack();
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
