// 复制 hero 里的 docker run。file:// 或无权限时剪贴板会拒绝，按钮如实说失败。
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
