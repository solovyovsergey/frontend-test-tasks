document.addEventListener('DOMContentLoaded', () => {
  const slider = document.getElementById('cardsArea');
  if (!slider) return;

  // Константы конфигурации (вместо магических чисел)
  const WHEEL_SPEED = 1.2;
  const DRAG_SPEED = 1.5;
  const DRAG_THRESHOLD = 5;

  let isDown = false;
  let startX;
  let scrollLeft;
  let isDragging = false;

  // Прокрутка колесом мыши
  slider.addEventListener(
    'wheel',
    (e) => {
      if (e.deltaY !== 0) {
        e.preventDefault();
        slider.scrollLeft += e.deltaY * WHEEL_SPEED;
      }
    },
    { passive: false },
  );

  // Логика Drag-to-Scroll
  slider.addEventListener('mousedown', (e) => {
    if (e.button !== 0) return;
    isDown = true;
    isDragging = false;
    startX = e.pageX - slider.offsetLeft;
    scrollLeft = slider.scrollLeft;
  });

  slider.addEventListener('mouseleave', () => {
    isDown = false;
  });

  slider.addEventListener('mouseup', () => {
    isDown = false;
  });

  slider.addEventListener('mousemove', (e) => {
    if (!isDown) return;
    e.preventDefault();

    const x = e.pageX - slider.offsetLeft;
    const walk = (x - startX) * DRAG_SPEED;

    if (Math.abs(x - startX) > DRAG_THRESHOLD) {
      isDragging = true;
    }

    slider.scrollLeft = scrollLeft - walk;
  });

  // Предотвращение ложного клика по ссылкам после перетаскивания
  slider.addEventListener(
    'click',
    (e) => {
      if (isDragging) {
        e.preventDefault();
        e.stopPropagation();
      }
    },
    true,
  );
});
