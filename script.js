// Theme Toggle
const themeToggle = document.querySelector('.theme-toggle');
const body = document.body;

function setTheme(isDark) {
    body.classList.toggle('dark-mode', isDark);
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
}

// Initialize theme
const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
const storedTheme = localStorage.getItem('theme');
setTheme(storedTheme === 'dark' || (!storedTheme && prefersDark));

themeToggle.addEventListener('click', () => {
    setTheme(!body.classList.contains('dark-mode'));
});

// Mobile Menu
const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
const navLinks = document.querySelector('.nav-links');

mobileMenuBtn.addEventListener('click', () => {
    mobileMenuBtn.classList.toggle('active');
    navLinks.classList.toggle('active');
});

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            if (entry.target.classList.contains('stat-card')) {
                animateValue(entry.target.querySelector('.stat-value'));
            }
        }
    });
}, observerOptions);

document.querySelectorAll('[data-aos]').forEach(element => {
    observer.observe(element);
});

// Animate statistics
function animateValue(element) {
    const value = parseInt(element.dataset.value);
    const suffix = element.textContent.replace(/[0-9]/g, '');
    const duration = 2000;
    const steps = 50;
    const increment = value / steps;
    let current = 0;
    let step = 0;

    const timer = setInterval(() => {
        current += increment;
        step++;
        
        if (step >= steps) {
            current = value;
            clearInterval(timer);
        }
        
        element.textContent = Math.round(current) + suffix;
    }, duration / steps);
}

// Features
const features = [
    {
        id: 'visual',
        icon: `<svg viewBox="0 0 24 24" class="feature-icon"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg>`,
        title: 'Visual Enhancements',
        description: 'Customize contrast, colors, and font sizes for better visibility.',
        demo: 'https://example.com/visual-demo'
    },
    {
        id: 'audio',
        icon: `<svg viewBox="0 0 24 24" class="feature-icon"><path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"></path><path d="M19 10v2a7 7 0 0 1-14 0v-2"></path><line x1="12" y1="19" x2="12" y2="23"></line><line x1="8" y1="23" x2="16" y2="23"></line></svg>`,
        title: 'Screen Reader Integration',
        description: 'Advanced text-to-speech with natural voice synthesis.',
        demo: 'https://example.com/audio-demo'
    },
    {
        id: 'keyboard',
        icon: `<svg viewBox="0 0 24 24" class="feature-icon"><rect x="2" y="4" width="20" height="16" rx="2" ry="2"></rect><path d="M6 8h.001M10 8h.001M14 8h.001M18 8h.001M8 12h.001M12 12h.001M16 12h.001M7 16h10"></path></svg>`,
        title: 'Keyboard Navigation',
        description: 'Enhanced keyboard controls for seamless browsing.',
        demo: 'https://example.com/keyboard-demo'
    },
    {
        id: 'motion',
        icon: `<svg viewBox="0 0 24 24" class="feature-icon"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"></path></svg>`,
        title: 'Motion Control',
        description: 'Reduce animations and control motion sensitivity.',
        demo: 'https://example.com/motion-demo'
    },
    {
        id: 'text',
        icon: `<svg viewBox="0 0 24 24" class="feature-icon"><polyline points="4 7 4 4 20 4 20 7"></polyline><line x1="9" y1="20" x2="15" y2="20"></line><line x1="12" y1="4" x2="12" y2="20"></line></svg>`,
        title: 'Text Adaptation',
        description: 'Dyslexia-friendly fonts and text spacing options.',
        demo: 'https://example.com/text-demo'
    },
    {
        id: 'color',
        icon: `<svg viewBox="0 0 24 24" class="feature-icon"><circle cx="12" cy="12" r="10"></circle><path d="M8.56 2.75c4.37 6.03 6.02 9.42 8.03 17.72m2.54-15.38c-3.72 4.35-8.94 5.66-16.88 5.85m19.5 1.9c-3.5-.93-6.63-.82-8.94 0-2.58.92-5.01 2.86-7.44 6.32"></path></svg>`,
        title: 'Color Correction',
        description: 'Color blindness simulation and correction tools.',
        demo: 'https://example.com/color-demo'
    },
    {
        id: 'focus',
        icon: `<svg viewBox="0 0 24 24" class="feature-icon"><path d="M12 20v-6M12 4v6"></path><path d="M4 12h6"></path><path d="M14 12h6"></path></svg>`,
        title: 'Focus Mode',
        description: 'Remove distractions and simplify page content.',
        demo: 'https://example.com/focus-demo'
    },
    {
        id: 'performance',
        icon: `<svg viewBox="0 0 24 24" class="feature-icon"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"></path></svg>`,
        title: 'Performance Optimization',
        description: 'Lightweight and fast accessibility enhancements.',
        demo: 'https://example.com/performance-demo'
    }
];

