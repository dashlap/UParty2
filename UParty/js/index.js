// Данные для слайдера - изображения из папки assets/img и заголовки
        const slidesData = [
            {
                image: './assets/images/slider_img1.png',
                title: 'ПРИЗРАК ОПЕРЫ'
            },
            {
                image: './assets/images/slider_img2.png', 
                title: 'ПРИЗРАК ОПЕРЫ'
            },
            {
                image: './assets/images/slider_img3.png',
                title: 'ПРИЗРАК ОПЕРЫ'
            },
            {
                image: './assets/images/slider_img4.png',
                title: 'ПРИЗРАК ОПЕРЫ'
            }
        ];

        // Текущий активный слайд
        let currentSlide = 0;

        // Инициализация слайдера
        function initSlider() {
            const mainSlider = document.getElementById('mainSlider');
            const thumbnails = document.getElementById('thumbnails');
            const fullscreenSlider = document.getElementById('fullscreenSliderContainer');
            const fullscreenThumbnails = document.getElementById('fullscreenThumbnails');

            // Создание слайдов и миниатюр
            slidesData.forEach((slideData, index) => {
                // Основной слайдер
                const slide = document.createElement('div');
                slide.className = `slide ${index === 0 ? 'active' : ''}`;
                slide.innerHTML = `<img src="${slideData.image}" alt="Slide ${index + 1}">`;
                mainSlider.appendChild(slide);

                // Миниатюры для основного слайдера
                const thumbnail = document.createElement('div');
                thumbnail.className = `thumbnail ${index === 0 ? 'active' : ''}`;
                thumbnail.innerHTML = `<img src="${slideData.image}" alt="Thumbnail ${index + 1}">`;
                thumbnail.addEventListener('click', () => changeSlide(index));
                thumbnails.appendChild(thumbnail);

                // Слайды для полноэкранного режима
                const fullscreenSlide = document.createElement('div');
                fullscreenSlide.className = `fullscreen-slide ${index === 0 ? 'active' : ''}`;
                fullscreenSlide.innerHTML = `
                    <img src="${slideData.image}" alt="Fullscreen Slide ${index + 1}">
                    <div class="image-title">${slideData.title}</div>
                `;
                fullscreenSlider.appendChild(fullscreenSlide);

                // Миниатюры для полноэкранного режима
                const fullscreenThumbnail = document.createElement('div');
                fullscreenThumbnail.className = `fullscreen-thumbnail ${index === 0 ? 'active' : ''}`;
                fullscreenThumbnail.innerHTML = `<img src="${slideData.image}" alt="Fullscreen Thumbnail ${index + 1}">`;
                fullscreenThumbnail.addEventListener('click', () => changeFullscreenSlide(index));
                fullscreenThumbnails.appendChild(fullscreenThumbnail);
            });

            // Обработчики событий для основного слайдера
            mainSlider.addEventListener('click', openFullscreen);
            document.getElementById('prevBtn').addEventListener('click', () => navigate(-1));
            document.getElementById('nextBtn').addEventListener('click', () => navigate(1));

            // Обработчики событий для полноэкранного режима
            document.getElementById('closeBtn').addEventListener('click', closeFullscreen);
            document.getElementById('fullscreenPrevBtn').addEventListener('click', () => navigateFullscreen(-1));
            document.getElementById('fullscreenNextBtn').addEventListener('click', () => navigateFullscreen(1));

            // Закрытие полноэкранного режима по клику на затемненную область
            document.getElementById('fullscreenSlider').addEventListener('click', (e) => {
                if (e.target.id === 'fullscreenSlider') {
                    closeFullscreen();
                }
            });

            // Обработка клавиш для навигации в полноэкранном режиме
            document.addEventListener('keydown', (e) => {
                if (document.getElementById('fullscreenSlider').classList.contains('active')) {
                    if (e.key === 'Escape') {
                        closeFullscreen();
                    } else if (e.key === 'ArrowLeft') {
                        navigateFullscreen(-1);
                    } else if (e.key === 'ArrowRight') {
                        navigateFullscreen(1);
                    }
                }
            });
        }

        // Смена слайда в основном слайдере
        function changeSlide(index) {
            currentSlide = index;
            updateSlides();
        }

        // Навигация в основном слайдере
        function navigate(direction) {
            currentSlide = (currentSlide + direction + slidesData.length) % slidesData.length;
            updateSlides();
        }

        // Обновление отображения слайдов
        function updateSlides() {
            // Основной слайдер
            const slides = document.querySelectorAll('.slide');
            const thumbnails = document.querySelectorAll('.thumbnail');
            
            slides.forEach((slide, index) => {
                slide.classList.toggle('active', index === currentSlide);
            });
            
            thumbnails.forEach((thumbnail, index) => {
                thumbnail.classList.toggle('active', index === currentSlide);
            });

            // Полноэкранный режим
            const fullscreenSlides = document.querySelectorAll('.fullscreen-slide');
            const fullscreenThumbnails = document.querySelectorAll('.fullscreen-thumbnail');
            
            fullscreenSlides.forEach((slide, index) => {
                slide.classList.toggle('active', index === currentSlide);
            });
            
            fullscreenThumbnails.forEach((thumbnail, index) => {
                thumbnail.classList.toggle('active', index === currentSlide);
            });

            // Обновление фона в полноэкранном режиме
            updateFullscreenBackground();
        }

        // Обновление фона в полноэкранном режиме
        function updateFullscreenBackground() {
            const fullscreenBg = document.getElementById('fullscreenBg');
            fullscreenBg.style.backgroundImage = `url('${slidesData[currentSlide].image}')`;
        }

        // Открытие полноэкранного режима
        function openFullscreen() {
            document.getElementById('fullscreenSlider').classList.add('active');
            document.body.style.overflow = 'hidden';
            updateFullscreenBackground();
        }

        // Закрытие полноэкранного режима
        function closeFullscreen() {
            document.getElementById('fullscreenSlider').classList.remove('active');
            document.body.style.overflow = 'auto';
        }

        // Навигация в полноэкранном режиме
        function navigateFullscreen(direction) {
            currentSlide = (currentSlide + direction + slidesData.length) % slidesData.length;
            updateSlides();
        }

        // Смена слайда в полноэкранном режиме
        function changeFullscreenSlide(index) {
            currentSlide = index;
            updateSlides();
        }

        // Инициализация слайдера после загрузки DOM
        document.addEventListener('DOMContentLoaded', initSlider); 



        