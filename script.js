document.addEventListener('DOMContentLoaded', () => {
  // === 1. ПЕРЕКЛЮЧЕНИЕ ВКЛАДОК ===
  const tabs = document.querySelectorAll('.tab');
  const panes = document.querySelectorAll('.tab-pane');

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => t.classList.remove('active'));
      panes.forEach(p => p.classList.remove('active'));

      tab.classList.add('active');

      const targetTabId = 'tab-' + tab.getAttribute('data-tab');
      const targetPane = document.getElementById(targetTabId);

      if (targetPane) {
        targetPane.classList.add('active');
      }
    });
  });

  // === 2. КОПИРОВАНИЕ ДИСКОРД НИКА ===
  const discordBtn = document.getElementById('discord-btn');
  if (discordBtn) {
    discordBtn.addEventListener('click', () => {
      const nickLabel = document.getElementById('discord-nick');
      const nickText = nickLabel.innerText.replace('@', '').trim();
      
      navigator.clipboard.writeText(nickText).then(() => {
        const originalText = nickLabel.innerText;
        nickLabel.innerText = 'Copied!';
        setTimeout(() => { nickLabel.innerText = originalText; }, 2000);
      }).catch(err => {
        console.error('Не удалось скопировать ник: ', err);
      });
    });
  }

  // === 3. АВТОМАТИЧЕСКАЯ ПОДГРУЗКА 30 ОБЛОЖЕК ===
  const coversContainer = document.getElementById('covers-container');
  const totalCovers = 30; // Твоё точное число обложек

  if (coversContainer) {
    for (let i = 1; i <= totalCovers; i++) {
      const img = document.createElement('img');
      img.src = `/src/assets/covers/${i}.jpg`;
      img.classList.add('music-slide');
      img.alt = `Cover ${i}`;
      
      // Первой картинке даём класс active, чтобы её было видно
      if (i === 1) {
        img.classList.add('active');
      }
      
      coversContainer.appendChild(img);
    }
  }
});

// === 4. ПРОКРУТКА ОБЛОЖЕК (СЛАЙДЕР) ===
let currentSlideIndex = 0;

function changeSlide(direction) {
  const slides = document.querySelectorAll('.music-slide');
  if (slides.length === 0) return;

  slides[currentSlideIndex].classList.remove('active');
  
  currentSlideIndex += direction;

  if (currentSlideIndex < 0) {
    currentSlideIndex = slides.length - 1;
  }
  if (currentSlideIndex >= slides.length) {
    currentSlideIndex = 0;
  }

  slides[currentSlideIndex].classList.add('active');
}
