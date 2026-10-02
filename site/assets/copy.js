// Copies the install command in the hero. The clipboard refuses under file:// or without
// permission; the button then says so instead of pretending it worked.
document.querySelectorAll("[data-copy]").forEach((button) => {
  button.addEventListener("click", async () => {
    const text = document.getElementById(button.dataset.copy).innerText;
    try {
      await navigator.clipboard.writeText(text);
      button.textContent = button.dataset.copied;
    } catch {
      button.textContent = button.dataset.failed;
    }
    setTimeout(() => { button.textContent = button.dataset.label; }, 2000);
  });
});
