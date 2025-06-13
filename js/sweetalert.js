Swal.fire({
  title: 'Ponte el casco!!',
  text: 'Este sitio está en construcción, hay muchas cosas que pueden cambiar y otras de momento pueden no funcionar.',
  icon: 'info',
  confirmButtonText: 'Tomar  casco amarrillo',
  theme: 'dark',
  background: 'radial-gradient(circle at top, #1b1f3b, #0d0d1a)',
  allowOutsideClick: true,
  allowEscapeCLick: true,
  allowEnterClick: true,
  confirmButtonColor: '#3a3457',
  confirmButtonAriaLabel: 'Confirmar',
});

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
          text: 'He recivido tu mensaje, te contestaré lo más rápido que pueda',
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