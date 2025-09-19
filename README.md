# 50-50-Carousel

This project is a responsive **50/50 Carousel component** built with **HTML, CSS, and JavaScript**. It features a split design layout with images on the left and styled controls panels on the right, including seamless looping, keyboard navigation, button controls, and touch/swipe support.

<img width="500" height="300" alt="image" style="align-items: center;" src="https://github.com/user-attachments/assets/05ef7731-b8ac-49b5-abaa-4c839b699148" />

## Features
- **Split Layout:** Each carousel item displays an image on the left and a styled content block on the right.
- **Multiple Themes:** Right-side panels come in **black, gray**, and **maroon** styles, using background images for variety.
- **Navigation Options:**
  - Arrow buttons for manual navigation.
  - Keyboard arrow keys (<-- / -->).
  - Swipe gestures for mobile / mobile devices.
- **Responsive-ready:** Built with flexbox; resize handling can be extended if needed.
- **Font Awesome Integration:** Uses icons for navigation arrows.

## Project Structure
```index.html```\
  --> ```app.css```\
  --> ```main.js```\
  --> ```img/```

## Getting Started
**Prequisites**
- A modern web browser (Chrome, Firefox, Edge, Safari).
- Local web server (optional, but recommended for testing).

  **Setup**
  1. Clone or download the project files.
  2. Ensure the ```img/``` folder contains the required assets:
    - ```fig-tamusa.jpg``` (carousel image)
    - ```50-50-Component-Black.png```
    - ```50-50-Component-Gray.png```
    - ```50-50-Component-Maroon.png```
  3. Open ```index.html``` in your browser.

## Usage
- Click the **left/right arrows** to navigate.
- Use your **keyboard arrow keys** (<-- and -->) for navigation.
- On touch devices, **swipe left or right** to change slides.
- Extend the ```<div class="fifty_fifty_item">``` blocks in ```index.html``` to add more items.

## Customization
- **Colors & Backgrounds:** Update the ```.fifty_fifty_right_*``` CSS classes in ```app.css``` to change panel styles.
- **Content:** Modify titles, text, and lists inside ```.fifty_fifty_content_gorup``` for each slide.
- **Carousel Behavior:** Adjust animation timing, transition effects, or swipe threshold in ```main.js```.

## Future Improvements
- Add **auto-play mode** with adjustble timing.
- Improve **responsive resizing** to handle various screen widths dynamically.
- Support for **dynami data** (e.g., JSON-driven slides).
