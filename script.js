document.addEventListener('DOMContentLoaded', () => {
    // Mobile Menu
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const closeMenuBtn = document.querySelector('.close-menu');
    const mobileMenu = document.querySelector('.mobile-menu');
    
    const toggleMenu = (show) => {
        mobileMenu.classList.toggle('active', show);
        document.body.style.overflow = show ? 'hidden' : '';
    };

    mobileMenuBtn.addEventListener('click', () => toggleMenu(true));
    closeMenuBtn.addEventListener('click', () => toggleMenu(false));

    // Close mobile menu when clicking outside
    document.addEventListener('click', (e) => {
        if (mobileMenu.classList.contains('active') &&
            !mobileMenu.contains(e.target) &&
            !mobileMenuBtn.contains(e.target)) {
            toggleMenu(false);
        }
    });

    // Close mobile menu when clicking menu items
    mobileMenu.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => toggleMenu(false));
    });

    // Navigation Active State
    const sections = document.querySelectorAll('section');
    const navItems = document.querySelectorAll('.nav-links a');

    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (window.pageYOffset >= sectionTop - 200) {
                current = section.getAttribute('id');
            }
        });

        navItems.forEach(item => {
            item.classList.remove('active');
            if (item.getAttribute('href').slice(1) === current) {
                item.classList.add('active');
            }
        });
    });

    // Style Quiz Modal
    const quizModal = document.querySelector('.quiz-modal');
    const startQuizBtns = document.querySelectorAll('.cta-btn');
    const closeQuizBtn = quizModal.querySelector('.close-modal');
    const quizContainer = quizModal.querySelector('.quiz-container');

    const styleQuizQuestions = [
        {
            question: "Which room would you like to design?",
            options: ["Living Room", "Bedroom", "Kitchen", "Dining Room", "Home Office"]
        },
        {
            question: "What's your preferred design style?",
            options: ["Modern", "Traditional", "Contemporary", "Industrial", "Scandinavian"]
        },
        {
            question: "What's your budget range?",
            options: ["₹50,000 - ₹1,00,000", "₹1,00,000 - ₹2,50,000", "₹2,50,000 - ₹5,00,000", "₹5,00,000+"]
        }
    ];

    let currentQuestion = 0;

    const showQuiz = () => {
        quizModal.classList.add('active');
        document.body.style.overflow = 'hidden';
        showQuestion(currentQuestion);
    };

    const hideQuiz = () => {
        quizModal.classList.remove('active');
        document.body.style.overflow = '';
        currentQuestion = 0;
    };

    const showQuestion = (questionIndex) => {
        const question = styleQuizQuestions[questionIndex];
        const progressPercentage = ((questionIndex + 1) / styleQuizQuestions.length) * 100;

        quizContainer.innerHTML = `
            <div class="quiz-progress">
                <div class="progress-bar" style="width: ${progressPercentage}%"></div>
            </div>
            <h3>${question.question}</h3>
            <div class="options-grid">
                ${question.options.map(option => `
                    <button class="option-btn">${option}</button>
                `).join('')}
            </div>
        `;

        // Add click handlers to options
        quizContainer.querySelectorAll('.option-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                // Here you would typically save the answer
                if (currentQuestion < styleQuizQuestions.length - 1) {
                    currentQuestion++;
                    showQuestion(currentQuestion);
                } else {
                    // Quiz completed
                    showQuizComplete();
                }
            });
        });
    };

    const showQuizComplete = () => {
        quizContainer.innerHTML = `
            <div class="quiz-complete">
                <i class="fas fa-check-circle"></i>
                <h3>Thanks for completing the quiz!</h3>
                <p>We'll match you with the perfect designer for your style.</p>
                <button class="cta-btn">View Your Results</button>
            </div>
        `;

        quizContainer.querySelector('.cta-btn').addEventListener('click', () => {
            hideQuiz();
            // Here you would typically redirect to results or designer matching page
        });
    };

    startQuizBtns.forEach(btn => {
        btn.addEventListener('click', showQuiz);
    });

    closeQuizBtn.addEventListener('click', hideQuiz);

    quizModal.addEventListener('click', (e) => {
        if (e.target === quizModal) {
            hideQuiz();
        }
    });

    // Horizontal Scroll for Portfolio
    const horizontalScroll = document.querySelector('.horizontal-scroll');
    let isDown = false;
    let startX;
    let scrollLeft;

    horizontalScroll.addEventListener('mousedown', (e) => {
        isDown = true;
        startX = e.pageX - horizontalScroll.offsetLeft;
        scrollLeft = horizontalScroll.scrollLeft;
    });

    horizontalScroll.addEventListener('mouseleave', () => {
        isDown = false;
    });

    horizontalScroll.addEventListener('mouseup', () => {
        isDown = false;
    });

    horizontalScroll.addEventListener('mousemove', (e) => {
        if (!isDown) return;
        e.preventDefault();
        const x = e.pageX - horizontalScroll.offsetLeft;
        const walk = (x - startX) * 2;
        horizontalScroll.scrollLeft = scrollLeft - walk;
    });

    // Handle touch events for mobile
    horizontalScroll.addEventListener('touchstart', (e) => {
        startX = e.touches[0].pageX - horizontalScroll.offsetLeft;
        scrollLeft = horizontalScroll.scrollLeft;
    }, { passive: true });

    horizontalScroll.addEventListener('touchmove', (e) => {
        if (e.touches.length !== 1) return;
        const x = e.touches[0].pageX - horizontalScroll.offsetLeft;
        const walk = (startX - x) * 2;
        horizontalScroll.scrollLeft = scrollLeft + walk;
    }, { passive: true });

    // Smooth scroll for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
                // Close mobile menu if open
                if (window.innerWidth <= 768) {
                    toggleMenu(false);
                }
            }
        });
    });
});