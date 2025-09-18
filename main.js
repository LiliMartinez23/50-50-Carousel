// main.js
(() => {
  const carousel = document.querySelector('.fifty_fifty_carousel');
  if (!carousel) return;

  const items = Array.from(carousel.querySelectorAll('.fifty_fifty_item'));
  if (items.length === 0) return;

  let index = 0;
  let touchStartX = 0;
  let touchEndX = 0;

  // Style container for sliding
  carousel.style.display = 'flex';
  carousel.style.overflow = 'hidden';
  carousel.style.position = 'relative';
  carousel.style.width = `${items[0].offsetWidth}px`; // lock container to item width

  // Row of items
  const track = document.createElement('div');
  track.style.display = 'flex';
  track.style.transition = 'transform 0.5s ease';
  track.style.width = `${items.length * items[0].offsetWidth}px`;

  // Move items into track
  items.forEach((el) => {
    track.appendChild(el);
  });
  carousel.appendChild(track);

  function updatePosition() {
    const offset = -index * items[0].offsetWidth;
    track.style.transform = `translateX(${offset}px)`;
  }

  function next() {
    index = (index + 1) % items.length;
    updatePosition();
  }

  function prev() {
    index = (index - 1 + items.length) % items.length;
    updatePosition();
  }

  // Button clicks
  carousel.addEventListener('click', (e) => {
    if (e.target.closest('.fifty_fifty_button_left')) prev();
    if (e.target.closest('.fifty_fifty_button_right')) next();
  });

  // Keyboard navigation
  document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') prev();
    if (e.key === 'ArrowRight') next();
  });

  // Touch swipe
  carousel.addEventListener('touchstart', (e) => {
    if (!e.touches?.length) return;
    touchStartX = e.touches[0].clientX;
  }, { passive: true });

  carousel.addEventListener('touchmove', (e) => {
    if (!e.touches?.length) return;
    touchEndX = e.touches[0].clientX;
  }, { passive: true });

  carousel.addEventListener('touchend', () => {
    const delta = touchEndX - touchStartX;
    const threshold = 50;
    if (Math.abs(delta) > threshold) {
      if (delta < 0) next();
      else prev();
    }
    touchStartX = 0;
    touchEndX = 0;
  });

  // Init
  updatePosition();
})();
