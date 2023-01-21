'use strict';

const playerEl = document.querySelector('.player');

const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');

const score0El = document.getElementById('total-score--0');
const score1El = document.getElementById('total-score--1');

const currentScore0 = document.querySelector('.current-score--0');
const currentScore1 = document.querySelector('.current-score--1');

const diceImage = document.querySelector('.dice-img');
const btnRoll = document.querySelector('.btn-roll');
const btnReset = document.querySelector('.btn-reset');
const btnHold = document.querySelector('.btn-hold');

const totalScore = [0, 0];
let currentScore,
  activePlayer = 0,
  playing,
  winner = 0;

function init() {
  playing = true;
  currentScore = 0;
  totalScore[0] = 0;
  totalScore[1] = 0;
  score0El.textContent = 0;
  score1El.textContent = 0;
  currentScore0.textContent = 0;
  currentScore1.textContent = 0;
}

init();

function hideOnFinish() {
  diceImage.classList.add('hidden');
  btnRoll.classList.add('hidden');
  btnHold.classList.add('hidden');
}

function unHideOnReset() {
  diceImage.classList.add('hidden');
  btnRoll.classList.remove('hidden');
  btnHold.classList.remove('hidden');
}

function switchPlayer() {
  currentScore = 0;
  document.querySelector(`.current-score--${activePlayer}`).textContent =
    currentScore;
  // document.querySelector(`.player--${activePlayer}`).classList.remove('player--active');
  activePlayer = activePlayer === 0 ? 1 : 0;
  // document.querySelector(`.player--${activePlayer}`).classList.add('player--active');
  player0El.classList.toggle('player--active');
  player1El.classList.toggle('player--active');
}

btnRoll.addEventListener('click', function (e) {
  if (playing) {
    // generating random number from 1-6
    const diceRoll = Math.floor(Math.random() * 6) + 1;

    // dice animation
    if (diceImage.classList.contains('hidden')) {
      diceImage.classList.remove('hidden');
    }
    e.preventDefault;
    if (diceImage.classList.contains('dice--animation'))
      diceImage.classList.remove('dice--animation');
    void diceImage.offsetWidth;
    diceImage.classList.add('dice--animation');

    // adding correct dice image according to the random number
    diceImage.style.backgroundImage = `url(/images/dice-${diceRoll}.png)`;
    diceImage.style.boxShadow = ` 0 1rem 1rem rgba(0, 0, 0, 0.2)`;
    // diceImage.src = `dice-${diceRoll}.png`;

    // checking and adding dice number to current score
    if (diceRoll !== 1) {
      currentScore += diceRoll;
      document.querySelector(`.current-score--${activePlayer}`).textContent =
        currentScore;
    } else {
      switchPlayer();
    }
  }
});

btnHold.addEventListener('click', function () {
  if (playing) {
    totalScore[activePlayer] += currentScore;
    document.getElementById(`total-score--${activePlayer}`).textContent =
      totalScore[activePlayer];

    if (totalScore[0] >= 100 || totalScore[1] >= 100) {
      playing = false;
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
      document.querySelector(`.current-score--${activePlayer}`).textContent = 0;
      hideOnFinish();
      if (totalScore[0] >= 100) winner = 1;
      else winner = 2;
    } else {
      switchPlayer();
    }
  }
});

btnReset.addEventListener('click', function () {
  init();
  unHideOnReset();
  if (winner) {
    if (winner === 1) {
      player0El.classList.remove('player--winner');
      player1El.classList.add('player--active');
      activePlayer = 1;
    } else {
      player1El.classList.remove('player--winner');
      player0El.classList.add('player--active');
      activePlayer = 0;
    }
    winner = 0;
  }
});

const instructionEl = document.querySelector('.instruction');
const instructionModalEl = document.querySelector('.instruction-modal');
const closeModalEl = document.querySelector('.close-modal');
const overlayEl = document.querySelector('.overlay');

function openModal() {
  instructionModalEl.classList.remove('hidden');
  overlayEl.classList.remove('hidden');
}
function closeModal() {
  instructionModalEl.classList.add('hidden');
  overlayEl.classList.add('hidden');
}

instructionEl.addEventListener('click', openModal);
closeModalEl.addEventListener('click', closeModal);
overlayEl.addEventListener('click', closeModal);
