/**
 * Texte hier anpassen – Namen und persönliche Nachricht eintragen.
 */
const MESSAGES = {
  startHint: "Tippe hier, Mia",
  letterLabel: "Liebe Mia",
  title: "Ich liebe dich, Mia",
  body:
    "Mia, jeder Tag mit dir fühlt sich ein bisschen heller an. " +
    "Du bist das Schönste in meinem Leben – und ich wollte dir das einfach sagen.",
  sign: "Für immer deins",
  tapMore: "Tippe für mehr Herzen",
};

const scene = document.getElementById("scene");
const phaseStart = document.getElementById("phaseStart");
const phaseLetter = document.getElementById("phaseLetter");
const startBtn = document.getElementById("startBtn");
const startHint = document.getElementById("startHint");
const envelopeWrap = document.getElementById("envelopeWrap");
const letterTitle = document.getElementById("letterTitle");
const letterText = document.getElementById("letterText");
const letterSign = document.getElementById("letterSign");
const tapMore = document.getElementById("tapMore");
const heartsBg = document.getElementById("heartsBg");

let letterOpen = false;

function applyMessages() {
  startHint.textContent = MESSAGES.startHint;
  document.querySelector(".letter-label").textContent = MESSAGES.letterLabel;
  letterTitle.textContent = MESSAGES.title;
  letterText.textContent = MESSAGES.body;
  letterSign.textContent = MESSAGES.sign;
  tapMore.textContent = MESSAGES.tapMore;
}

function spawnHeart(x, y) {
  const heart = document.createElement("span");
  heart.className = "heart-float";
  heart.textContent = "♥";
  heart.style.left = x != null ? `${x}px` : `${Math.random() * 100}%`;
  heart.style.bottom = y != null ? `${window.innerHeight - y}px` : "-2rem";
  heart.style.fontSize = `${0.75 + Math.random() * 1.25}rem`;
  heart.style.setProperty("--duration", `${3 + Math.random() * 3}s`);
  heart.style.setProperty("--spin", `${-30 + Math.random() * 60}deg`);
  heart.style.color = Math.random() > 0.5 ? "#e8a4b8" : "#c96b8a";
  heartsBg.appendChild(heart);
  heart.addEventListener("animationend", () => heart.remove());
}

function burstHearts(count) {
  for (let i = 0; i < count; i++) {
    setTimeout(() => {
      spawnHeart(
        window.innerWidth * (0.2 + Math.random() * 0.6),
        window.innerHeight * (0.4 + Math.random() * 0.3)
      );
    }, i * 120);
  }
}

function openLetter() {
  if (letterOpen) return;
  letterOpen = true;

  phaseStart.classList.remove("active");
  phaseLetter.classList.add("active");
  phaseLetter.removeAttribute("aria-hidden");
  phaseStart.setAttribute("aria-hidden", "true");

  requestAnimationFrame(() => {
    envelopeWrap.classList.add("open");
    burstHearts(12);

    setTimeout(() => {
      tapMore.hidden = false;
      tapMore.classList.add("visible");
    }, 2200);
  });
}

function onLetterTap(event) {
  if (!letterOpen) return;
  const x = event.clientX ?? window.innerWidth / 2;
  const y = event.clientY ?? window.innerHeight / 2;
  for (let i = 0; i < 4; i++) {
    spawnHeart(x + (Math.random() - 0.5) * 60, y);
  }
}

applyMessages();

startBtn.addEventListener("click", openLetter);
startBtn.addEventListener("keydown", (e) => {
  if (e.key === "Enter" || e.key === " ") {
    e.preventDefault();
    openLetter();
  }
});

phaseLetter.addEventListener("click", onLetterTap);
phaseLetter.addEventListener("touchstart", (e) => {
  if (letterOpen && e.touches[0]) {
    onLetterTap(e.touches[0]);
  }
}, { passive: true });
