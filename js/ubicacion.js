export function iniciarUbicacion() {
  // 1. Seleccionamos el botón del HTML
  const boton = document.getElementById("btn-ubicacion");

  // 2. Guardamos el enlace de Google Maps
  const urlUbicacion = "https://maps.app.goo.gl/3rQoSU3dbb4KdaLU8";

  // 3. Escuchamos cuando el invitado presiona el botón
  boton.addEventListener("click", () => {
    // Abrimos Google Maps en una pestaña nueva
    window.open(urlUbicacion, "_blank", "noopener,noreferrer");
  });
}
