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
const itemWidth = items[0].offsetWidth + 30; // Ширина элемента с учетом gap
const originalItemCount = 4; // Количество уникальных изображений
const totalWidth = itemWidth * originalItemCount * 3; // Ширина трёх наборов
let currentTranslate = -originalItemCount * itemWidth; // Начало со среднего набора
let prevTranslate = currentTranslate;
let isDragging = false;

function setPosition() {
  carousel.style.transform = `translateX(${currentTranslate}px)`;
}

// Перетаскивание
carousel.addEventListener('mousedown', dragStart);
carousel.addEventListener('mousemove', drag);
carousel.addEventListener('mouseup', dragEnd);

function dragStart(event) {
  startPos = event.clientX;
  isDragging = true;
  carousel.style.transition = 'none';
}

function drag(event) {
  if (isDragging) {
    currentTranslate = prevTranslate + event.clientX - startPos;
    if (currentTranslate < -totalWidth) currentTranslate += totalWidth; // Бесконечность
    if (currentTranslate > 0) currentTranslate -= totalWidth;
    setPosition();
  }
}

function dragEnd() {
  isDragging = false;
  prevTranslate = currentTranslate;
  carousel.style.transition = 'transform 0.5s ease';
}

// Автоматическая смена каждые 5 секунд
setInterval(() => {
  if (!isDragging) {
    currentTranslate -= itemWidth;
    if (currentTranslate < -totalWidth) currentTranslate += totalWidth;
    carousel.style.transition = 'transform 0.5s ease';
    setPosition();
  }
}, 5000);

setPosition(); // Инициализация