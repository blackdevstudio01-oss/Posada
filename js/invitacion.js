const acceso = sessionStorage.getItem("invitacion_validada");

if (acceso !== "true") {
  window.location.replace("./index.html");
}
