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
  }
  
  // Инициализация аккордеона для услуг на мобильных
  function initAccordion() {
    if (window.innerWidth <= 768) {
      const serviceItems = document.querySelectorAll(".service-item");
      serviceItems.forEach(item => {
        const header = item.querySelector("h3");
        header.addEventListener("click", () => {
          const isActive = item.classList.contains("active");
          // Закрываем все открытые элементы
          serviceItems.forEach(i => i.classList.remove("active"));
          // Открываем текущий, если он не был активен
          if (!isActive) {
            item.classList.add("active");
          }
        });
      });
    }
  }
  
  // Инициализация виджета 2GIS (только для десктопа)
  function initMapWidget() {
    const mapContainer = document.getElementById("map-widget-container");
    if (window.innerWidth > 768 && mapContainer.style.display !== "none") {
      new DGWidgetLoader({
        width: "100%",
        height: 400,
        borderColor: "#a3a3a3",
        pos: { lat: 52.284463548374234, lon: 104.31385517120363, zoom: 16 },
        opt: { city: "irkutsk" },
        org: [{ id: "70000001080530539" }],
        container: mapContainer,
      });
    }
  }
      // Инициализация виджета 2GIS
      initMapWidget();
  
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
  
    // Инициализация аккордеона
    initAccordion();
  
    function toggleMenu() {
      const navMenu = document.querySelector(".nav-menu");
      const menuToggle = document.querySelector(".menu-toggle");
    
      navMenu.classList.toggle("active");
      menuToggle.classList.toggle("active");
      menuToggle.textContent = menuToggle.classList.contains("active") ? "✖" : "☰";
    }

    document.addEventListener('DOMContentLoaded', () => {
      const carouselInner = document.querySelector('.carousel-inner');
      const totalImages = 4; // Уникальных изображений
      const visibleImages = 3; // Видимых одновременно
      let index = 0;
    
      // Начальная позиция: скрываем дублированные изображения
      carouselInner.style.transform = `translateX(${-visibleImages * 300}px)`;
    
      function showNextImage() {
        index++;
        const offset = -(index + visibleImages) * 300;
        carouselInner.style.transition = 'transform 0.5s ease';
        carouselInner.style.transform = `translateX(${offset}px)`;
    
        // Сброс на начало при достижении конца
        if (index >= totalImages) {
          setTimeout(() => {
            carouselInner.style.transition = 'none';
            index = 0;
            carouselInner.style.transform = `translateX(${-visibleImages * 300}px)`;
          }, 500); // После завершения анимации
        }
      }
    
      setInterval(showNextImage, 3000); // Переключение каждые 3 секунды
    });
  });