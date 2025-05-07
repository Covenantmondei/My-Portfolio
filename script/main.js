// Initialize AOS animations
AOS.init({
  duration: 800,
  easing: 'ease-in-out',
  once: false
});

// Mobile menu toggle
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');

hamburger.addEventListener('click', () => {
  navLinks.classList.toggle('active');
  hamburger.classList.toggle('active');
});

// Close mobile menu when clicking a link
document.querySelectorAll('.nav-links a').forEach(link => {
  link.addEventListener('click', () => {
      navLinks.classList.remove('active');
      hamburger.classList.remove('active');
  });
});

// Current year for footer
document.getElementById('year').textContent = new Date().getFullYear();

// Form submission
const contactForm = document.getElementById('contactForm');

if (contactForm) {
  contactForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      
      const formData = new FormData(contactForm);
      const submitButton = contactForm.querySelector('button[type="submit"]');
      const originalButtonText = submitButton.textContent;
      
      try {
          submitButton.textContent = 'Sending...';
          submitButton.disabled = true;
          
          // For Netlify Forms
          const response = await fetch('/', {
              method: 'POST',
              headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
              body: new URLSearchParams(formData).toString()
          });
          
          if (response.ok) {
              alert('Message sent successfully!');
              contactForm.reset();
          } else {
              throw new Error('Network response was not ok');
          }
      } catch (error) {
          alert('There was an error sending your message. Please try again.');
          console.error('Error:', error);
      } finally {
          submitButton.textContent = originalButtonText;
          submitButton.disabled = false;
      }
  });
}

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
      e.preventDefault();
      
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
          window.scrollTo({
              top: targetElement.offsetTop - 70,
              behavior: 'smooth'
          });
      }
  });
});

// Add shadow to navbar on scroll
window.addEventListener('scroll', () => {
  const navbar = document.querySelector('.navbar');
  if (window.scrollY > 50) {
      navbar.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.1)';
  } else {
      navbar.style.boxShadow = '0 2px 8px rgba(0, 0, 0, 0.05)';
  }
});

// Interactive background grid
document.addEventListener('mousemove', (e) => {
  const gridLines = document.querySelectorAll('.grid-line');
  const x = e.clientX / window.innerWidth;
  const y = e.clientY / window.innerHeight;
  
  gridLines.forEach((line, i) => {
      line.style.transform = `translate(${x * i * 10}px, ${y * i * 10}px)`;
  });
});

// Typewriter effect for hero text
function typeWriter(element) {
  const text = element.textContent;
  element.textContent = '';
  let i = 0;
  
  function type() {
      if (i < text.length) {
          element.textContent += text.charAt(i);
          i++;
          setTimeout(type, Math.random() * 100 + 50);
      } else {
          element.classList.add('typewriter');
      }
  }
  type();
}

// Apply to hero text
const heroText = document.querySelector('.hero-content h1');
if (heroText) typeWriter(heroText);


// Netlify Form Handling
document.addEventListener('DOMContentLoaded', () => {
    const contactForm = document.querySelector('form[name="contact"]');
    
    if (contactForm) {
        contactForm.addEventListener('submit', async (e) => {
            const submitBtn = contactForm.querySelector('button[type="submit"]');
            const submitText = document.getElementById('submit-text');
            const submitIcon = document.getElementById('submit-icon');
            
            // Show loading state
            submitBtn.classList.add('loading');
            
            // For demo purposes - Netlify handles the actual submission
            // In a real deployment, this would be handled by Netlify automatically
            await new Promise(resolve => setTimeout(resolve, 1500));
            
            // Show success message
            showModal('Message sent successfully!');
            
            // Reset form and button
            contactForm.reset();
            submitBtn.classList.remove('loading');
        });
    }
});

// Modal function (for success/error messages)
function showModal(message, type = 'success') {
    const modal = document.createElement('div');
    modal.className = `modal ${type}`;
    modal.innerHTML = `
        <div class="modal-content">
            <p>${message}</p>
        </div>
    `;
    document.body.appendChild(modal);
    
    // Auto-close after 3 seconds
    setTimeout(() => {
        modal.remove();
    }, 3000);
}