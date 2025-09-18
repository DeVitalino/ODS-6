const questions = [
  {
    question: "Qual é o ODS 6?",
    answers: ["Energia Limpa", "Água Potável e Saneamento", "Vida na Água", "Ação Climática"],
    correct: 1
  },
  {
    question: "Quantas pessoas no mundo não têm acesso à água potável?",
    answers: ["500 milhões", "1 bilhão", "2 bilhões", "3 bilhões"],
    correct: 2
  },
  {
    question: "Qual destas NÃO é uma forma de economizar água?",
    answers: ["Tomar banhos curtos", "Reutilizar água da chuva", "Deixar torneira aberta", "Usar descargas econômicas"],
    correct: 2
  }
];

let playerName = "";
let currentQuestion = 0;
let score = 0;
let timer;
let timeLeft = 15;

const startScreen = document.getElementById("start-screen");
const quizScreen = document.getElementById("quiz-screen");
const endScreen = document.getElementById("end-screen");

const questionEl = document.getElementById("question");
const answersEl = document.getElementById("answers");
const progressEl = document.getElementById("progress");
const finalScoreEl = document.getElementById("final-score");
const rankingEl = document.getElementById("ranking");

// Iniciar quiz
document.getElementById("start-btn").addEventListener("click", () => {
  playerName = document.getElementById("player-name").value.trim();
  if (!playerName) {
    alert("Digite seu nome!");
    return;
  }
  startScreen.classList.add("hidden");
  quizScreen.classList.remove("hidden");
  loadQuestion();
});

function loadQuestion() {
  if (currentQuestion >= questions.length) {
    return endQuiz();
  }

  let q = questions[currentQuestion];
  questionEl.textContent = q.question;
  answersEl.innerHTML = "";

  q.answers.forEach((ans, i) => {
    const btn = document.createElement("button");
    btn.textContent = ans;
    btn.onclick = () => checkAnswer(i);
    answersEl.appendChild(btn);
  });

  timeLeft = 15;
  progressEl.style.width = "100%";
  clearInterval(timer);
  timer = setInterval(countdown, 1000);
}

function countdown() {
  timeLeft--;
  let percent = (timeLeft / 15) * 100;
  progressEl.style.width = percent + "%";

  if (timeLeft <= 0) {
    clearInterval(timer);
    nextQuestion();
  }
}

function checkAnswer(i) {
  let correct = questions[currentQuestion].correct;
  if (i === correct) {
    score += timeLeft * 10; // mais rápido = mais pontos
  }
  clearInterval(timer);
  nextQuestion();
}

function nextQuestion() {
  currentQuestion++;
  loadQuestion();
}

function endQuiz() {
  quizScreen.classList.add("hidden");
  endScreen.classList.remove("hidden");
  finalScoreEl.textContent = score;

  // Salvar ranking
  let ranking = JSON.parse(localStorage.getItem("ranking")) || [];
  ranking.push({ name: playerName, score });
  ranking.sort((a, b) => b.score - a.score);
  ranking = ranking.slice(0, 5);
  localStorage.setItem("ranking", JSON.stringify(ranking));

  rankingEl.innerHTML = "";
  ranking.forEach(r => {
    let li = document.createElement("li");
    li.textContent = `${r.name} - ${r.score} pts`;
    rankingEl.appendChild(li);
  });
}

function startTimer(duration) {
  const progress = document.getElementById("progress");
  progress.style.animation = "none";
  progress.offsetHeight; // força reflow
  progress.style.animation = `shrink ${duration}s linear forwards`;

  setTimeout(() => {
    // tempo acabou -> próxima pergunta
    nextQuestion();
  }, duration * 1000);
}

function showRanking() {
  const rankingList = document.getElementById("ranking");
  rankingList.innerHTML = "";

  ranking.forEach((player, index) => {
    const li = document.createElement("li");

    let medal = "";
    if(index === 0) medal = '<span class="medal gold">🏆</span>';
    else if(index === 1) medal = '<span class="medal silver">🥈</span>';
    else if(index === 2) medal = '<span class="medal bronze">🥉</span>';
    else medal = '<span class="medal"></span>';

    li.innerHTML = `
      ${medal}
      <span class="player-name">${player.name}</span>
      <span class="score">${player.score} pts</span>
    `;
    rankingList.appendChild(li);
  });
}
