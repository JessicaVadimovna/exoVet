// Функция для плавной прокрутки к секции
function scrollToSection(sectionId) {
  document.getElementById(sectionId).scrollIntoView({ behavior: "smooth" });
}

// Функция для переключения темы
function toggleTheme() {
  const body = document.body;
  const toggleSlider = document.querySelector(".toggle-slider");

  if (body.classList.contains("dark-theme")) {
    body.classList.remove("dark-theme");
    localStorage.setItem("theme", "light");
    toggleSlider.style.transform = "translateX(2px)";
  } else {
    body.classList.add("dark-theme");
    localStorage.setItem("theme", "dark");
    toggleSlider.style.transform = "translateX(32px)";
  }
}

// Функция для переключения бургер-меню
function toggleMenu() {
  const navMenu = document.querySelector(".nav-menu");
  const menuToggle = document.querySelector(".menu-toggle");

  navMenu.classList.toggle("active");
  menuToggle.classList.toggle("active");
  menuToggle.textContent = menuToggle.classList.contains("active") ? "✖" : "☰";
}

// Функция для закрытия меню
function closeMenu() {
  const navMenu = document.querySelector(".nav-menu");
  const menuToggle = document.querySelector(".menu-toggle");

  navMenu.classList.remove("active");
  menuToggle.classList.remove("active");
  menuToggle.textContent = "☰";
}

// Инициализация аккордеона для услуг на мобильных
function initAccordion() {
  if (window.innerWidth <= 768) {
    const serviceItems = document.querySelectorAll(".service-item");
    serviceItems.forEach(item => {
      const header = item.querySelector("h3");
      header.addEventListener("click", () => {
        const isActive = item.classList.contains("active");
        serviceItems.forEach(i => i.classList.remove("active"));
        if (!isActive) {
          item.classList.add("active");
        }
      });
    });
  }
}

// Проверка сохраненной темы и настройка при загрузке страницы
document.addEventListener("DOMContentLoaded", () => {
  const savedTheme = localStorage.getItem("theme");
  const toggleSlider = document.querySelector(".toggle-slider");

  if (savedTheme === "dark" || (!savedTheme && window.matchMedia("(prefers-color-scheme: dark)").matches)) {
    document.body.classList.add("dark-theme");
    localStorage.setItem("theme", "dark");
    toggleSlider.style.transform = "translateX(32px)";
  } else {
    document.body.classList.remove("dark-theme");
    localStorage.setItem("theme", "light");
    toggleSlider.style.transform = "translateX(2px)";
  }

  // Добавляем обработчик клика на иконку бургера
  const menuToggle = document.querySelector(".menu-toggle");
  menuToggle.addEventListener("click", toggleMenu);

  // Закрытие меню при клике вне его
  document.addEventListener("click", (event) => {
    const navMenu = document.querySelector(".nav-menu");
    const menuToggle = document.querySelector(".menu-toggle");

    if (!navMenu.contains(event.target) && !menuToggle.contains(event.target) && navMenu.classList.contains("active")) {
      closeMenu();
    }
  });

});

// Карусель 
const scrollers = document.querySelectorAll('.scroller');

if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
  addAnimation();
}

function addAnimation() {
  scrollers.forEach((scroller) => {
    scroller.setAttribute("data-animated", "true");
    
    const scrollerInner = scroller.querySelector(".scroller__inner");
    const scrollerContent = Array.from(scrollerInner.children);

    scrollerContent.forEach((item) => {
      const duplicatedItem = item.cloneNode(true);
      duplicatedItem.setAttribute("aria-hidden", "true");
      scrollerInner.appendChild(duplicatedItem);
    });
  });
}

function scrollToSection(sectionId) {
  document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
}

// Слайдер