const featuresGrid = document.querySelector('.features-grid');

features.forEach(feature => {
    const card = document.createElement('div');
    card.className = 'feature-card';
    card.dataset.featureId = feature.id;
    
    card.innerHTML = `
        ${feature.icon}
        <h3 class="feature-title">${feature.title}</h3>
        <p class="feature-description">${feature.description}</p>
        <div class="feature-demo">
            <button class="demo-button">Try Demo</button>
        </div>
    `;
    
    featuresGrid.appendChild(card);
});

// Feature card interaction
document.querySelectorAll('.feature-card').forEach(card => {
    card.addEventListener('click', () => {
        const wasActive = card.classList.contains('active');
        document.querySelectorAll('.feature-card').forEach(c => c.classList.remove('active'));
        if (!wasActive) {
            card.classList.add('active');
        }
    });
});

// Values
const values = [
    {
        icon: `<svg viewBox="0 0 24 24" class="value-icon"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg>`,
        title: 'Empathy First',
        description: 'Understanding and addressing the diverse needs of all web users.'
    },
    {
        icon: `<svg viewBox="0 0 24 24" class="value-icon"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>`,
        title: 'Universal Access',
        description: 'Making the web truly accessible for everyone, regardless of ability.'
    },
    {
        icon: `<svg viewBox="0 0 24 24" class="value-icon"><circle cx="12" cy="12" r="10"></circle><circle cx="12" cy="12" r="6"></circle><circle cx="12" cy="12" r="2"></circle></svg>`,
        title: 'Innovation',
        description: 'Pushing boundaries to create better accessibility solutions.'
    },
    {
        icon: `<svg viewBox="0 0 24 24" class="value-icon"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path></svg>`,
        title: 'Standards Compliance',
        description: 'Adhering to and exceeding WCAG guidelines and best practices.'
    }
];

const valuesGrid = document.querySelector('.values-grid');

values.forEach(value => {
    const card = document.createElement('div');
    card.className = 'value-card';
    
    card.innerHTML = `
        ${value.icon}
        <h3 class="value-title">${value.title}</h3>
        <p class="value-description">${value.description}</p>
    `;
    
    valuesGrid.appendChild(card);
});

// Update copyright year
document.getElementById('current-year').textContent = new Date().getFullYear();

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
            // Close mobile menu if open
            mobileMenuBtn.classList.remove('active');
            navLinks.classList.remove('active');
        }
    });
});

// Section Navigation
function showSection(sectionId) {
    // Hide all sections
    document.querySelectorAll('.section-container').forEach(section => {
        section.classList.remove('active');
    });

    // Show selected section
    if (sectionId === 'home') {
        document.querySelector('.home-section').classList.add('active');
    } else {
        document.querySelector(`#${sectionId}`).classList.add('active');
    }
}

// Update navigation event listeners
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const sectionId = this.getAttribute('href').slice(1);
        
        // If clicking home link
        if (this.getAttribute('href') === '#' || !sectionId) {
            showSection('home');
        } else {
            showSection(sectionId);
        }

        // Close mobile menu if open
        mobileMenuBtn.classList.remove('active');
        navLinks.classList.remove('active');
    });
});