class Gambling {
  display;
  constructor(bet, winn){
    this.winn = winn;
    this.bet = bet;
    this.display = document.querySelector('.card-holder');
  }

  getOutcome(){
    // this.display.style.visibility = "hidden";
  }


}

let gambling = new Gambling();

// gambling.init();