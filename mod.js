// Esperar a que la UI principal esté cargada
window.addEventListener("DOMContentLoaded", () => {
  // Selector típico de la barra de URL en Zen (puede variar según versión)
  const urlbar =
    document.getElementById("urlbar") ||
    document.querySelector("#urlbar");

  if (!urlbar) {
    console.warn("[Simple Search] URL bar not found.");
    return;
  }

  // Función para activar la URL bar y escribir "% "
  const activateUrlbarWithPercent = () => {
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
      urlbar.setSelectionRange(urlbar.value.length, urlbar.value.length);
    }
  };

  // Detectar presión de Shift + Space (fuera de campos de texto)
  document.addEventListener("keydown", (e) => {
    const inInput =
      e.target instanceof HTMLInputElement ||
      e.target instanceof HTMLTextAreaElement ||
      e.target.isContentEditable;

    // Evitar modificar el comportamiento dentro de campos de texto
    if (inInput) return;

    if (e.key === " " && e.shiftKey) {
      e.preventDefault(); // evitar desplazamiento de página
      activateUrlbarWithPercent();
    }
  });
});
