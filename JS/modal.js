const startBtn = document.getElementById("start-journey-btn");
const introModal = document.getElementById("intro-modal");
const continueBtn = document.getElementById("continue-quiz-btn");

startBtn.addEventListener("click", () => introModal.classList.remove("hidden"));
continueBtn.addEventListener("click", () => {
  introModal.classList.add("hidden");
  window.location.href = "quiz.html"; // vai pro quiz
});
