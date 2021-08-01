class CardEngine {
  constructor() {
    this.deck = [];
    this.Player1Cards = [];
    this.Player2Cards = [];
    this.GroundCards = [];
    this.Result = null;
    this.turn1 = true;
    this.turn2 = true;
  }
  init = (e) => {
    let player1 = document.querySelector(".player1Img");
    let player2 = document.querySelector(".player2Img");
    this.Result = document.querySelector(".theResult");
    player1.addEventListener("click", this.OnSetPlayer1Turn);
    player2.addEventListener("click", this.OnSetPlayer2Turn);
    card.BuildDeck();
    card.ShuffleDeck();
    card.Deal();
  };

  BuildDeck = () => {
    // debugger
    let cardTypes = ["heart", "spades", "diamonds", "club"];
    for (let i = 0; i < 4; i++) {
      for (let j = 1; j <= 13; j++) {
        let card = {
          type: cardTypes[i],
          number: j,
        };
        this.deck.push(card);
      } //2for
    } //1for
  }; //BuildDeck End

  ShuffleDeck = () => {
    for (let i = 0; i < this.deck.length; i++) {
      let randomNumber = Math.floor(Math.random() * 52);
      let Deck = this.deck[i];
      this.deck[i] = this.deck[randomNumber];
      this.deck[randomNumber] = Deck;
    }
  };
  Deal = () => {
    this.Player1Cards = this.deck.slice(0, this.deck.length / 2);
    this.Player2Cards = this.deck.slice(this.deck.length / 2);
  };
  OnSetPlayer1Turn = () => {
    if (!this.turn1) {
      this.Result.innerHTML = "it's not your turn";
      return;
    }
    this.turn2 = true;
    this.turn1 = false;
    this.Result.innerHTML = "";
    this.shiftPlayer1CardToGround();
  };
  shiftPlayer1CardToGround = () => {
    let lastCardPlayer1 = this.Player1Cards.pop();
    this.GroundCards.push(lastCardPlayer1);
    this.showImg(this.Player1Cards);
    this.FillGround(this.Player1Cards);
    this.CountCardsNumber();
    this.CheckWin();
  };
  OnSetPlayer2Turn = () => {
    if (!this.turn2) {
      this.Result.innerHTML = "it's not your turn";
      return;
    }
    this.turn1 = true;
    this.turn2 = false;
    this.Result.innerHTML = "";
    this.shiftPlayer2CardToGround();
  };
  shiftPlayer2CardToGround = () => {
    let lastCardPlayer2 = this.Player2Cards.pop();
    this.GroundCards.push(lastCardPlayer2);
    this.showImg(this.Player2Cards);
    this.FillGround(this.Player2Cards);
    this.CountCardsNumber();
    this.CheckWin();
  };
  showImg = (PlayerCards) => {
    console.log(PlayerCards);
    let img = document.querySelector(".card-img"); //line 21 in html
    img.classList.add("displayCard");
    let PlayerCard = PlayerCards.pop();
    img.src = `./img/${PlayerCard.type}${PlayerCard.number}.png`;
  };
  FillGround = (PlayerCards) => {
    let PlayerCard = PlayerCards.pop();

    if (this.GroundCards.length > 1) {
      let lastCard = this.GroundCards[this.GroundCards.length - 2];

      if (lastCard.number === PlayerCard.number) {
        this.Player1Cards = this.Player1Cards.concat(this.GroundCards);
        this.GroundCards = [];
      } else if (lastCard.number === PlayerCard.number) {
        this.Player2Cards = this.Player2Cards.concat(this.GroundCards);
        this.GroundCards = [];
      }
    }
  };
  CountCardsNumber = () => {
    let cardNumPlayer1 = document.querySelector(".cardNumPlayer1");
    let cardNumPlayer2 = document.querySelector(".cardNumPlayer2");
    cardNumPlayer1.innerHTML = this.Player1Cards.length;
    cardNumPlayer2.innerHTML = this.Player2Cards.length;
  };
  CheckWin = () => {
    if (this.Player1Cards.length < 1 || this.Player2Cards.length < 1) {
      this.Result.innerHTML = " مليون مبروك ";
      let myAudioElement = new Audio("./win.mp3");
      myAudioElement.addEventListener("canplaythrough", (e) => {
        myAudioElement.play();
      });
    }
  };
} //CardEngine End
let card = new CardEngine();
let onDocumentReady = (CB) => {
  document.addEventListener("DOMContentLoaded", CB);
}; //end
onDocumentReady(card.init());
