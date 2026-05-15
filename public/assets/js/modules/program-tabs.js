export function initProgramTabs() {
  window.showTab = (id, button) => {
    document.querySelectorAll('.prog-content').forEach((content) => {
      content.classList.remove('active');
    });

    document.querySelectorAll('.prog-tab').forEach((tab) => {
      tab.classList.remove('active');
    });

    document.getElementById(id)?.classList.add('active');
    button?.classList.add('active');
  };

  document.querySelector('.prog-tabs')?.addEventListener('click', (e) => {
    const btn = e.target.closest('.prog-tab');
    if (!btn || !e.currentTarget.contains(btn)) return;

    const id = btn.getAttribute('data-tab');
    if (!id) return;

    window.showTab(id, btn);
  });
}
