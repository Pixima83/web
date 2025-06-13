const nombreInput = document.getElementById("nombre");

function validarNombre(nombre) {
  const regex = /^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]{2,}$/;
  return regex.test(nombre.trim());
}

form.addEventListener("submit", function (e) {
  const nombre = nombreInput.value;


  if (!validarNombre(nombre)) {
    e.preventDefault();
    Swal.fire({
      title: 'Datos no válidos',
      text: 'El nombre debe contenet únicamente letras (No números ni símbolos)',
      icon: 'error',
      confirmButtonText: 'Entendido',
      theme: 'dark',
      background: 'radial-gradient(circle at top, #1b1f3b, #0d0d1a)',
      allowOutsideClick: true,
      allowEscapeCLick: true,
      allowEnterClick: true,
      confirmButtonColor: '#3a3457',
      confirmButtonAriaLabel: 'Entendido',
      footer: 'Vuelve a intentarlo',
    })
  }
});