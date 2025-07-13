/* JavaScript for Hem Viramgama Portfolio */

// Helper: select elements
const select = (selector, all = false) => all ? document.querySelectorAll(selector) : document.querySelector(selector);

// Loading Screen
window.addEventListener('load', () => {
  const loader = select('#loading-screen');
  setTimeout(() => {
    loader.style.opacity = '0';
    loader.style.pointerEvents = 'none';
    setTimeout(() => {
      loader.style.display = 'none';
    }, 500);
  }, 3000); // Show loader for 3 seconds
});

// Mobile Nav Toggle
const navToggle = select('#nav-toggle');
const navMenu = select('#nav-menu');
if (navToggle) {
  navToggle.addEventListener('click', () => {
    navMenu.classList.toggle('open');
  });
}

// Navigation smooth scrolling
const navLinks = select('.nav-link', true);
navLinks.forEach(link => {
  link.addEventListener('click', (e) => {
    e.preventDefault();
    const targetId = link.getAttribute('href').substring(1);
    const targetSection = select(`#${targetId}`);
    
    if (targetSection) {
      targetSection.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
    
    // Close mobile menu if open
    if (navMenu && navMenu.classList.contains('open')) {
      navMenu.classList.remove('open');
    }
  });
});

// Active link switching on scroll
const sections = select('section', true);
window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(sec => {
    const offset = sec.offsetTop - 120;
    if (pageYOffset >= offset) {
      current = sec.getAttribute('id');
    }
  });
  
  navLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === `#${current}`) {
      link.classList.add('active');
    }
  });

  // Navbar shadow
  const navbar = select('#navbar');
  if (window.scrollY > 80) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
});

// Typing Effect for name
const typingName = select('#typing-name');
const nameText = 'Hem Viramgama';
let nameIndex = 0;
let typingStarted = false;

function typeNext() {
  if (!typingName || typingStarted) return;
  
  typingStarted = true;
  typingName.textContent = '';
  nameIndex = 0;
  
  function typeChar() {
    if (nameIndex < nameText.length) {
      typingName.textContent += nameText.charAt(nameIndex);
      nameIndex++;
      setTimeout(typeChar, 100);
    }
  }
  
  typeChar();
}

// Start typing animation after loading screen
setTimeout(() => {
  typeNext();
}, 3500);

// Intersection Observer for fade-in animations
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
};

const fadeElements = select('.section-header', true);
const fadeObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('fade-in');
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
    }
  });
}, observerOptions);

fadeElements.forEach(el => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(20px)';
  el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
  fadeObserver.observe(el);
});

// Skill bar animation
const skillBars = select('.skill-progress', true);
const skillObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const targetWidth = entry.target.dataset.progress;
      setTimeout(() => {
        entry.target.style.width = targetWidth + '%';
      }, 200);
      skillObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.4 });

skillBars.forEach(bar => {
  bar.style.width = '0%';
  skillObserver.observe(bar);
});

// Stats counter animation
const statNumbers = select('.stat-number', true);
const counterObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const el = entry.target;
      const target = parseInt(el.dataset.target);
      let count = 0;
      const increment = target / 50;
      
      const updateCounter = () => {
        count += increment;
        if (count < target) {
          el.textContent = Math.ceil(count);
          requestAnimationFrame(updateCounter);
        } else {
          el.textContent = target;
        }
      };
      
      updateCounter();
      counterObserver.unobserve(el);
    }
  });
}, { threshold: 0.4 });

statNumbers.forEach(num => counterObserver.observe(num));

// Project filter functionality
const filterBtns = select('.filter-btn', true);
const projectCards = select('.project-card', true);

filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    // Remove active class from all buttons
    filterBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    
    const category = btn.dataset.filter;
    
    projectCards.forEach(card => {
      const cardCategory = card.dataset.category;
      
      if (category === 'all') {
        card.style.display = 'flex';
        card.style.opacity = '1';
      } else if (category === 'Web' && cardCategory === 'Web') {
        card.style.display = 'flex';
        card.style.opacity = '1';
      } else if (category === 'ML' && cardCategory === 'ML') {
        card.style.display = 'flex';
        card.style.opacity = '1';
      } else if (category === 'mobile' && cardCategory === 'mobile') {
        card.style.display = 'flex';
        card.style.opacity = '1';
      } else {
        card.style.opacity = '0';
        setTimeout(() => {
          card.style.display = 'none';
        }, 300);
      }
    });
  });
});

// Recommendations carousel
let currentRec = 0;
const recCards = select('.recommendation-card', true);
const prevBtn = select('#prevBtn');
const nextBtn = select('#nextBtn');

function showRecommendation(index) {
  recCards.forEach((card, i) => {
    card.classList.remove('active');
    if (i === index) {
      card.classList.add('active');
    }
  });
}

if (prevBtn) {
  prevBtn.addEventListener('click', () => {
    currentRec = (currentRec - 1 + recCards.length) % recCards.length;
    showRecommendation(currentRec);
  });
}

