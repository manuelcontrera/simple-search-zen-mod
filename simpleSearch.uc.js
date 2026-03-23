// ==UserScript==
// @name           Simple Search
// @description    Ctrl+Space or Shift+Space to activate tab search with %
// @author         manuelcontrera
// @version        2.0.0
// @include        main
// ==/UserScript==

(function () {
  "use strict";

  // Cambia a false para usar Shift + Space
  const USE_CTRL = true;

  const handleKeydown = (e) => {
    const isCtrlSpace  = e.key === " " && e.ctrlKey  && !e.shiftKey && !e.altKey;
    const isShiftSpace = e.key === " " && e.shiftKey && !e.ctrlKey  && !e.altKey;

    if ((USE_CTRL && isCtrlSpace) || (!USE_CTRL && isShiftSpace)) {
      e.preventDefault();
      e.stopPropagation();

      const urlbar = window.gURLBar;
      if (!urlbar) return;

      urlbar.focus();
      urlbar.value = "";
      urlbar.search("% ", { searchModeEntry: "typed" });
    }
  };

  window.addEventListener("keydown", handleKeydown, true);
})();
