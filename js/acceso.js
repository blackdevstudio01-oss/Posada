import { supabase } from "./supabase.js";

// 1. Seleccionamos los elementos HTML
const formulario = document.getElementById("form-acceso");
const inputCodigo = document.getElementById("codigo");
const mensaje = document.getElementById("mensaje-error");
const boton = document.getElementById("btn-entrar");

// 2. Escuchamos el envío del formulario
formulario.addEventListener("submit", async (evento) => {
  evento.preventDefault();

  // Obtenemos el código
  const codigo = inputCodigo.value.trim();

  // Limpiamos mensajes anteriores
  mensaje.textContent = "";

  if (!codigo) {
    mensaje.textContent = "Escribe tu código de acceso.";
    return;
  }

  // Deshabilitamos el botón
  boton.disabled = true;
  boton.textContent = "VERIFICANDO...";

  try {
    // 3. Llamamos a nuestra Edge Function
    const { data, error } = await supabase.functions.invoke(
      "acceso-invitacion",
      {
        body: { codigo: codigo },
      },
    );

    // 4. Revisamos errores HTTP
    if (error) {
      if (error.context?.status === 401) {
        mensaje.textContent = "Código incorrecto o inactivo.";
        return;
      }

      throw error;
    }

    // 5. Comprobamos la respuesta del servidor
    if (data?.autorizado === true && data?.token) {
      // Guardamos el token temporal
      sessionStorage.setItem("token_invitacion", data.token);

      // Eliminamos el indicador anterior
      sessionStorage.removeItem("invitacion_validada");

      // Abrimos la invitación
      window.location.href = "./invitacion.html";
    } else {
      mensaje.textContent = "No se pudo validar el acceso.";
    }
  } catch (error) {
    console.error("Error de acceso:", error);

    mensaje.textContent = "Error de conexión. Intenta nuevamente.";
  } finally {
    boton.disabled = false;
    boton.textContent = "ABRIR INVITACIÓN";
  }
});
