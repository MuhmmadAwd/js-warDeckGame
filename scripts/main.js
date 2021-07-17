class CardEngine {
  constructor() {
    this.deck = [];
    this.img = [];
    this.cardTypes = ["heart", "spades", "diamonds", "club"];
    this.Player1Cards = [];
    this.Player2Cards = [];
    this.GroundCards = [];
    this.Result = "";
    this.turn1 = true;
    this.turn2 = true;
  }
  init = (e) => {
    let player1 = document.querySelector(".player1Img");
    let player2 = document.querySelector(".player2Img");
    this.Result = document.querySelector(".theResult");

    player1.addEventListener("click", this.OnMove1ToGround);
    player2.addEventListener("click", this.OnMove2ToGround);
    card.addImgs();
    card.BuildDeck();
    card.ShuffleDeck();
    card.Deal();
    card.showCards();
    card.CheckWin();
  };
  addImgs = () => {
    let imgs = document.querySelector(".img-all");
    let cardTypeSymbol = ["H", "S", "D", "C"];
    for (let i = 0; i < 4; i++) {
      for (let j = 1; j <= 13; j++) {
        this.img += `
        <img width="0" src="./img/${j}${cardTypeSymbol[i]}.png" 
        class="image-${j}${cardTypeSymbol[i]} " data-num="${j}"
        data-type="${this.cardTypes[i]}" />
        `;
      }
    }
    imgs.innerHTML = this.img;
  };
  BuildDeck = () => {
    for (let i = 0; i < 4; i++) {
      for (let j = 1; j <= 13; j++) {
        this.img = document.querySelector(
          `img[data-num='${j}'][data-type='${this.cardTypes[i]}']`
        );
        let card = {
          type: this.img.dataset.type,
          number: Number(this.img.dataset.num),
          img: this.img,
        };
        this.deck.push(card);
      }
    } //1for
    console.table(this.deck);
  }; //BuildDeck End

  ShuffleDeck = () => {
    for (let i = 0; i < this.deck.length; i++) {
      let randNum = Math.floor(Math.random() * 48);
      let Deck = this.deck[i];
      this.deck[i] = this.deck[randNum];
      this.deck[randNum] = Deck;
    }
  };
  Deal = () => {
    this.Player1Cards = this.deck.slice(0, this.deck.length / 2);
    this.Player2Cards = this.deck.slice(this.deck.length / 2);
  };
  showCards = () => {
    this.Player1Cards.map((p1) => {
      p1.img.classList.add("p1-img");
    });
    this.Player2Cards.map((p2) => {
      p2.img.classList.add("p2-img");
    });
  };
  OnMove1ToGround = () => {
    // debugger;
    if (!this.turn1) {
      this.Result.innerHTML = "it's not your turn";
      return;
    }
    let ground = document.querySelector(".GroundSection");
    this.turn2 = true;
    this.Result.innerHTML = "";
    let lastCardP1 = this.Player1Cards.pop();
    let lastCardP2 = null;
    this.GroundCards.push(lastCardP1);
    ground.appendChild(lastCardP1.img);
    lastCardP1.img.classList.add("displayCard1");
    this.compareAndFillGround(lastCardP1, lastCardP2);
  };

  OnMove2ToGround = () => {
    // debugger;
    if (!this.turn2) {
      this.Result.innerHTML = "it's not your turn";
      return;
    }
    let ground = document.querySelector(".GroundSection");
    this.turn1 = true;
    this.Result.innerHTML = "";
    let lastCardP1 = null;
    let lastCardP2 = this.Player2Cards.pop();
    this.GroundCards.push(lastCardP2);
    ground.appendChild(lastCardP2.img);
    lastCardP2.img.classList.add("displayCard2");
    this.compareAndFillGround(lastCardP1, lastCardP2);
  };
  compareAndFillGround = (lastCardP1, lastCardP2) => {
    if (lastCardP1 !== null) {
      this.turn1 = false;
    } else if (lastCardP2 !== null) {
      this.turn2 = false;
    }

    if (this.GroundCards.length > 1) {
      let lastCard = this.GroundCards[this.GroundCards.length - 2];
      if (lastCardP1 !== null && lastCard.number === lastCardP1.number) {
        this.Player1Cards = this.Player1Cards.concat(this.GroundCards);
        this.GroundCards = [];
      } else if (lastCardP2 !== null && lastCard.number === lastCardP2.number) {
        this.Player2Cards = this.Player2Cards.concat(this.GroundCards);
        this.GroundCards = [];
      }
    }
    this.CardsNumber();
  };
  CardsNumber = () => {
    let cardNumP1 = document.querySelector(".cardNumP1");
    let cardNumP2 = document.querySelector(".cardNumP2");
    cardNumP1.innerHTML = this.Player1Cards.length;
    cardNumP2.innerHTML = this.Player2Cards.length;
  };
  CheckWin = () => {
    if (this.Player1Cards.length < 1) {
      this.Result.innerHTML = "Player2 مليون مبروك يا ";
      let myAudioElement = new Audio("./win.mp3");
      myAudioElement.addEventListener("canplaythrough", (e) => {
        myAudioElement.play();
      });
    } else if (this.Player2Cards.length < 1) {
      this.Result.innerHTML = "Player1 مليون مبروك يا ";
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
