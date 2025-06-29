// Sidebar click to switch sections
const fileItems = document.querySelectorAll('.file-item');
const sections = document.querySelectorAll('.section');
const tab = document.querySelector('.tab');

fileItems.forEach(item => {
  item.addEventListener('click', () => {
    fileItems.forEach(f => f.classList.remove('active'));
    sections.forEach(s => s.classList.remove('active'));
    item.classList.add('active');

    const sectionId = item.getAttribute('data-section');
    const section = document.getElementById(sectionId);
    if (section) {
      section.classList.add('active');
      tab.textContent = `${sectionId}.html ✖`;
    }
  });
});

// Folder toggle (if you later use folder-style UI)
const folders = document.querySelectorAll('.folder');
folders.forEach(folder => {
  folder.addEventListener('click', (e) => {
    e.stopPropagation();
    folder.classList.toggle('open');
  });
});

// Clock
function updateClock() {
  const clock = document.getElementById('clock');
  const now = new Date();
  clock.textContent = `🕓 ${now.toLocaleTimeString()}`;
}
setInterval(updateClock, 1000);
updateClock();

// Theme toggle with localStorage
const themeToggle = document.getElementById('themeToggle');
const savedTheme = localStorage.getItem('theme');

if (savedTheme === 'light') {
  document.body.classList.add('light');
  themeToggle.textContent = '🌞';
}

themeToggle.addEventListener('click', () => {
  document.body.classList.toggle('light');
  const isLight = document.body.classList.contains('light');
  themeToggle.textContent = isLight ? '🌞' : '🌙';
  localStorage.setItem('theme', isLight ? 'light' : 'dark');
});

// Typing animation
const typedText = document.getElementById("typed-text");
const aboutMessages = [
  "Hi, I'm Amit Choudhary 👋",
  "Web Developer 💻",
  "I build cool web projects 🚀",
  "Welcome to my portfolio 🔍"
];

let messageIndex = 0;
let charIndex = 0;

function typeNextChar() {
  if (charIndex < aboutMessages[messageIndex].length) {
    typedText.textContent += aboutMessages[messageIndex].charAt(charIndex);
    charIndex++;
    setTimeout(typeNextChar, 100);
  } else {
    setTimeout(() => {
      eraseText();
    }, 1500);
  }
}

function eraseText() {
  if (charIndex > 0) {
    typedText.textContent = aboutMessages[messageIndex].substring(0, charIndex - 1);
    charIndex--;
    setTimeout(eraseText, 50);
  } else {
    messageIndex = (messageIndex + 1) % aboutMessages.length;
    setTimeout(typeNextChar, 800);
  }
}
setTimeout(typeNextChar, 1000);

// Search feature
const searchInput = document.getElementById('searchInput');
searchInput.addEventListener('input', () => {
  const keyword = searchInput.value.trim().toLowerCase();

  // Remove existing highlights
  sections.forEach(section => {
    section.innerHTML = section.innerHTML.replace(/<span class=\"highlight\">(.*?)<\\/span>/gi, '$1');
  });

  if (keyword === '') return;

  // Highlight matches in the active section
  const activeSection = document.querySelector('.section.active');
  const regex = new RegExp(`(${keyword})`, 'gi');
  activeSection.innerHTML = activeSection.innerHTML.replace(regex, '<span class=\"highlight\">$1</span>');
});
