const canvas = document.getElementById("fondo");
const ctx = canvas.getContext("2d");
let estrellas = [];
let cometa = null;

function redimensionarCanva() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
window.addEventListener("resize", redimensionarCanva);
redimensionarCanva();

function crearEstrellas(num) {
    estrellas = [];
    for (let i  = 0; i < num; i++) {
        estrellas.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            radio: Math.random() * 1.5 + 0.5,
            velocidad: Math.random() * 0.2 + 0.05,
            alpha: Math.random(),
            alphaDelta: Math.random() * 0.2,
        });
    }
}

function crearCometa() {
    cometa = {
        x: canvas.width + 50,
        y: Math.random() * canvas.height / 2,
        velocidadX: -5 - Math.random() * 3,
        velocidadY: 1 + Math.random() * 2,
        longitudCola: 150,
        trail: []
    };
}

function dibujarCometa() {
    if(!cometa) return;

    //Mover cometa
    cometa.x += cometa.velocidadX;
    cometa.y += cometa.velocidadY;

    // Añadir posición actual al rastro
    cometa.trail.push({ x: cometa.x, y: cometa.y });
    if (cometa.trail.length > cometa.longitudRastro) {
        cometa.trail.shift();
    }

    //Dibujar cometa
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

//Aviso de construcción

Swal.fire({
    title: 'Ponte el casco!!',
    text: 'Este sitio está en construcción, hay muchas cosas que pueden cambiar y otras de momento pueden no funcionar.',
    icon: 'info',
    confirmButtonText: 'Tomar  casco amarillo',
    theme: 'dark',
    background: 'radial-gradient(circle at top, #1b1f3b, #0d0d1a)',
    allowOutsideClick: true,
    allowEscapeCLick: true,
    allowEnterClick: true,
    confirmButtonColor: '#3a3457',
    confirmButtonAriaLabel: 'Confirmar',
});

//Confirmación de formulario

const form = document.getElementById("form_contacto");

form.addEventListener("submit", function (e) {
    e.preventDefault(); // Cancelar envío automático

    const formData = new FormData(form);

    fetch("https://formspree.io/f/xanjorqv", {
        method: "POST",
        body: formData,
        headers: { 'Accept': 'application/json' }
    }).then(function (response) {
        if (response.ok) {
            Swal.fire({
                title: 'Mensaje enviado con éxito! 📨',
                text: 'He recibido tu mensaje, te contestaré lo más rápido que pueda',
                icon: 'success',
                confirmButtonText: 'Entendido',
                theme: 'dark',
                background: 'radial-gradient(circle at top, #1b1f3b, #0d0d1a)',
                allowOutsideClick: true,
                allowEscapeCLick: true,
                allowEnterClick: true,
                confirmButtonColor: '#3a3457',
                confirmButtonAriaLabel: 'Entendido',
                footer: 'Gracias por tu mensaje!',
            });
            form.reset(); // Limpiar formulario
        } else {
            Swal.fire({
                title: 'Algo ha salido mal🤨',
                text: 'Lo siento, pero no se ha podido enviar el mensaje😓',
                icon: 'error',
                confirmButtonText: 'Ok',
                theme: 'dark',
                background: 'radial-gradient(circle at top, #1b1f3b, #0d0d1a)',
                allowOutsideClick: true,
                allowEscapeCLick: true,
                allowEnterClick: true,
                confirmButtonColor: '#3a3457',
                confirmButtonAriaLabel: 'Ok',
                footer: 'Vuelve a intentarlo',
            });
        }
    });
});

// Partes repetidas

// Footer
fetch("/partes/footer.html")
  .then(response => response.text())
  .then(data => document.getElementById("footer").innerHTML = data);