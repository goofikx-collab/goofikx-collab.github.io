import { gsap } from "gsap";

// Плавный въезд карточки профиля при загрузке страницы
gsap.fromTo(".discord-card", 
  {
    opacity: 0,
    scale: 0.50,
    y: 20000
  },
  {
    opacity: 1,
    scale: 1,
    y: 0,
    duration: 0.8,
    ease: "power3.out"
  }
);

// --- Анимация Орбит ---

// Массив данных для каждого объекта на орбите
const orbitData = [
  { element: "#item-1", orbit: "#orbit-1", duration: 10, delay: 0 },
  { element: "#item-2", orbit: "#orbit-2", duration: 15, delay: 0.3 },
  { element: "#item-3", orbit: "#orbit-3", duration: 20, delay: 0.6 }
];

// Функция для вычисления координат по кругу
const setPointOnCircle = (progress, circle, elementId) => {
  const radius = circle.offsetWidth / 2;
  const centerX = 0; // Центр системы
  const centerY = 0;
  
  // Вычисляем координаты
  const radians = progress * 2 * Math.PI;
  const x = centerX + radius * Math.cos(radians);
  const y = centerY + radius * Math.sin(radians);
  
  // Устанавливаем координаты для элемента
  gsap.set(elementId, {
    x: x,
    y: y,
    overwrite: true // Предотвращает конфликт анимаций
  });
};

// Запускаем бесконечную анимацию для каждого объекта
orbitData.forEach(item => {
  const circleEl = document.querySelector(item.orbit);
  const elementId = item.element;
  
  // Создаем временную шкалу (Timeline) для управления прогрессом
  const tl = gsap.timeline({
    repeat: -1, // Бесконечное повторение
    delay: item.delay // Задержка старта
  });

  // Анимируем прогресс от 0 до 1
  tl.to(item, {
    progress: 1,
    duration: item.duration,
    ease: "linear", // Линейное движение без ускорения
    onUpdate: function() {
      // Каждый кадр вызываем функцию для пересчета координат
      setPointOnCircle(this.progress(), circleEl, elementId);
    }
  });
});
