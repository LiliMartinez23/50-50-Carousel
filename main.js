(() => {
  const carousel = document.querySelector('.fifty_fifty_carousel');
  if (!carousel) return;

  // Collect initial items (real slides)
  const realItems = Array.from(carousel.querySelectorAll('.fifty_fifty_item'));
  if (realItems.length === 0) return;

  let index = 1; // start at first REAL slide after we add the leading clone
  let touchStartX = 0;
  let touchEndX = 0;

  // Measure once (you can add a resize handler if your slides are responsive)
  const itemWidth = realItems[0].offsetWidth;

  // Style container for sliding
  //carousel.style.display = 'flex';
  carousel.style.overflow = 'hidden';
  carousel.style.position = 'relative';
  carousel.style.width = `${itemWidth}px`; // lock container to item width

  // Create track (row)
  const track = document.createElement('div');
  track.style.display = 'flex';
  track.style.transition = 'transform 0.5s ease';
  track.style.willChange = 'transform';

  // Build slides = [lastClone, ...realItems, firstClone]
  const firstClone = realItems[0].cloneNode(true);
  const lastClone = realItems[realItems.length - 1].cloneNode(true);

  // To avoid duplicate IDs inside clones, strip IDs if your markup uses them
  [firstClone, lastClone].forEach(el => el.removeAttribute('id'));

  track.appendChild(lastClone);
  realItems.forEach(el => track.appendChild(el));
  track.appendChild(firstClone);

  // Set track width to account for clones
  track.style.width = `${(realItems.length + 2) * itemWidth}px`;
  carousel.appendChild(track);

  function setTransition(enabled) {
    track.style.transition = enabled ? 'transform 0.5s ease' : 'none';
  }

  function updatePosition() {
    const offset = -index * itemWidth + 20; // no magic +20
    track.style.transform = `translateX(${offset}px)`;
  }

  function next() {
    index++; // always go forward
    setTransition(true);
    updatePosition();
  }

  function prev() {
    index--; // go backward when needed (left arrow / swipe right)
    setTransition(true);
    updatePosition();
  }

  // Seamless looping: after each animated move, correct if we’re on a clone
  track.addEventListener('transitionend', () => {
    // Moved past the last REAL slide onto the appended firstClone
    if (index === realItems.length + 1) {
      setTransition(false);     // turn off transition for the instant jump
      index = 1;                // jump to the real first slide
      updatePosition();
      // Force reflow so the next transition re-enables cleanly
      // eslint-disable-next-line no-unused-expressions
      track.offsetHeight;
      setTransition(true);
    }
    // Moved before the first REAL slide onto the prepended lastClone
    if (index === 0) {
      setTransition(false);
      index = realItems.length; // jump to the real last slide
      updatePosition();
      // eslint-disable-next-line no-unused-expressions
      track.offsetHeight;
      setTransition(true);
    }
  });

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

  // Init: position track to the first REAL slide
  setTransition(false);
  updatePosition();
  // eslint-disable-next-line no-unused-expressions
  track.offsetHeight; // reflow
  setTransition(true);

  // Optional: handle resizes if slides are responsive
  // window.addEventListener('resize', () => { ...recompute widths/position... });
})();
