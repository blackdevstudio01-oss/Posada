export function iniciarWhatsapp() {
  // 1. Seleccionamos el botón
  const boton = document.getElementById("btn-whatsapp");

  // 2. Número de WhatsApp del organizador
  // Código de país + número, sin espacios ni signos
  const telefono = "523325897381";

  // 3. Mensaje que recibirá el organizador
  const mensaje = "¡Hola! 🎄, si hagamos una posada.";

  // 4. Escuchamos el clic del botón
  boton.addEventListener("click", () => {
    // Convertimos el mensaje a formato URL
    const texto = encodeURIComponent(mensaje);

    // Construimos el enlace de WhatsApp
    const url = `https://wa.me/${telefono}?text=${texto}`;

    // Abrimos WhatsApp
    window.open(url, "_blank", "noopener,noreferrer");
  });
}
