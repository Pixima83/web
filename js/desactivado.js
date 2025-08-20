Swal.fire({
  title: 'Página temporalmente inactiva',
  text: 'Se ha deshabilitado temporalmente los scripts de esta página, por lo que solo veras la página, pero no podrás interactuar en ella.',
  icon: 'warning',
  confirmButtonText: 'Entendido',
  theme: 'dark',
  background: 'radial-gradient(circle at top, #1b1f3b, #0d0d1a)',
  allowOutsideClick: true,
  allowEscapeCLick: true,
  allowEnterClick: true,
  confirmButtonColor: '#3a3457',
  confirmButtonAriaLabel: 'Confirmar',
  footer: '¿Porqué veo esto?: Está opción no es automática, la he habilitado, posiblemente por que tenga que cambiar algo importante. Lo siento :('
})