document.addEventListener('DOMContentLoaded', function () {
  const slides = document.querySelectorAll('.slide');
  const dots = document.querySelectorAll('.dot');
  const slider = document.querySelector('.slider');
  let currentSlide = 0;
  let slideInterval = setInterval(nextSlide, 5000);

  // Функция для показа слайда
  function showSlide(index) {
    slides[currentSlide].classList.remove('active');
    dots[currentSlide].classList.remove('active');

    currentSlide = (index + slides.length) % slides.length; // Цикличность
    slides[currentSlide].classList.add('active');
    dots[currentSlide].classList.add('active');

    // Устанавливаем высоту слайдера под активный слайд
    const activeSlideHeight = slides[currentSlide].offsetHeight;
    slider.style.height = `${activeSlideHeight}px`;
  }

  // Переключение на следующий слайд
  function nextSlide() {
    showSlide(currentSlide + 1);
  }

  // Инициализация
  showSlide(currentSlide); // Показываем первый слайд и задаем высоту

  // Обработчики кликов на точки
  dots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
      clearInterval(slideInterval);
      showSlide(index);
      slideInterval = setInterval(nextSlide, 5000);
    });
  });
});


// Карусель
const carousel = document.querySelector('.carousel');
const items = document.querySelectorAll('.carousel-item');
const gap = 30; // Расстояние между элементами из CSS
let itemWidth = items[0].offsetWidth + gap; // Ширина элемента с учетом gap
const totalItems = items.length;
let totalWidth = totalItems * itemWidth; // Общая ширина
let currentIndex = 4; // Начальная позиция (с 5-го элемента)
let isDragging = false;
let startPos = 0;
let animationFrame;

// Клонируем элементы для бесконечного эффекта
const firstClones = [];
const lastClones = [];

for (let i = 0; i < 4; i++) { // Клонируем 4 первых и 4 последних элемента
  const firstClone = items[i].cloneNode(true);
  const lastClone = items[totalItems - 1 - i].cloneNode(true);
  firstClone.classList.add('clone');
  lastClone.classList.add('clone');
  firstClones.push(firstClone);
  lastClones.unshift(lastClone);
  carousel.appendChild(firstClone);
  carousel.insertBefore(lastClone, items[0]);
}

const allItems = document.querySelectorAll('.carousel-item');

carousel.style.transform = `translateX(${-itemWidth * currentIndex}px)`;

function setPosition(instant = false) {
  if (instant) {
    carousel.style.transition = 'none';
  } else {
    carousel.style.transition = 'transform 0.5s ease';
  }
  carousel.style.transform = `translateX(${-itemWidth * currentIndex}px)`;
}

// Проверка границ и корректировка
function checkLoop() {
  if (currentIndex >= totalItems + 4) {
    setTimeout(() => {
      currentIndex = 4;
      setPosition(true);
    }, 500);
  } else if (currentIndex <= 3) {
    setTimeout(() => {
      currentIndex = totalItems + 3;
      setPosition(true);
    }, 500);
  }
}

// Обработчики касаний (для мобильных устройств)
carousel.addEventListener('touchstart', touchStart);
carousel.addEventListener('touchmove', touchMove);
carousel.addEventListener('touchend', touchEnd);

function touchStart(event) {
  startPos = event.touches[0].clientX;
  isDragging = true;
  carousel.style.transition = 'none';
  cancelAnimationFrame(animationFrame);
}

function touchMove(event) {
  if (isDragging) {
    const currentPosition = event.touches[0].clientX;
    let diff = (currentPosition - startPos) / itemWidth;
    carousel.style.transform = `translateX(${-itemWidth * (currentIndex - diff)}px)`;
  }
}

function touchEnd() {
  isDragging = false;
  currentIndex = Math.round(currentIndex - (startPos - event.changedTouches[0].clientX) / itemWidth);
  setPosition();
  checkLoop();
}

// Автоматическая прокрутка каждые 5 секунд
function autoSlide() {
  if (!isDragging) {
    currentIndex++;
    setPosition();
    checkLoop();
  }
  animationFrame = requestAnimationFrame(() => setTimeout(autoSlide, 5000));
}

setTimeout(autoSlide, 5000);

// Обновление размеров карусели при изменении экрана
function updateCarousel() {
  itemWidth = items[0].offsetWidth + gap;
  totalWidth = totalItems * itemWidth;
  setPosition(true);
}

window.addEventListener('resize', updateCarousel);

// Устанавливаем начальную позицию
setPosition(true);


