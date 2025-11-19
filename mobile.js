// mobile.js
(() => {
  // Only activate this behavior on mobile width (<= 430px)
  const isMobile = window.matchMedia('(max-width: 430px)').matches;
  if (!isMobile) return;

  const carousels = document.querySelectorAll('.fifty_fifty_carousels');
  if (!carousels.length) return;

  carousels.forEach((container) => {
    const items = Array.from(container.querySelectorAll('.fifty_fifty_item'));
    if (!items.length) return;

    let currentIndex = 0;
    let itemWidth = 0;

    // Wrap all slides in a track for horizontal sliding
    const track = document.createElement('div');
    track.classList.add('ff-track');
    track.style.display = 'flex';
    track.style.transition = 'transform 0.4s ease';
    track.style.willChange = 'transform';

    items.forEach((item) => {
      track.appendChild(item);
    });

    // Clear container and insert the track
    container.innerHTML = '';
    container.style.overflow = 'hidden';
    container.appendChild(track);

    function measure() {
      // Use container width as slide width, fallback to 430px
      const containerWidth = container.clientWidth || 430;
      itemWidth = containerWidth;

      items.forEach((item) => {
        item.style.minWidth = `${containerWidth}px`;
        item.style.maxWidth = `${containerWidth}px`;
      });

      updatePosition();
    }

    function updatePosition() {
      track.style.transform = `translateX(${-currentIndex * itemWidth}px)`;
    }

    function goTo(index) {
      const maxIndex = items.length - 1;
      if (index < 0) index = 0;
      if (index > maxIndex) index = maxIndex;
      currentIndex = index;
      updatePosition();
    }

    function next() {
      goTo(currentIndex + 1);
    }

    function prev() {
      goTo(currentIndex - 1);
    }

    // Click controls (using the buttons inside each slide)
    container.addEventListener('click', (event) => {
      if (event.target.closest('.fifty_fifty_button_right')) {
        next();
      } else if (event.target.closest('.fifty_fifty_button_left')) {
        prev();
      }
    });

    // Basic touch swipe support
    let startX = 0;
    let currentX = 0;

    container.addEventListener(
      'touchstart',
      (event) => {
        if (!event.touches || !event.touches.length) return;
        startX = event.touches[0].clientX;
        currentX = startX;
      },
      { passive: true }
    );

    container.addEventListener(
      'touchmove',
      (event) => {
        if (!event.touches || !event.touches.length) return;
        currentX = event.touches[0].clientX;
      },
      { passive: true }
    );

    container.addEventListener('touchend', () => {
      const deltaX = currentX - startX;
      const threshold = 50; // px

      if (Math.abs(deltaX) > threshold) {
        if (deltaX < 0) {
          next();  // swipe left -> next slide
        } else {
          prev();  // swipe right -> previous slide
        }
      }

      startX = 0;
      currentX = 0;
    });

    // Initial size + keep it responsive on orientation changes
    measure();
    window.addEventListener('resize', measure);
  });
})();
