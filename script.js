// ============================================
// SMOOTH SCROLLING & NAVIGATION
// ============================================

// Smooth scroll to sections
function scrollToSection(sectionId) {
    const element = document.getElementById(sectionId);
    if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
    }
}

// Navigation link click handler
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href').substring(1);
        scrollToSection(targetId);
        
        // Close mobile menu if open
        if (window.innerWidth < 768) {
            closeMenu();
        }
    });
});

// ============================================
// MOBILE MENU TOGGLE
// ============================================

const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

if (hamburger) {
    hamburger.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        hamburger.classList.toggle('active');
    });
}

function closeMenu() {
    if (navMenu) {
        navMenu.classList.remove('active');
    }
    if (hamburger) {
        hamburger.classList.remove('active');
    }
}

// ============================================
// NAVBAR BACKGROUND ON SCROLL
// ============================================

window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.boxShadow = '0 4px 20px rgba(0, 212, 255, 0.2)';
    } else {
        navbar.style.boxShadow = 'none';
    }
});

// ============================================
// CONTACT FORM HANDLING
// ============================================

const contactForm = document.getElementById('contactForm');

if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Get form values
        const formData = new FormData(contactForm);
        const name = contactForm.querySelector('input[type="text"]').value;
        const email = contactForm.querySelector('input[type="email"]').value;
        const phone = contactForm.querySelector('input[type="tel"]').value;
        const message = contactForm.querySelector('textarea').value;
        
        // Validate form
        if (!name || !email || !message) {
            showNotification('Please fill in all required fields', 'error');
            return;
        }
        
        // Validate email
        if (!isValidEmail(email)) {
            showNotification('Please enter a valid email address', 'error');
            return;
        }
        
        // Simulate form submission
        const submitBtn = contactForm.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;
        submitBtn.textContent = 'Sending...';
        submitBtn.disabled = true;
        
        // Simulate API call
        setTimeout(() => {
            showNotification('Message sent successfully! I will get back to you soon.', 'success');
            contactForm.reset();
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
        }, 1500);
    });
}

// ============================================
// UTILITY FUNCTIONS
// ============================================

