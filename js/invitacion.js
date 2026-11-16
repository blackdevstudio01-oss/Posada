import { supabase } from "./supabase.js";
import { iniciarContador } from "./contador.js";
import { iniciarMusica } from "./musica.js";
import { iniciarUbicacion } from "./ubicacion.js";
import { iniciarWhatsapp } from "./whatsapp.js";

// 1. Seleccionamos nuestros elementos HTML
const contenido = document.getElementById("contenido-invitacion");

const mensajeCarga = document.getElementById("mensaje-carga");

const mensajeAcceso = document.getElementById("mensaje-acceso");

// 2. Recuperamos el token
const token = sessionStorage.getItem("token_invitacion");

// 3. Si no hay token, regresamos al inicio
if (!token) {
  window.location.replace("./index.html");
} else {
  verificarAcceso(token);
}

// 4. Verificamos la sesión con Supabase
async function verificarAcceso(token) {
  try {
    // Llamamos a nuestra segunda Edge Function
    const { data, error } = await supabase.functions.invoke(
      "verificar-sesion",
      {
        body: { token: token },
      },
    );

    // Comprobamos si hubo un error
    if (error) {
      // El servidor rechazó la sesión
      if (error.context?.status === 401) {
        cerrarAcceso();
        return;
      }

      throw error;
    }

    // 5. Comprobamos la autorización
    if (data?.autorizado === true) {
      // Ocultamos el mensaje de carga
      mensajeCarga.hidden = true;

      // Mostramos la invitación
      contenido.hidden = false;

      console.log("Sesión autorizada");

      // Aquí podremos iniciar las interacciones
      iniciarInvitacion();
    } else {
      cerrarAcceso();
    }
  } catch (error) {
    console.error("Error verificando sesión:", error);

    mensajeCarga.hidden = true;
    mensajeAcceso.hidden = false;

    mensajeAcceso.textContent =
      "No pudimos comprobar tu acceso. Recarga la página para intentarlo nuevamente.";
  }
}

// 6. Regresamos a la pantalla de acceso
function cerrarAcceso() {
  sessionStorage.removeItem("token_invitacion");

  window.location.replace("./index.html");
}

// 7. Inicializamos las interacciones de la invitación
function iniciarInvitacion() {
  iniciarContador();
  iniciarMusica();
  iniciarUbicacion();
  iniciarWhatsapp();
}

// Próximamente:
// iniciarContador();
// configurarBotones();
// iniciarMusica();
