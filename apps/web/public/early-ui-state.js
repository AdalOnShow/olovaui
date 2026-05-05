(() => {
  const root = document.documentElement;

  try {
    const savedTheme = localStorage.getItem("theme");
    const theme = savedTheme === "light" || savedTheme === "dark" ? savedTheme : "dark";

    root.classList.toggle("dark", theme === "dark");
    root.style.colorScheme = theme;

    if (localStorage.getItem("olova-ui-support-banner-dismissed")) {
      root.dataset.supportBannerDismissed = "true";
    }
  } catch {
    root.classList.add("dark");
    root.style.colorScheme = "dark";
  }
})();
