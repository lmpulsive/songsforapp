⸻

📁 README.md

# 🎮 JYNX Rhythm Game

Welcome to **JYNX**, a mobile-friendly rhythm game built using **HTML5 Canvas**, **CSS**, and **Vanilla JavaScript**. Inspired by games like *osu!* and *DDR*, this lightweight project is fully open-source and beginner-friendly!

---

## ✨ Features

- 🟣 Tap shrinking circles in time
- 🎯 Accuracy feedback (Perfect, Great, Good, OK)
- 💥 Particle effects on hits
- 📱 Responsive design for mobile + desktop
- 🧠 Zero dependencies – pure HTML, CSS, and JS

---

## 🧠 How It Works

### 🗂️ File Structure

jynx-rhythm-game/
├── index.html      # Main layout and game canvas
├── style.css       # UI & aesthetic styles
├── game.js         # All game logic + visuals
└── README.md       # This file

### 📄 index.html

Sets up the game layout and imports the other files:

- `<canvas>` → Where all gameplay is rendered
- `.ui` → Floating scoreboard (Score + Combo)
- `.start-screen` → Overlay with logo and Start button
- `<script src="game.js">` → Loads the game logic

### 🎨 style.css

Controls the entire visual experience:

- 🌌 Fullscreen radial-gradient background
- 🎛️ HUD styling (score, combo)
- 📲 Mobile scaling with media queries
- 🌈 Gradient logo text and glowing buttons

### 🧠 game.js

This is where the game magic happens:

#### 🧱 Game State

```js
let game = {
  playing: false,
  score: 0,
  combo: 0,
  circles: [],
  particles: [],
  nextNumber: 1
};

Tracks everything: score, combo, active notes, and particle effects.

🔵 Circle Class

class Circle {
  constructor(x, y) { ... }
  update() { ... }
  draw() { ... }
  hit(mx, my) { ... }
  getAccuracy() { ... }
}

Each Circle is a tappable note:
	•	Starts big (approachRadius)
	•	Shrinks over 1.5 seconds toward target hit time
	•	Disappears if missed

💥 Particle Class

Creates spark-style FX on successful hits.

class Particle {
  constructor(x, y) { ... }
  update() { ... }
  draw() { ... }
}

🖱️ Input Handling

canvas.addEventListener('click', ...)
canvas.addEventListener('touchstart', ...)

Supports both mouse and touch! Tapping checks if you hit an active circle, and calculates score based on your timing.

🔁 gameLoop()

The core animation loop:
	•	Clears canvas
	•	Updates/draws all circles and particles
	•	Occasionally spawns new circles
	•	Loops via requestAnimationFrame

🚀 startGame()

Called when the Start button is pressed:
	•	Hides the start screen
	•	Resets score, combo, notes
	•	Begins the main loop

⸻

🚀 Getting Started

✅ Open Locally

You don’t need a server! Just open the file:

# Clone the repo
git clone https://github.com/yourusername/jynx-rhythm-game.git
cd jynx-rhythm-game

# Open in your browser
open index.html

🌐 Or Host with GitHub Pages
	1.	Push to your GitHub repo
	2.	Go to Settings → Pages
	3.	Choose main branch and /root
	4.	Done! Game live at:

https://yourusername.github.io/jynx-rhythm-game/


⸻

🛠️ Roadmap
	•	🔊 Add audio + beat sync
	•	🎵 Support BPM & beatmaps
	•	🧩 Difficulty selector
	•	📝 Game-over & summary screen
	•	💬 Hit text (“Perfect!”, “Good!”)

⸻

🧪 Educational Notes

Concept	File	Explained In
Canvas Setup	index.html, game.js	<canvas> tag + getContext('2d') basics
Drawing	game.js	Uses ctx.arc(), ctx.fill(), and ctx.stroke()
Animation	game.js	requestAnimationFrame() loop explained
Input	game.js	Touch + mouse event listeners with hit detection
Styling	style.css	Gradients, fonts, mobile responsiveness


⸻

⸻

📄 License

MIT — free to modify and build on!

⸻


---


