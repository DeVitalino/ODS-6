// --- CARROSSEL MOBILE ---
const container = document.querySelector('.carousel-container');
const cards = document.querySelectorAll('.card-projeto');
const prevBtn = document.querySelector('.carousel-btn.left');
const nextBtn = document.querySelector('.carousel-btn.right');

if (container && cards.length > 0 && prevBtn && nextBtn) {
  // pega gap do CSS, se mudar, ajuste aqui também
  const gap = 16;
  const cardWidth = cards[0].offsetWidth + gap;

  // Função para rolar pra direita
  nextBtn.addEventListener('click', () => {
    container.scrollBy({ left: cardWidth, behavior: 'smooth' });
  });

  // Função para rolar pra esquerda
  prevBtn.addEventListener('click', () => {
    container.scrollBy({ left: -cardWidth, behavior: 'smooth' });
  });
}
