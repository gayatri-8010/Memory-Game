// script.js

const emojis = ["🐶", "🐱", "🐻", "🐼", "🦊", "🐸", "🐵", "🐯"];
let cards = [...emojis, ...emojis]; // duplicate for pairs
let flippedCards = [];
let matchedCards = [];
let moves = 0;

function shuffle(array) {
  return array.sort(() => Math.random() - 0.5);
}

function startGame() {
  const board = document.getElementById("game-board");
  board.innerHTML = "";
  cards = shuffle(cards);
  flippedCards = [];
  matchedCards = [];
  moves = 0;
  document.getElementById("moves").textContent = "Moves: 0";

  cards.forEach((emoji, index) => {
    const card = document.createElement("div");
    card.classList.add("card");
    card.dataset.emoji = emoji;
    card.dataset.index = index;
    card.addEventListener("click", flipCard);
    board.appendChild(card);
  });
}

function flipCard() {
  const card = this;
  const emoji = card.dataset.emoji;
  const index = card.dataset.index;

  if (
    flippedCards.length === 2 ||
    card.classList.contains("flipped") ||
    card.classList.contains("matched")
  ) {
    return;
  }

  card.textContent = emoji;
  card.classList.add("flipped");
  flippedCards.push({ card, emoji, index });

  if (flippedCards.length === 2) {
    moves++;
    document.getElementById("moves").textContent = `Moves: ${moves}`;
    checkMatch();
  }
}

function checkMatch() {
  const [first, second] = flippedCards;

  if (first.emoji === second.emoji && first.index !== second.index) {
    first.card.classList.add("matched");
    second.card.classList.add("matched");
    matchedCards.push(first, second);
    if (matchedCards.length === cards.length) {
      setTimeout(() => {
        alert(`🎉 You win in ${moves} moves!`);
      }, 300);
    }
  } else {
    setTimeout(() => {
      first.card.textContent = "";
      second.card.textContent = "";
      first.card.classList.remove("flipped");
      second.card.classList.remove("flipped");
    }, 700);
  }

  flippedCards = [];
}

startGame();
