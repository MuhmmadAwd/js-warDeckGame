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
    this.disable = false;
  }
  init = () => {
    this.imgEL = document.querySelector(".card-img"); //line 21 in html
    this.ResultEL = document.querySelector(".theResult");
    this.player1EL = document.querySelector(".player1Img");
    this.player2EL = document.querySelector(".player2Img");
    this.player1EL.addEventListener("click", this.OnSetPlayer1Turn);
    this.player2EL.addEventListener("click", this.OnSetPlayer2Turn);
    let replayEL = document.querySelector(".replayBtn");
    replayEL.addEventListener("click", this.replayTheGame);
    this.BuildDeck();
    this.ShuffleDeck();
    this.Deal();
  };
  BuildDeck = () => {
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
    this.Player1Cards = [];
    this.Player2Cards = [];
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
    if (this.disable) {
      return;
    }
    this.displayMessage("");
    let lastPlayerCard = PlayerCards.pop();
    this.GroundCards.push(lastPlayerCard);
    this.showImg(lastPlayerCard);
    this.checkPlayerCardAndEmptyGround(lastPlayerCard, PlayerCards);
    this.ShowCardsCounts();
    this.CheckWin(PlayerCards);
  };

  showImg = (lastPlayerCard) => {
    this.imgEL.src = `./img/${lastPlayerCard.type}${lastPlayerCard.number}.png`;
  };

  checkPlayerCardAndEmptyGround = (lastPlayerCard, PlayerCards) => {
    if (this.GroundCards.length == 1) {
      return;
    }
    let lastCard = this.GroundCards[this.GroundCards.length - 2];
    if (lastCard.number === lastPlayerCard.number) {
      PlayerCards = PlayerCards.concat(this.GroundCards);
      this.GroundCards = [];
      this.imgEL.src = `./img/x.png`;
    }
  };

  ShowCardsCounts = () => {
    let cardNumPlayer1EL = document.querySelector(".cardNumPlayer1");
    let cardNumPlayer2EL = document.querySelector(".cardNumPlayer2");
    cardNumPlayer1EL.innerHTML = this.Player1Cards.length;
    cardNumPlayer2EL.innerHTML = this.Player2Cards.length;
  };
  CheckWin = (PlayerCards) => {
    if (PlayerCards.length > 22) {
      return;
    }
    this.displayMessage(" مليون مبروك ");
    this.disable = true;
  };

  replayTheGame = () => {
    this.imgEL.src = `./img/x.png`;
    this.displayMessage("");
    this.disable = false;
    this.GroundCards = [];
    this.Deal();
    this.ShowCardsCounts();
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