// Email validation
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Notification system
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        padding: 20px 30px;
        background: ${type === 'success' ? '#00ff88' : type === 'error' ? '#ff006e' : '#00d4ff'};
        color: ${type === 'success' ? '#000' : '#fff'};
        border-radius: 8px;
        font-weight: bold;
        z-index: 10000;
        animation: slideInRight 0.5s ease-out;
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
    `;
    
    document.body.appendChild(notification);
    
    // Remove notification after 4 seconds
    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.5s ease-out';
        setTimeout(() => {
            notification.remove();
        }, 500);
    }, 4000);
}

// ============================================
// SCROLL ANIMATIONS
// ============================================

// Intersection Observer for scroll animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animation = 'slideUp 0.6s ease-out forwards';
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe skill cards, service cards, and project cards
document.querySelectorAll('.skill-category, .service-card, .project-card, .experience-item, .stat').forEach(element => {
    element.style.opacity = '0';
    observer.observe(element);
});

// ============================================
// BUTTON INTERACTIONS
// ============================================

// Contact button in navbar
const contactBtnNav = document.querySelector('.contact-btn');
if (contactBtnNav) {
    contactBtnNav.addEventListener('click', () => {
        scrollToSection('contact');
    });
}

// ============================================
// ACTIVE NAVIGATION LINK HIGHLIGHTING
// ============================================

window.addEventListener('scroll', () => {
    let current = '';
    
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (scrollY >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });
    
    document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').substring(1) === current) {
            link.classList.add('active');
        }
    });
});

// ============================================
// KEYBOARD SHORTCUTS
// ============================================

document.addEventListener('keydown', (e) => {
    // Ctrl/Cmd + K to focus on contact
    if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        scrollToSection('contact');
    }
    
    // Escape to close mobile menu
    if (e.key === 'Escape') {
        closeMenu();
    }
});

// ============================================
// DYNAMIC YEAR IN FOOTER
// ============================================

document.addEventListener('DOMContentLoaded', () => {
    const currentYear = new Date().getFullYear();
    const footerText = document.querySelector('.footer-bottom p');
    if (footerText) {
        footerText.innerHTML = footerText.innerHTML.replace('2024', currentYear);
    }
});

// ============================================
// COPY TO CLIPBOARD FUNCTIONALITY
// ============================================

function copyToClipboard(text) {
    navigator.clipboard.writeText(text).then(() => {
        showNotification('Copied to clipboard!', 'success');
    }).catch(() => {
        showNotification('Failed to copy', 'error');
    });
}

// ============================================
// LAZY LOADING IMAGES (if added later)
// ============================================

if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.add('loaded');
                observer.unobserve(img);
            }
        });
    });
    
    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}

// ============================================
// SMOOTH PAGE LOAD ANIMATION
// ============================================

window.addEventListener('load', () => {
    document.body.style.opacity = '1';
});

document.body.style.opacity = '0';
document.body.style.transition = 'opacity 0.5s ease-out';

setTimeout(() => {
    document.body.style.opacity = '1';
}, 100);

// ============================================
// RESPONSIVE NAVIGATION MENU
// ============================================

// Close menu when clicking outside
document.addEventListener('click', (e) => {
    if (!e.target.closest('.nav-container')) {
        closeMenu();
    }
});

// ============================================
// FORM INPUT FOCUS EFFECTS
// ============================================

const formInputs = document.querySelectorAll('.form-group input, .form-group textarea');

formInputs.forEach(input => {
    input.addEventListener('focus', function() {
        this.parentElement.style.transform = 'translateY(-2px)';
    });
    
    input.addEventListener('blur', function() {
        this.parentElement.style.transform = 'translateY(0)';
    });
});

// ============================================
// SKILL PROGRESS ANIMATION (Optional)
// ============================================

// This can be used if you add progress bars to skills
function animateSkillBars() {
    const skillBars = document.querySelectorAll('.skill-bar');
    
    skillBars.forEach(bar => {
        const percentage = bar.getAttribute('data-percentage');
        const progressBar = bar.querySelector('.progress-fill');
        
        if (progressBar) {
            setTimeout(() => {
                progressBar.style.width = percentage + '%';
            }, 100);
        }
    });
}

// ============================================
// PRINT FUNCTIONALITY
// ============================================

function printPage() {
    window.print();
}

// ============================================
// DARK/LIGHT MODE TOGGLE (Optional)
// ============================================

function toggleDarkMode() {
    document.body.classList.toggle('light-mode');
    localStorage.setItem('darkMode', document.body.classList.contains('light-mode') ? 'false' : 'true');
}

// Check for saved dark mode preference
if (localStorage.getItem('darkMode') === 'false') {
    document.body.classList.add('light-mode');
}

// ============================================
// ANALYTICS TRACKING (Optional)
// ============================================

// Track section views
function trackSectionView(sectionId) {
    if (window.gtag) {
        gtag('event', 'section_view', {
            'section_id': sectionId
        });
    }
}

// ============================================
// PERFORMANCE OPTIMIZATION
// ============================================

// Debounce function for scroll events
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// ============================================
// ACCESSIBILITY IMPROVEMENTS
// ============================================

// Ensure all interactive elements are keyboard accessible
document.querySelectorAll('button, a').forEach(element => {
    if (!element.hasAttribute('tabindex')) {
        element.setAttribute('tabindex', '0');
    }
});

// ============================================
// INITIALIZATION
// ============================================

console.log('Portfolio website loaded successfully!');
console.log('Contact: your.email@example.com');
console.log('Upwork: View My Upwork Portfolio');



const skills = [
    "Digital Marketing Specialist",
    "Lead Generation Expert",
    "Data Analyst",
    "B2B Lead Generation",
    "B2C Lead Generation",
    "LinkedIn Lead Generation",
    "Apollo.io Lead Generation"
];

let i = 0;
let j = 0;
let current = "";
let isDeleting = false;

function type() {
    current = skills[i];

    if (!isDeleting) {
        document.getElementById("typing-text").textContent =
            current.substring(0, j++);
        if (j > current.length) {
            isDeleting = true;
            setTimeout(type, 1200);
            return;
        }
    } else {
        document.getElementById("typing-text").textContent =
            current.substring(0, j--);
        if (j === 0) {
            isDeleting = false;
            i = (i + 1) % skills.length;
        }
    }
    setTimeout(type, isDeleting ? 40 : 80);
}
type();



/* ============================================
   NAVIGATION BAR
   ============================================ */
window.addEventListener("scroll", function() {
    const nav = document.querySelector(".navbar");
    nav.classList.toggle("scrolled", window.scrollY > 50);
});

/* ===============================
   ABOUT SECTION ULTRA PRO
================================ */
 
const counters = document.querySelectorAll(".counter");
const speed = 200;

counters.forEach(counter => {
    const updateCount = () => {
        const target = +counter.getAttribute("data-target");
        const count = +counter.innerText;

        const inc = target / speed;

        if (count < target) {
            counter.innerText = Math.ceil(count + inc);
            setTimeout(updateCount, 15);
        } else {
            counter.innerText = target.toLocaleString();
        }
    };

    const observer = new IntersectionObserver(entries => {
        if (entries[0].isIntersecting) {
            updateCount();
        }
    });

    observer.observe(counter);
});
 

// Scroll Animation for Project Cards
document.querySelectorAll('.project-card').forEach(card => {
    projectObserver.observe(card);
});

// Lazy load images
document.querySelectorAll('img.lazy').forEach(img => {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                img.src = img.dataset.src;
                img.classList.add('loaded');
                observer.unobserve(img);
            }
        });
    });
    imageObserver.observe(img);
});

// Smooth scroll for footer links
document.querySelectorAll('.footer-link').forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href').substring(1);
        const targetEl = document.getElementById(targetId);
        if (targetEl) {
            targetEl.scrollIntoView({ behavior: 'smooth' });
        }
    });
});

// Dynamic year in footer
document.getElementById('footer-year').textContent = new Date().getFullYear();