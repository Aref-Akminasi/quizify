const darkMode = document.getElementById('darkmode')!;

darkMode.addEventListener('click', () => {
  document.documentElement.classList.toggle('dark');
});
