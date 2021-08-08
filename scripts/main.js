class CardEngine {
  constructor() {
    this.player1EL = null;
    this.player2EL = null;
    this.deck = [];
    this.Player1Cards = [];
    this.Player2Cards = [];
    this.GroundCards = [];
    this.imgEL = null;
    this.ResultEL = null;
    this.turn = true;
    this.cardNumPlayer1EL = null;
    this.cardNumPlayer2EL = null;
  }
  init = (e) => {
    this.player1EL = document.querySelector(".player1Img");
    this.player2EL = document.querySelector(".player2Img");
    this.imgEL = document.querySelector(".card-img"); //line 21 in html
    this.ResultEL = document.querySelector(".theResult");
    this.cardNumPlayer1EL = document.querySelector(".cardNumPlayer1");
    this.cardNumPlayer2EL = document.querySelector(".cardNumPlayer2");
    let replayBtn = document.querySelector(".replayBtn");
    replayBtn.addEventListener("click", this.replayTheGame);
    this.player1EL.addEventListener("click", this.OnSetPlayer1Turn);
    this.player2EL.addEventListener("click", this.OnSetPlayer2Turn);
    this.BuildDeck();
    this.ShuffleDeck();
    this.Deal();
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
      this.displayMessage("it's not your turn");
      return;
    }
    this.shiftPlayerCardToGround(this.Player1Cards);
    this.turn = false;
  };
  OnSetPlayer2Turn = () => {
    if (this.turn !== false) {
      this.displayMessage("it's not your turn");
      return;
    }
    this.shiftPlayerCardToGround(this.Player2Cards);
    this.turn = true;
  };
  shiftPlayerCardToGround = (PlayerCards) => {
    this.displayMessage("");
    let lastPlayerCard = PlayerCards.pop();
    this.GroundCards.push(lastPlayerCard);
    this.showImg(lastPlayerCard);
    this.FillGround(lastPlayerCard, PlayerCards);
    this.ShowCardsCounts();
    this.CheckWin(PlayerCards);
  };

  showImg = (lastPlayerCard) => {
    this.imgEL.src = `./img/${lastPlayerCard.type}${lastPlayerCard.number}.png`;
  };

  FillGround = (lastPlayerCard, PlayerCards) => {
    if (this.GroundCards.length == 1) {
      return;
    }
    let lastCard = this.GroundCards[this.GroundCards.length - 2];
    if (lastCard.number === lastPlayerCard.number) {
      PlayerCards = PlayerCards.concat(this.GroundCards);
      this.GroundCards = [];
      this.imgEL.src = `./img/x.png`;
      return PlayerCards;
    }
  };

  ShowCardsCounts = () => {
    this.cardNumPlayer1EL.innerHTML = this.Player1Cards.length;
    this.cardNumPlayer2EL.innerHTML = this.Player2Cards.length;
  };
  CheckWin = (PlayerCards) => {
    if (PlayerCards.length > 20) {
      return;
    }
    this.singForWinner();
    this.disable();
  };
  singForWinner = () => {
    this.displayMessage(" مليون مبروك ");
    let myAudioElement = new Audio("./win.mp3");
    myAudioElement.addEventListener("canplaythrough", this.onPlayAudio);
  };
  onPlayAudio = () => {
    myAudioElement.play();
  };
  disable = () => {
    this.player1EL.removeEventListener("click", this.OnSetPlayer1Turn);
    this.player2EL.removeEventListener("click", this.OnSetPlayer2Turn);
  };
  replayTheGame = () => {
    this.imgEL.src = `./img/x.png`;
    this.displayMessage("");
    this.deck = [];
    this.player1EL.addEventListener("click", this.OnSetPlayer1Turn);
    this.player2EL.addEventListener("click", this.OnSetPlayer2Turn);
    this.BuildDeck();
    this.ShuffleDeck();
    this.Deal();
  };
  displayMessage = (massage) => {
    this.ResultEL.innerHTML = massage;
  };
} //CardEngine End
let card = new CardEngine();
let onDocumentReady = (CB) => {
  document.addEventListener("DOMContentLoaded", CB);
}; //end
onDocumentReady(card.init());
