class CardEngine {
  constructor(deck, Player1Cards, Player2Cards, GroundCards) {
    this.deck = [];
    this.Player1Cards = [];
    this.Player2Cards = [];
    this.GroundCards = [];
  }

  BuildDeck = () => {
    for (let index = 0; index < 4; index++) {
      for (let i = 0; i < 13; i++) {
        let dkLength = this.deck.length;
        let deckCard = { type: "", number: i + 1 };
        if (dkLength <= 12) {
          deckCard.type = "heart";
        } else if (dkLength > 12 && dkLength <= 25) {
          deckCard.type = "spades";
        } else if (dkLength > 25 && dkLength <= 39) {
          deckCard.type = "diamonds";
        } else if (dkLength > 39 && dkLength <= 53) {
          deckCard.type = "club";
        }
        this.deck.push(deckCard);
      }
    }
  };
  ShuffleDeck = () => {
    for (let num of this.deck) {
      num.number = Math.floor(Math.random() * 13.8);
      return num;
    }
  };
  Deal = () => {
    this.Player1Cards = this.deck.slice(0, 26);
    this.Player2Cards = this.deck.slice(26);
  };
  let player1 = document.querySelector(".player1Section");
  this.Player1Cards.map((p1) => {
    let cardEle = document.createElement("div");
    cardEle.classList.add("Player1Card");
    let topNumEle = document.createElement("p");
    topNumEle.innerHTML = p1.number;
    topNumEle.classList.add("cardTopNumber");
    cardEle.appendChild(topNumEle);
    let TypeEle = document.createElement("p");
    TypeEle.innerHTML = p1.type;
    TypeEle.classList.add("cardType");
    cardEle.appendChild(TypeEle);
    let downNumEle = document.createElement("p");
    downNumEle.innerHTML = p1.number;
    downNumEle.classList.add("cardDownNumber");
    cardEle.appendChild(downNumEle);
    player1.appendChild(cardEle);
  });
  let p1LastChild = player1.lastChild;
  p1LastChild.classList.add("displayLast");
Draw=()=>{}
  let player2 = document.querySelector(".player2Section");
  this.Player2Cards.map((p2) => {
    let cardEle = document.createElement("div");
    cardEle.classList.add("Player2Card");
    let topNumEle = document.createElement("p");
    topNumEle.innerHTML = p2.number;
    topNumEle.classList.add("cardTopNumber");
    cardEle.appendChild(topNumEle);
    let TypeEle = document.createElement("p");
    TypeEle.innerHTML = p2.type;
    TypeEle.classList.add("cardType");
    cardEle.appendChild(TypeEle);
    let downNumEle = document.createElement("p");
    downNumEle.innerHTML = p2.number;
    downNumEle.classList.add("cardDownNumber");
    cardEle.appendChild(downNumEle);
    player2.appendChild(cardEle);
  });
  let p2LastChild = player2.lastChild;
  p2LastChild.classList.add("displayLast");
}
let card1 = new CardEngine();

card1.BuildDeck();
card1.ShuffleDeck();
card1.Deal();
let onDocumentReady = (CB) => {
  document.addEventListener("DOMContentLoaded", CB);
};
onDocumentReady(card1.Draw);











Deal = () => {
    console.log(this.deck);
    this.Player1Cards = this.deck.slice(0, 25);
    this.Player2Cards = this.deck.slice(26);
    console.log(this.Player1Cards, this.Player2Cards);
  };


  for (let num of this.deck) {
    num.number = Math.floor(Math.random() * num.number);
    this.deck = num;
    return this.deck
  }
  console.log(this.deck);
};