if (nextBtn) {
  nextBtn.addEventListener('click', () => {
    currentRec = (currentRec + 1) % recCards.length;
    showRecommendation(currentRec);
  });
}

// Auto-rotate recommendations
setInterval(() => {
  currentRec = (currentRec + 1) % recCards.length;
  showRecommendation(currentRec);
}, 5000);

// Contact form validation and submission
const contactForm = select('#contactForm');
if (contactForm) {
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const name = select('#name').value.trim();
    const email = select('#email').value.trim();
    const subject = select('#subject').value.trim();
    const message = select('#message').value.trim();
    
    // Clear previous error styles
    [select('#name'), select('#email'), select('#subject'), select('#message')].forEach(input => {
      input.style.borderColor = '';
    });
    
    let hasError = false;
    
    // Validate name
    if (!name) {
      select('#name').style.borderColor = '#ff5454';
      hasError = true;
    }
    
    // Validate email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email)) {
      select('#email').style.borderColor = '#ff5454';
      hasError = true;
    }
    
    // Validate subject
    if (!subject) {
      select('#subject').style.borderColor = '#ff5454';
      hasError = true;
    }
    
    // Validate message
    if (!message) {
      select('#message').style.borderColor = '#ff5454';
      hasError = true;
    }
    
    if (hasError) {
      // Show error message
      let errorMsg = select('.error-message');
      if (!errorMsg) {
        errorMsg = document.createElement('div');
        errorMsg.className = 'error-message';
        errorMsg.style.cssText = `
          color: #ff5454;
          text-align: center;
          margin-top: 10px;
          padding: 10px;
          background: rgba(255, 84, 84, 0.1);
          border-radius: 6px;
          border: 1px solid rgba(255, 84, 84, 0.2);
        `;
        contactForm.appendChild(errorMsg);
      }
      errorMsg.textContent = 'Please fill in all fields with valid information.';
      return;
    }
    
    // Remove error message if exists
    const errorMsg = select('.error-message');
    if (errorMsg) {
      errorMsg.remove();
    }
    
    // Show success message
    let successMsg = select('.success-message');
    if (!successMsg) {
      successMsg = document.createElement('div');
      successMsg.className = 'success-message';
      successMsg.style.cssText = `
        color: #00d4ff;
        text-align: center;
        margin-top: 10px;
        padding: 10px;
        background: rgba(0, 212, 255, 0.1);
        border-radius: 6px;
        border: 1px solid rgba(0, 212, 255, 0.2);
      `;
      contactForm.appendChild(successMsg);
    }
    successMsg.textContent = 'Thank you! Your message has been sent successfully.';
    
    // Reset form
    contactForm.reset();
    
    // Remove success message after 3 seconds
    setTimeout(() => {
      if (successMsg) {
        successMsg.remove();
      }
    }, 3000);
  });
}

// Smooth scrolling for hero buttons
const heroButtons = select('.hero-buttons a', true);
heroButtons.forEach(btn => {
  btn.addEventListener('click', (e) => {
    e.preventDefault();
    const targetId = btn.getAttribute('href').substring(1);
    const targetSection = select(`#${targetId}`);
    
    if (targetSection) {
      targetSection.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  });
});

// Add scroll animations to various elements
const animateElements = select('.about-content, .timeline-item, .project-card, .activity-card, .cert-card', true);
const scrollObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
    }
  });
}, { threshold: 0.1 });

animateElements.forEach(el => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(20px)';
  el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
  scrollObserver.observe(el);
});

// Initialize page
document.addEventListener('DOMContentLoaded', () => {
  // Set initial states
  if (recCards.length > 0) {
    showRecommendation(0);
  }
  
  // Set initial project filter
  const allBtn = select('.filter-btn[data-filter="all"]');
  if (allBtn) {
    allBtn.classList.add('active');
  }
});

// Particles animation (simple version)
function createParticles() {
  const particlesContainer = select('#particles');
  if (!particlesContainer) return;
  
  for (let i = 0; i < 50; i++) {
    const particle = document.createElement('div');
    particle.style.cssText = `
      position: absolute;
      width: 2px;
      height: 2px;
      background: #00d4ff;
      border-radius: 50%;
      opacity: 0.3;
      animation: float ${3 + Math.random() * 4}s infinite ease-in-out;
      left: ${Math.random() * 100}%;
      top: ${Math.random() * 100}%;
      animation-delay: ${Math.random() * 2}s;
    `;
    particlesContainer.appendChild(particle);
  }
}

// Add particle animation CSS
const style = document.createElement('style');
style.textContent = `
  @keyframes float {
    0%, 100% { transform: translateY(0px) rotate(0deg); opacity: 0.3; }
    50% { transform: translateY(-20px) rotate(180deg); opacity: 0.8; }
  }
`;
document.head.appendChild(style);

// Initialize particles
setTimeout(createParticles, 3000);