export function iniciarMusica() {
  // 1. Seleccionamos nuestros elementos HTML
  const audio = document.getElementById("musica-fondo");
  const boton = document.getElementById("btn-musica");

  // 2. Actualizamos el botón según el estado del audio
  function actualizarBoton() {
    const reproduciendo = !audio.paused;

    boton.classList.toggle("reproduciendo", reproduciendo);

    boton.setAttribute("aria-pressed", String(reproduciendo));

    boton.setAttribute(
      "aria-label",
      reproduciendo ? "Pausar música" : "Reproducir música",
    );
  }

  // 3. Función para reproducir o pausar
  async function alternarMusica() {
    if (audio.paused) {
      try {
        await audio.play();
      } catch (error) {
        console.error("No se pudo reproducir:", error);
      }
    } else {
      audio.pause();
    }
  }

  // 4. Escuchamos los clics del botón
  boton.addEventListener("click", alternarMusica);

  // 5. Escuchamos cambios reales del reproductor
  audio.addEventListener("play", actualizarBoton);
  audio.addEventListener("pause", actualizarBoton);
  audio.addEventListener("ended", actualizarBoton);

  // 6. Intentamos iniciar al abrir la invitación
  audio.play().catch(() => {
    console.log("El navegador requiere interacción para reproducir música.");
  });

  actualizarBoton();
}
