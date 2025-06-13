const canvas = document.getElementById('fondo-estrellas');
const ctx = canvas.getContext('2d');
let estrellas = [];
let cometa = null;

function redimensionarCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
window.addEventListener('resize', redimensionarCanvas);
redimensionarCanvas();

function crearEstrellas(num) {
  estrellas = [];
  for (let i = 0; i < num; i++) {
    estrellas.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      radio: Math.random() * 1.5 + 0.5,
      velocidad: Math.random() * 0.2 + 0.05,
      alpha: Math.random(),
      alphaDelta: Math.random() * 0.02
    });
  }
}

function crearCometa() {
  cometa = {
    x: canvas.width + 50,
    y: Math.random() * canvas.height / 2,
    velocidadX: -5 - Math.random() * 3,
    velocidadY: 1 + Math.random() * 2,
    longitudRastro: 150,
    trail: []
  };
}

function dibujarCometa() {
  if (!cometa) return;

  // Mover cometa
  cometa.x += cometa.velocidadX;
  cometa.y += cometa.velocidadY;

  // Añadir posición actual al rastro
  cometa.trail.push({ x: cometa.x, y: cometa.y });
  if (cometa.trail.length > cometa.longitudRastro) {
    cometa.trail.shift();
  }

  // Dibujar cometa
  for (let i = 0; i < cometa.trail.length; i++) {
    const pos = cometa.trail[i];
    const alpha = i / cometa.trail.length;
    ctx.beginPath();
    ctx.strokeStyle = `rgba(255, 255, 255, ${alpha * 0.7})`;
    ctx.lineWidth = 2;
    ctx.moveTo(pos.x, pos.y);
    if (i + 1 < cometa.trail.length) {
      ctx.lineTo(cometa.trail[i + 1].x, cometa.trail[i + 1].y);
    }
    ctx.stroke();
  }

  ctx.beginPath();
  const gradient = ctx.createRadialGradient(cometa.x, cometa.y, 0, cometa.x, cometa.y, 8);
  gradient.addColorStop(0, 'rgba(255, 255, 255, 1)');
  gradient.addColorStop(1, 'rgba(255, 255, 255, 0)');
  ctx.fillStyle = gradient;
  ctx.arc(cometa.x, cometa.y, 6, 0, Math.PI * 2);
  ctx.fill();

  // Espera entre cometas
  if (cometa.x < -50 || cometa.y > canvas.height + 50) {
    cometa = null;
    setTimeout(crearCometa, 3000 + Math.random() * 7000); // entre 3 y 10 segundos
  }
}

function animar() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Estrellas
  for (let estrella of estrellas) {
    estrella.alpha += estrella.alphaDelta;
    if (estrella.alpha <= 0 || estrella.alpha >= 1) {
      estrella.alphaDelta = -estrella.alphaDelta;
    }

    estrella.x -= estrella.velocidad;
    if (estrella.x < 0) estrella.x = canvas.width;

    ctx.beginPath();
    ctx.arc(estrella.x, estrella.y, estrella.radio, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(255, 255, 255, ${estrella.alpha})`;
    ctx.fill();
  }

  // Aparición del cometa
  dibujarCometa();

  requestAnimationFrame(animar);
}

crearEstrellas(150);
crearCometa();
animar();