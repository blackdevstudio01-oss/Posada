import { supabase } from "./supabase.js";

// 1. Seleccionamos los elementos HTML
const formulario = document.getElementById("form-acceso");
const inputCodigo = document.getElementById("codigo");
const mensaje = document.getElementById("mensaje-error");
const boton = document.getElementById("btn-entrar");

// 2. Escuchamos el envío del formulario
formulario.addEventListener("submit", async (evento) => {
  // Evitamos que la página se recargue
  evento.preventDefault();

  // Obtenemos el código escrito por el invitado
  const codigo = inputCodigo.value.trim();

  // Limpiamos mensajes anteriores
  mensaje.textContent = "";

  if (!codigo) {
    mensaje.textContent = "Escribe tu código de acceso.";
    return;
  }

  // Deshabilitamos el botón mientras consultamos
  boton.disabled = true;
  boton.textContent = "VERIFICANDO...";

  try {
    // 3. Llamamos a la función SQL de Supabase
    const { data, error } = await supabase.rpc("validar_codigo", {
      codigo_ingresado: codigo,
    });

    // 4. Verificamos errores de conexión
    if (error) {
      throw error;
    }

    // 5. Revisamos si el código es válido
    if (data === true) {
      // Solo controla la navegación visual
      sessionStorage.setItem("invitacion_validada", "true");

      // Redirigimos a la invitación
      window.location.href = "./invitacion.html";
    } else {
      mensaje.textContent = "Código incorrecto o inactivo.";
    }
  } catch (error) {
    console.error("Error de validación:", error);

    mensaje.textContent = "No pudimos verificar el código. Intenta nuevamente.";
  } finally {
    // Restauramos el botón
    boton.disabled = false;
    boton.textContent = "ABRIR INVITACIÓN";
  }
});
