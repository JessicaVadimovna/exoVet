// Функция для плавной прокрутки к секции
function scrollToSection(sectionId) {
  document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
}

// Функция для переключения бургер-меню
function toggleMenu(event) {
  event.stopPropagation();
  const navMenu = document.querySelector('.nav-menu');
  const menuToggle = document.querySelector('.menu-toggle');
  navMenu.classList.toggle('active');
  menuToggle.classList.toggle('active');
  menuToggle.textContent = menuToggle.classList.contains('active') ? '✖' : '☰';
}

// Функция для закрытия меню
function closeMenu() {
  const navMenu = document.querySelector('.nav-menu');
  const menuToggle = document.querySelector('.menu-toggle');
  navMenu.classList.remove('active');
  menuToggle.classList.remove('active');
  menuToggle.textContent = '☰';
}

// Инициализация бургер-меню
document.addEventListener('DOMContentLoaded', () => {
  const menuToggle = document.querySelector('.menu-toggle');
  if (menuToggle) {
    menuToggle.addEventListener('click', toggleMenu);
  }

  document.addEventListener('click', (event) => {
    const navMenu = document.querySelector('.nav-menu');
    const menuToggle = document.querySelector('.menu-toggle');
    if (!navMenu.contains(event.target) && !menuToggle.contains(event.target) && navMenu.classList.contains('active')) {
      closeMenu();
    }
  });
});

// Слайдер
document.addEventListener('DOMContentLoaded', () => {
  const slides = document.querySelectorAll('.slide');
  const dots = document.querySelectorAll('.dot');
  const slider = document.querySelector('.slider');
  let currentSlide = 0;
  let slideInterval = setInterval(nextSlide, 5000);
  let touchStartX = 0;
  let touchEndX = 0;
  const touchThreshold = 50;

  function showSlide(index) {
    slides[currentSlide].classList.remove('active');
    dots[currentSlide].classList.remove('active');
    currentSlide = (index + slides.length) % slides.length;
    slides[currentSlide].classList.add('active');
    dots[currentSlide].classList.add('active');
    const activeSlideHeight = slides[currentSlide].offsetHeight;
    slider.style.height = `${activeSlideHeight}px`;
  }

  function nextSlide() {
    showSlide(currentSlide + 1);
  }

  function prevSlide() {
    showSlide(currentSlide - 1);
  }

  showSlide(currentSlide);

  dots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
      clearInterval(slideInterval);
      showSlide(index);
      slideInterval = setInterval(nextSlide, 5000);
    });
  });

  slider.addEventListener('touchstart', (e) => {
    touchStartX = e.touches[0].clientX;
  });

  slider.addEventListener('touchmove', (e) => {
    touchEndX = e.touches[0].clientX;
  });

  slider.addEventListener('touchend', () => {
    const touchDistance = touchStartX - touchEndX;
    if (Math.abs(touchDistance) > touchThreshold) {
      clearInterval(slideInterval);
      if (touchDistance > 0) {
        nextSlide();
      } else {
        prevSlide();
      }
      slideInterval = setInterval(nextSlide, 5000);
    }
  });
});

// Карусель
document.addEventListener('DOMContentLoaded', () => {
  const carousel = document.querySelector('.carousel');
  const items = document.querySelectorAll('.carousel-item:not(.clone)');
  const gap = 30;
  let itemWidth = items[0].offsetWidth + gap;
  const totalItems = items.length;
  let currentIndex = 4;
  let animationFrame;

  // Клонирование элементов для бесконечной карусели
  for (let i = 0; i < 4; i++) {
    const firstClone = items[i].cloneNode(true);
    const lastClone = items[totalItems - 1 - i].cloneNode(true);
    firstClone.classList.add('clone');
    lastClone.classList.add('clone');
    carousel.appendChild(firstClone);
    carousel.insertBefore(lastClone, items[0]);
  }

  carousel.style.transform = `translateX(${-itemWidth * currentIndex}px)`;

  function setPosition(instant = false) {
    carousel.style.transition = instant ? 'none' : 'transform 0.5s ease';
    carousel.style.transform = `translateX(${-itemWidth * currentIndex}px)`;
  }

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

  function autoSlide() {
    currentIndex++;
    setPosition();
    checkLoop();
    animationFrame = requestAnimationFrame(() => setTimeout(autoSlide, 5000));
  }

  setTimeout(autoSlide, 5000);

  function updateCarousel() {
    itemWidth = items[0].offsetWidth + gap;
    setPosition(true);
  }

  window.addEventListener('resize', updateCarousel);
  setPosition(true);

  // Функциональность модального окна для изображений
  const modal = document.getElementById('imageModal');
  const modalImg = document.getElementById('modalImage');
  const closeBtn = document.querySelector('.close');
  const carouselImages = document.querySelectorAll('.carousel-item img:not(.clone img)');

  carouselImages.forEach(img => {
    img.addEventListener('click', function() {
      modal.style.display = 'block';
      modalImg.src = this.src;
      document.body.style.overflow = 'hidden'; // Отключаем прокрутку
    });
  });

  closeBtn.addEventListener('click', function() {
    modal.style.display = 'none';
    document.body.style.overflow = 'auto'; // Включаем прокрутку обратно
  });

  // Закрытие при клике вне изображения
  modal.addEventListener('click', function(e) {
    if (e.target === modal) {
      modal.style.display = 'none';
      document.body.style.overflow = 'auto';
    }
  });

  // Закрытие по клавише Esc
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && modal.style.display === 'block') {
      modal.style.display = 'none';
      document.body.style.overflow = 'auto';
    }
  });
});



document.addEventListener('DOMContentLoaded', () => {
  const achievement = document.getElementById('tap-achievement');
  const tappableItems = document.querySelectorAll('.animal-item');

  tappableItems.forEach(item => {
    item.addEventListener('click', function(e) {
      // Увеличиваем счетчик тапов
      let taps = parseInt(this.getAttribute('data-taps')) || 0;
      taps++;
      this.setAttribute('data-taps', taps);

      // Создаем плавающий счетчик +1
      const counter = document.createElement('span');
      counter.className = 'tap-counter';
      counter.textContent = '+1';
      const rect = this.getBoundingClientRect();
      counter.style.left = (e.clientX - rect.left) + 'px';
      counter.style.top = (e.clientY - rect.top) + 'px';
      this.appendChild(counter);

      // Показываем достижение после 25 тапов
      if (taps === 25) {
        achievement.style.display = 'block';
        
        // Скрываем через 4 секунды
        setTimeout(() => {
          achievement.style.display = 'none';
          this.setAttribute('data-taps', '0'); // Сбрасываем счетчик
        }, 4000);
      }

      // Удаляем счетчик +1 после анимации
      setTimeout(() => counter.remove(), 1000);
    });
  });
});