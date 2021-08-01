class CardEngine {
  constructor() {
    this.deck = [];
    this.Player1Cards = [];
    this.Player2Cards = [];
    this.GroundCards = [];
    this.Result = null;
    this.turn = 1;
    this.lastPlayerCard = [];
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
    if (this.turn == 1) {
      this.Result.innerHTML = "";
      this.shiftPlayerCardToGround(this.Player1Cards);
      this.turn = 2;
      return;
    }
    this.Result.innerHTML = "it's not your turn";
  };
  OnSetPlayer2Turn = () => {
    if (this.turn == 2) {
      this.Result.innerHTML = "";
      this.shiftPlayerCardToGround(this.Player2Cards);
      this.turn = 1;
      return;
    }
    this.Result.innerHTML = "it's not your turn";
  };
  shiftPlayerCardToGround = (PlayerCards) => {
    this.lastPlayerCard = PlayerCards.pop();
    this.GroundCards.push(this.lastPlayerCard);
    this.showImg();
    this.FillGround(PlayerCards);
    this.CountCardsNumber();
    this.CheckWin();
    this.turn = true;
  };

  FillGround = (PlayerCards) => {
    if (this.GroundCards.length > 1) {
      let lastCard = this.GroundCards[this.GroundCards.length - 2];
      if (lastCard.number === this.lastPlayerCard.number) {
        this.Player1Cards = PlayerCards.concat(this.GroundCards);
        this.GroundCards = [];
      }
    }
  };
  showImg = () => {
    let img = document.querySelector(".card-img"); //line 21 in html
    img.classList.add("displayCard");
    img.src = `./img/${this.lastPlayerCard.type}${this.lastPlayerCard.number}.png`;
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
