// Función para activar la URL bar y escribir "% "
const activateUrlbarWithPercent = () => {
  const urlbar =
    document.getElementById("urlbar") ||
    document.querySelector("#urlbar");

  if (!urlbar) {
    console.warn("[Simple Search] URL bar not found.");
    return;
  }

  if (typeof urlbar.focus === "function") {
    urlbar.focus();
  }

  if (urlbar.value !== undefined) {
    urlbar.value = "% ";
  } else if (
    urlbar.textContent !== undefined &&
    urlbar.isContentEditable
  ) {
    urlbar.textContent = "% ";
  }

  // Posicionar cursor al final
  if (urlbar.select) {
    urlbar.select();
    if (urlbar.value && typeof urlbar.setSelectionRange === "function") {
      urlbar.setSelectionRange(urlbar.value.length, urlbar.value.length);
    }
  }
};

// Asegurar que el script corre en el contexto correcto
if (document.location.protocol === "about:" || document.location.protocol === "chrome:") {
  // Escuchar el evento global de teclado
  document.addEventListener("keydown", (e) => {
    const inInput =
      e.target instanceof HTMLInputElement ||
      e.target instanceof HTMLTextAreaElement ||
      e.target.isContentEditable;

    if (inInput) return;

    if (e.key === " " && e.shiftKey) {
      e.preventDefault();
      activateUrlbarWithPercent();
    }
  });
}
