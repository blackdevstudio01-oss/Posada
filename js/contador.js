export function iniciarContador() {
  // Fecha y hora del evento
  const fechaEvento = new Date("2026-12-19T20:00:00-06:00").getTime();

  // Seleccionamos los elementos HTML
  const dias = document.getElementById("dias");
  const horas = document.getElementById("horas");
  const minutos = document.getElementById("minutos");
  const segundos = document.getElementById("segundos");

  function actualizarContador() {
    const ahora = Date.now();

    // Diferencia en milisegundos
    const diferencia = Math.max(0, fechaEvento - ahora);

    // Convertimos a días, horas, minutos y segundos
    const d = Math.floor(diferencia / 86400000);
    const h = Math.floor((diferencia % 86400000) / 3600000);
    const m = Math.floor((diferencia % 3600000) / 60000);
    const s = Math.floor((diferencia % 60000) / 1000);

    // Actualizamos el HTML
    dias.textContent = String(d).padStart(2, "0");
    horas.textContent = String(h).padStart(2, "0");
    minutos.textContent = String(m).padStart(2, "0");
    segundos.textContent = String(s).padStart(2, "0");

    // Detenemos el contador al llegar a cero
    if (diferencia === 0) {
      clearInterval(intervalo);
    }
  }

  // Ejecutamos inmediatamente
  actualizarContador();

  if (Date.now() < fechaEvento) {
    const intervalo = setInterval(() => {
      actualizarContador();

      if (Date.now() >= fechaEvento) {
        clearInterval(intervalo);
      }
    }, 1000);
  }
  // Actualizamos cada segundo
  let intervalo = setInterval(actualizarContador, 1000);
}
