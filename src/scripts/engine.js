// Os 8 bichinhos do jogo original. Cada um vira um par de cartas.
const emojis = ["🐱", "🦝", "🦊", "🐶", "🐵", "🦁", "🐯", "🐮"];
const PAIRS = emojis.length;

const FLIP_DELAY = 500; // tempo até conferir o par (igual ao original)
const WRONG_DURATION = 450; // duração da tremidinha quando erra
const STORAGE_KEY = "jogo-da-memoria:recorde";

const gameEl = document.querySelector(".game");
const movesEl = document.getElementById("moves");
const timerEl = document.getElementById("timer");
const bestEl = document.getElementById("best");
const liveEl = document.getElementById("live");
const modalEl = document.getElementById("win-modal");
const summaryEl = document.getElementById("win-summary");
const recordEl = document.getElementById("win-record");

const state = {
  openCards: [],
  moves: 0,
  matches: 0,
  locked: false,
  started: false,
  startedAt: 0,
  timerId: null,
  timeouts: [],
};

/* ---------- utilitários ---------- */

// Fisher-Yates: embaralha de verdade (o sort com random do original é enviesado)
function shuffle(list) {
  const arr = [...list];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

function formatTime(totalSeconds) {
  const m = String(Math.floor(totalSeconds / 60)).padStart(2, "0");
  const s = String(totalSeconds % 60).padStart(2, "0");
  return `${m}:${s}`;
}

// setTimeout "rastreável": dá pra cancelar tudo ao resetar o jogo
function later(fn, ms) {
  const id = setTimeout(fn, ms);
  state.timeouts.push(id);
}

function clearPending() {
  state.timeouts.forEach(clearTimeout);
  state.timeouts = [];
}

function announce(message) {
  liveEl.textContent = "";
  requestAnimationFrame(() => (liveEl.textContent = message));
}

/* ---------- recorde (localStorage) ---------- */

function loadBest() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY));
  } catch {
    return null;
  }
}

function saveBest(best) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(best));
  } catch {
    /* sem localStorage? o jogo segue normalmente */
  }
}

function renderBest() {
  const best = loadBest();
  bestEl.textContent = best ? best.moves : "--";
}

/* ---------- cronômetro ---------- */

function elapsedSeconds() {
  return Math.floor((Date.now() - state.startedAt) / 1000);
}

function startTimer() {
  state.started = true;
  state.startedAt = Date.now();
  state.timerId = setInterval(() => {
    timerEl.textContent = formatTime(elapsedSeconds());
  }, 1000);
}

function stopTimer() {
  clearInterval(state.timerId);
  state.timerId = null;
}

/* ---------- cartas ---------- */

function updateLabel(card) {
  const { emoji, pos } = card.dataset;
  if (card.classList.contains("boxMatch")) {
    card.setAttribute("aria-label", `Par encontrado: ${emoji}`);
  } else if (card.classList.contains("boxOpen")) {
    card.setAttribute("aria-label", `Carta aberta: ${emoji}`);
  } else {
    card.setAttribute("aria-label", `Carta ${pos}, virada para baixo`);
  }
}

function createCard(emoji, index) {
  const card = document.createElement("div");
  card.className = "item";
  card.dataset.emoji = emoji;
  card.dataset.pos = index + 1;
  card.tabIndex = 0;
  card.setAttribute("role", "button");
  card.innerHTML = `
    <span class="item__face item__back" aria-hidden="true">?</span>
    <span class="item__face item__front" aria-hidden="true">${emoji}</span>
  `;
  updateLabel(card);

  card.addEventListener("click", () => handleClick(card));
  card.addEventListener("keydown", (event) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      handleClick(card);
    }
  });
  return card;
}

function handleClick(card) {
  // ignora cliques enquanto confere o par, em carta já aberta ou já combinada
  if (
    state.locked ||
    card.classList.contains("boxOpen") ||
    card.classList.contains("boxMatch")
  ) {
    return;
  }

  if (!state.started) startTimer();

  card.classList.add("boxOpen");
  updateLabel(card);
  state.openCards.push(card);

  if (state.openCards.length === 2) {
    state.moves++;
    movesEl.textContent = state.moves;
    state.locked = true;
    later(checkMatch, FLIP_DELAY);
  }
}

function checkMatch() {
  const [first, second] = state.openCards;

  if (first.dataset.emoji === second.dataset.emoji) {
    [first, second].forEach((card) => {
      card.classList.add("boxMatch");
      updateLabel(card);
    });
    state.matches++;
    announce("Par encontrado!");
  } else {
    [first, second].forEach((card) => {
      card.classList.remove("boxOpen");
      card.classList.add("boxWrong");
      updateLabel(card);
    });
    announce("Não combinou, tente de novo.");
    later(() => {
      first.classList.remove("boxWrong");
      second.classList.remove("boxWrong");
    }, WRONG_DURATION);
  }

  state.openCards = [];
  state.locked = false;

  if (state.matches === PAIRS) winGame();
}

/* ---------- fim de jogo ---------- */

function launchConfetti() {
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

  for (let i = 0; i < 28; i++) {
    const piece = document.createElement("span");
    piece.className = "confetti";
    piece.textContent = emojis[i % emojis.length];
    piece.style.left = `${Math.random() * 100}vw`;
    piece.style.animationDuration = `${2.5 + Math.random() * 2}s`;
    piece.style.animationDelay = `${Math.random() * 0.8}s`;
    document.body.appendChild(piece);
    setTimeout(() => piece.remove(), 5500);
  }
}

function winGame() {
  stopTimer();
  const seconds = elapsedSeconds();
  timerEl.textContent = formatTime(seconds);

  const best = loadBest();
  const isRecord =
    !best ||
    state.moves < best.moves ||
    (state.moves === best.moves && seconds < best.seconds);

  if (isRecord) saveBest({ moves: state.moves, seconds });
  renderBest();

  summaryEl.textContent = `${state.moves} jogadas em ${formatTime(seconds)}`;
  recordEl.textContent = isRecord
    ? "🏆 Novo recorde!"
    : `Seu recorde: ${best.moves} jogadas em ${formatTime(best.seconds)}`;

  announce("Você venceu!");
  launchConfetti();
  later(() => modalEl.showModal(), 600);
}

/* ---------- novo jogo / reset ---------- */

function newGame() {
  gameEl.innerHTML = "";
  Object.assign(state, {
    openCards: [],
    moves: 0,
    matches: 0,
    locked: false,
    started: false,
  });
  movesEl.textContent = "0";
  timerEl.textContent = "00:00";
  renderBest();

  shuffle([...emojis, ...emojis]).forEach((emoji, index) => {
    gameEl.appendChild(createCard(emoji, index));
  });
}

function resetGame() {
  clearPending();
  stopTimer();
  state.locked = true;

  const cards = gameEl.querySelectorAll(".item");
  const hasFlipped = gameEl.querySelector(".boxOpen, .boxMatch");
  cards.forEach((card) => card.classList.remove("boxOpen", "boxMatch", "boxWrong"));

  // espera as cartas virarem de volta antes de embaralhar
  later(newGame, hasFlipped ? 400 : 0);
}

document.getElementById("reset").addEventListener("click", resetGame);
document.getElementById("play-again").addEventListener("click", () => {
  modalEl.close();
  resetGame();
});

newGame();
