class CardEngine {
  constructor() {
    this.player1 = null;
    this.player2 = null;
    this.deck = [];
    this.Player1Cards = [];
    this.Player2Cards = [];
    this.GroundCards = [];
    this.img = null;
    this.ResultEL = null;
    this.turn = true;
    this.cardNumPlayer1 = null;
    this.cardNumPlayer2 = null;
  }
  init = (e) => {
    this.player1 = document.querySelector(".player1Img");
    this.player2 = document.querySelector(".player2Img");
    this.img = document.querySelector(".card-img"); //line 21 in html
    this.ResultEL = document.querySelector(".theResult");
    this.player1.addEventListener("click", this.OnSetPlayer1Turn);
    this.player2.addEventListener("click", this.OnSetPlayer2Turn);
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
    if (this.turn !== true) {
      this.playMessage("it's not your turn");
      return;
    }
    this.shiftPlayerCardToGround(this.Player1Cards);
    this.turn = false;
  };
  OnSetPlayer2Turn = () => {
    if (this.turn !== false) {
      this.playMessage("it's not your turn");
      return;
    }
    this.shiftPlayerCardToGround(this.Player2Cards);
    this.turn = true;
  };
  shiftPlayerCardToGround = (PlayerCards) => {
    this.playMessage("");
    let lastPlayerCard = PlayerCards.pop();
    this.GroundCards.push(lastPlayerCard);
    this.showImg(lastPlayerCard);
    this.FillGround(lastPlayerCard, PlayerCards);
    this.ShowCardsCounts();
    this.CheckWin(PlayerCards);
  };

  showImg = (lastPlayerCard) => {
    this.img.src = `./img/${lastPlayerCard.type}${lastPlayerCard.number}.png`;
  };

  FillGround = (lastPlayerCard, PlayerCards) => {
    if (this.GroundCards.length == 1) {
      return;
    }
    let lastCard = this.GroundCards[this.GroundCards.length - 2];
    console.log("x");
    if (lastCard.number === lastPlayerCard.number) {
      PlayerCards = PlayerCards.concat(this.GroundCards);
      this.GroundCards = [];
      this.img.src = `./img/x.png`;
    }
  };

  ShowCardsCounts = () => {
    this.cardNumPlayer1 = document.querySelector(".cardNumPlayer1");
    this.cardNumPlayer2 = document.querySelector(".cardNumPlayer2");
    this.cardNumPlayer1.innerHTML = this.Player1Cards.length;
    this.cardNumPlayer2.innerHTML = this.Player2Cards.length;
  };
  CheckWin = (PlayerCards) => {
    if (PlayerCards.length > 1) {
      return;
    }
    this.singForWinner();
    this.disable();
    let replayBtn = document.getElementsByClassName("replayBtn");
    replayBtn.addEventListener("click", this.replayTheGame);
  };
  singForWinner = () => {
    this.playMessage(" مليون مبروك ");
    let myAudioElement = new Audio("./win.mp3");
    myAudioElement.addEventListener("canplaythrough", (e) => {
      myAudioElement.play();
    });
  };
  disable = () => {
    this.player1.removeEventListener("click", this.OnSetPlayer1Turn);
    this.player2.removeEventListener("click", this.OnSetPlayer2Turn);
  };
  replayTheGame = () => {
    this.img.src = `./img/x.png`;
    this.playMessage("");
    this.cardNumPlayer1.innerHTML = 26;
    this.cardNumPlayer2.innerHTML = 26;
    this.player1 = null;
    this.player2 = null;
    this.deck = [];
    this.Player1Cards = [];
    this.Player2Cards = [];
    this.GroundCards = [];
    this.img = null;
    this.ResultEL = null;
    this.turn = true;
  };
  playMessage = (massage) => {
    this.ResultEL.innerHTML = massage;
  };
} //CardEngine End
let card = new CardEngine();
let onDocumentReady = (CB) => {
  document.addEventListener("DOMContentLoaded", CB);
}; //end
onDocumentReady(card.init());
