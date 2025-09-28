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
  },
  {
    question: "Qual o principal benefício do reúso de água em residências?",
    answers: ["Aumentar contas de água", "Reduzir consumo e desperdício", "Diminuir pressão da rede", "Criar mais lixos"],
    correct: 1
  },
  {
    question: "Qual desses hábitos ajuda a economizar água na cozinha?",
    answers: ["Lavar louça com a torneira aberta", "Deixar a máquina de lavar sempre cheia", "Molhar plantas em excesso", "Limpar piso com mangueira"],
    correct: 1
  },
  {
    question: "O que significa 'águas cinzas'?",
    answers: ["Água da chuva", "Água da chuva com poluição", "Água usada em pias, chuveiros e lavatórios", "Água potável engarrafada"],
    correct: 2
  },
  {
    question: "Qual a vantagem de cisternas comunitárias?",
    answers: ["Aumentam consumo de energia", "Garantem água em períodos de seca", "Exigem água potável constante", "Não ajudam a comunidade"],
    correct: 1
  },
  {
    question: "O que é um sistema de irrigação sustentável em hortas comunitárias?",
    answers: ["Usar água da chuva e reaproveitar águas cinzas", "Regar plantas com água mineral", "Deixar água escorrer pelo chão", "Usar só mangueira manualmente"],
    correct: 0
  },
  {
    question: "Qual a consequência de desperdiçar água em regiões secas?",
    answers: ["Reduz biodiversidade e aumenta escassez", "Ajuda na economia", "Melhora a agricultura", "Não altera nada"],
    correct: 0
  },
  {
    question: "Qual é a melhor forma de coletar água da chuva para reuso doméstico?",
    answers: ["Sem filtro, direto na caixa", "Usando calhas e filtros adequados", "Apenas em garrafas pequenas", "Misturar com água de esgoto"],
    correct: 1
  },
  {
    question: "Qual a porcentagem estimada de água potável disponível no mundo?",
    answers: ["Cerca de 70%", "Cerca de 50%", "Cerca de 3%", "Cerca de 10%"],
    correct: 2
  },
  {
    question: "Por que é importante conscientizar crianças sobre economia de água?",
    answers: ["Porque crianças não bebem água", "Para criar hábitos de consumo consciente desde cedo", "Não tem importância", "Apenas para projetos escolares"],
    correct: 1
  }
];

let playerName = "";
let currentQuestion = 0;
let score = 0;
let timer;
let timeLeft = 15;
let playerAnswers = []; // Guarda respostas do jogador

const startScreen = document.getElementById("start-screen");
const quizScreen = document.getElementById("quiz-screen");
const endScreen = document.getElementById("end-screen");

const questionEl = document.getElementById("question");
const answersEl = document.getElementById("answers");
const progressEl = document.getElementById("progress");
const finalScoreEl = document.getElementById("final-score");
const rankingEl = document.getElementById("ranking");
const reviewEl = document.getElementById("review-answers");

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
    playerAnswers.push({
      question: questions[currentQuestion].question,
      selected: null,
      correct: questions[currentQuestion].correct,
      answers: questions[currentQuestion].answers
    });
    nextQuestion();
  }
}

function checkAnswer(i) {
  let correct = questions[currentQuestion].correct;

  // salvar a resposta do jogador
  playerAnswers.push({
    question: questions[currentQuestion].question,
    selected: i,
    correct: correct,
    answers: questions[currentQuestion].answers
  });

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

  // Salvar ranking local
  let ranking = JSON.parse(localStorage.getItem("ranking")) || [];
  ranking.push({ name: playerName, score });
  ranking.sort((a, b) => b.score - a.score);
  ranking = ranking.slice(0, 5);
  localStorage.setItem("ranking", JSON.stringify(ranking));

  // Mostrar ranking
  rankingEl.innerHTML = "";
  ranking.forEach((r, index) => {
    let li = document.createElement("li");

    let medal = "";
    if (index === 0) medal = '<span class="medal gold">🏆</span>';
    else if (index === 1) medal = '<span class="medal silver">🥈</span>';
    else if (index === 2) medal = '<span class="medal bronze">🥉</span>';
    else medal = '<span class="medal"></span>';

    li.innerHTML = `
      ${medal}
      <span class="player-name">${r.name}</span>
      <span class="score">${r.score} pts</span>
    `;
    rankingEl.appendChild(li);
  });

  // Mostrar revisão das respostas
  reviewEl.innerHTML = "";
  playerAnswers.forEach((item, index) => {
    const li = document.createElement("li");

    let selectedAnswer = item.selected !== null ? item.answers[item.selected] : "Não respondeu";
    let correctAnswer = item.answers[item.correct];

    if (item.selected === item.correct) {
      li.innerHTML = `<strong>Pergunta ${index + 1}:</strong> ${item.question}<br>
                      Sua resposta: <span class="correct-answer">${selectedAnswer}</span>`;
    } else {
      li.innerHTML = `<strong>Pergunta ${index + 1}:</strong> ${item.question}<br>
                      Sua resposta: <span class="wrong-answer">${selectedAnswer}</span><br>
                      Resposta correta: <span class="correct-answer">${correctAnswer}</span>`;
    }

    reviewEl.appendChild(li);
  });
}


