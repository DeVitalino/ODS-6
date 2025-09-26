import { getDatabase, ref, push, onValue, update } from "https://www.gstatic.com/firebasejs/12.3.0/firebase-database.js";

const db = getDatabase();

// Formulário e lista
const form = document.getElementById('comentario-form');
const lista = document.getElementById('lista-comentarios');

form.addEventListener('submit', (e) => {
  e.preventDefault();
  const nome = document.getElementById('nome').value.trim();
  const mensagem = document.getElementById('mensagem').value.trim();

  if (!nome || !mensagem) return;

  push(ref(db, 'comentarios'), {
    nome,
    mensagem,
    timestamp: Date.now(),
    likes: 0
  });

  form.reset();
});

// Função para calcular tempo relativo
function tempoRelativo(ts) {
  const diff = Date.now() - ts;
  const segundos = Math.floor(diff / 1000);
  if (segundos < 60) return `${segundos}s atrás`;
  const minutos = Math.floor(segundos / 60);
  if (minutos < 60) return `${minutos}m atrás`;
  const horas = Math.floor(minutos / 60);
  if (horas < 24) return `${horas}h atrás`;
  const dias = Math.floor(horas / 24);
  return `${dias}d atrás`;
}

// Mostrar comentários em tempo real
onValue(ref(db, 'comentarios'), (snapshot) => {
  lista.innerHTML = '';
  const data = snapshot.val();
  if (!data) return;

  const sorted = Object.entries(data).sort((a,b) => b[1].timestamp - a[1].timestamp);

  sorted.forEach(([key, item]) => {
    const li = document.createElement('li');

    // Avatar com inicial
    const avatar = document.createElement('div');
    avatar.classList.add('avatar');
    avatar.textContent = item.nome[0].toUpperCase();

    // Conteúdo do comentário
    const conteudo = document.createElement('div');
    conteudo.classList.add('comentario-conteudo');
    conteudo.innerHTML = `<strong>${item.nome}</strong> ${item.mensagem} <div class="data">${tempoRelativo(item.timestamp)}</div>`;

    // Botão curtir
    const likeBtn = document.createElement('span');
    likeBtn.classList.add('like-btn');
    likeBtn.textContent = `⭐ ${item.likes || 0}`;
    likeBtn.addEventListener('click', () => {
      update(ref(db, `comentarios/${key}`), { likes: (item.likes || 0) + 1 });
    });

    li.appendChild(avatar);
    li.appendChild(conteudo);
    li.appendChild(likeBtn);

    lista.appendChild(li);
  });
});
