const bgImg = document.querySelector('.img-section img');
function updateBgImage() {
  bgImg.src = window.innerWidth <= 768
    ? 'assets/images/background-pattern-mobile.svg'
    : 'assets/images/background-pattern-desktop.svg';
}
updateBgImage();
window.addEventListener('resize', updateBgImage);

document.querySelectorAll('.accordion-question').forEach(button => {
  button.addEventListener('click', () => {
    const item = button.parentElement;
    const answer = item.querySelector('.accordion-answer');
    const isActive = button.classList.contains('active');

    document.querySelectorAll('.accordion-question').forEach(btn => {
      btn.classList.remove('active');
      btn.parentElement.querySelector('.accordion-answer').classList.remove('active');
    });

    if (!isActive) {
      button.classList.add('active');
      answer.classList.add('active');
    }
  });

  button.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      button.click();
    }
  });
});
