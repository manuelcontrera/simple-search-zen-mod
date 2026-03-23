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

// Asegurar que solo se corre en la UI del navegador (not in web pages)
if (
  document.location.protocol === "about:" ||
  document.location.protocol === "chrome:"
) {
  document.addEventListener("keydown", (e) => {
    // Evitar conflicto dentro de campos de texto / editable
    const inInput =
      e.target instanceof HTMLInputElement ||
      e.target instanceof HTMLTextAreaElement ||
      e.target.isContentEditable;

    if (inInput) return;

    // Atajo: Ctrl + Space
    if (e.key === " " && e.ctrlKey && !e.shiftKey && !e.altKey && !e.metaKey) {
      e.preventDefault(); // Evitar desplazamiento de página
      activateUrlbarWithPercent();
    }
  });
}
