const frases = [
  "Banho rápido, planeta saudável.",
  "Cada gota conta.",
  "Escove os dentes com a torneira fechada.",
  "Reaproveite a água sempre que puder.",
  "Use balde, não a mangueira.",
  "Regue as plantas de manhã cedo ou à noite.",
  "Lave o carro com consciência. Use um balde",
  "Água é vida, cuide dela.",
  "Cinco minutos de banho já bastam.",
  "Reutilize a água da chuva.",
  "Água é TECH, Água é POP, Água é TUDO!"
];

const elemento = document.getElementById("frases");
let fraseIndex = 0;
let charIndex = 0;
let apagando = false;
let velocidade = 110; 

function typeEffect() {
  let fraseAtual = frases[fraseIndex];

  if (!apagando) {
    // digitando
    elemento.textContent = fraseAtual.substring(0, charIndex++);
    if (charIndex > fraseAtual.length) {
      apagando = true;
      setTimeout(typeEffect, 2000); 
      return;
    }
  } else {
    // apagando
    elemento.textContent = fraseAtual.substring(0, charIndex--);
    if (charIndex < 0) {
      apagando = false;
      fraseIndex = (fraseIndex + 1) % frases.length;
    }
  }

  setTimeout(typeEffect, velocidade);
}

typeEffect();
