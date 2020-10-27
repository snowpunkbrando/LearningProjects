// Blackjack game by Mark Zamoyta - PluralSight Course

// GLOBAL CARD VARIABLES
let suits = ["Hearts", "Clubs", "Diamonds", "Spades"];
let values = ["Ace", "King", "Queen", "Jack", "Ten",
              "Nine", "Eight", "Seven", "Six", "Five",
              "Four", "Three", "Two"];

// DOM VARIABLES
let textArea = document.getElementById("text-area");
let newGameButton = document.getElementById("new-game-button");
let hitButton = document.getElementById("hit-button");
let stayButton = document.getElementById("stay-button");

// GAME VARIABLES
let gameStarted = false;
    gameOver = false;
    playerWon = false;
    dealerCards = [];
    playerCards = [];
    dealerScore = 0;
    playerScore = 0;
    deck = [];

hitButton.style.display = "none";
stayButton.style.display = "none";
ShowStatus();

newGameButton.addEventListener("click", function() {
  gameStarted = true;
  gameOver = false;
  playerWon = false;

  deck = CreateDeck();
  ShuffleDeck(deck);
  dealerCards = [ GetNextCard(), GetNextCard() ];
  playerCards = [ GetNextCard(), GetNextCard() ];

  newGameButton.style.display = "none";
  hitButton.style.display = "inline";
  stayButton.style.display = "inline";
  ShowStatus();
});

  hitButton.addEventListener("click", function() {
    playerCards.push(GetNextCard());
    CheckForEndOfGame();
    ShowStatus();
  });

  stayButton.addEventListener("click", function() {
    gameOver = true;
    CheckForEndOfGame();
    ShowStatus();
  });

// CREATE THE DECK
function CreateDeck() {
  let deck = [];
  for (let suitIdx = 0; suitIdx < suits.length; suitIdx++) {
    for (let valueIdx = 0; valueIdx < values.length; valueIdx++) {
      let card = {
          suit: suits[suitIdx],
          value: values[valueIdx]
      };

      deck.push( card );
    }
  }
  return deck;
}
// SHUFFLE THE DECK
function ShuffleDeck(deck) {
  for (let i = 0; i < deck.length; i++) {
    let swapIdx = Math.trunc(Math.random() * deck.length);
    let tmp = deck[swapIdx];
    deck[i] = tmp;
  }
}

function GetCardString(card) {
  return card.value + " of " + card.suit;
}

function GetNextCard() {
  return deck.shift();
}

function getCardNumericValue(card) {
  switch (card.value) {
    case "Ace":
      return 1;
    case "Ace":
      return 11;
    case "Two":
      return 2;
    case "Three":
      return 3;
    case "Four":
      return 4;
    case "Five":
      return 5;
    case "Six":
      return 6;
    case "Seven":
      return 7;
    case "Eight":
      return 8;
    case "Nine":
      return 9;
    break;
    default:
      return 10;

  }
}

function GetScore(cardArray) {
  let score = 0;
  let hasAce = false;
  for (let i = 0; i < cardArray.length; i++) {
    let card = cardArray[i];
    score += getCardNumericValue(card);
    if (card.value === "Ace") {
      hasAce = true;
    }
  }
  if (hasAce && score + 10 <= 21) {
    return score + 10;
  }
  return score;
}

function UpdateScores() {
  dealerScore = GetScore(dealerCards);
  playerScore = GetScore(playerCards);
}

function CheckForEndOfGame() {
    UpdateScores();

    if (gameOver) {
      //allows dealer to take cards
      while (dealerScore < playerScore
              && playerScore <= 21
              && dealerScore <= 21) {
          dealerCards.push(GetNextCard());
          UpdateScores();
      }
    }
    else if (playerScore > 21) {
      playerWon = false;
      gameOver = true;
    }
    else if (playerScore == 21) {
      playerWon = true;
      gameOver = true;
    }
    else if (dealerScore == 21) {
      playerWon = false;
      gameOver = true;
    }
    else if (dealerScore > 21) {
      playerWon = true;
      gameOver = true;
    }
    else if (gameOver) {
      if (playerScore > dealerScore) {
        playerWon = true;
      }
      else if (playerScore < dealerScore || playerScore === dealerScore) {
        playerWon = false;
      }
    }
}

function ShowStatus() {
  if (!gameStarted) {
    textArea.innerText = "Welcome to Blackjack!";
    return;
  }

  let dealerCardString = "";
  for (var i = 0; i < dealerCards.length; i++) {
    dealerCardString += GetCardString(dealerCards[i]) + '\n';
  }

  let playerCardString = "";
  for (var i = 0; i < playerCards.length; i++) {
    playerCardString += GetCardString(playerCards[i]) + '\n';
  }

  UpdateScores();

  textArea.innerText =

    "Dealer has:\n" +
    dealerCardString +
    "(score: "+ dealerScore + ")\n\n" +

    "Player has:\n" +
    playerCardString +
    "(score: "+ playerScore + ")\n\n";

    if (gameOver) {
      if (playerWon) {
        textArea.innerText += "You Win!";
      }
      else if (playerWon && playerScore == "21") {
        textArea.innerText += "Blackjack! You Win!"
      }
      else if (dealerScore > "21") {
        textArea.innerText += "Dealer busted!  You Win";
      }
      else if (dealerScore == "21") {
        textArea.innerText += "Dealer has Blackjack :("
      }
      else if (playerScore === dealerScore) {
        textArea.innerText += "Push"
      }
      else if (dealerScore > playerScore) {
        textArea.innerText += "Dealer Wins :(";
      }
      newGameButton.style.display = "inline";
      hitButton.style.display = "none";
      stayButton.style.display = "none";
    }
}
