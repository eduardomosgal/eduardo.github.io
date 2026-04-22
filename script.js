document.addEventListener('DOMContentLoaded', () => {
  
  // 1. Dynamic Year for Footer Copyright
  const yearSpan = document.getElementById('year');
  if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear();
  }

  // 2. Sticky Header Shadow on Scroll
  const header = document.getElementById('header');
  if (header) {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
  }

  // 3. Intersection Observer for Fade-In Animations
  const faders = document.querySelectorAll('.fade-in');
  const appearOptions = {
    threshold: 0.15,
    rootMargin: "0px 0px -50px 0px"
  };

  const appearOnScroll = new IntersectionObserver(function(entries, observer) {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('appear');
        observer.unobserve(entry.target);
      }
    });
  }, appearOptions);

  faders.forEach(fader => {
    appearOnScroll.observe(fader);
  });

  // 4. Contact Form Logic (AJAX / Formspree)
  const form = document.querySelector('.contact-form');
  if (form) {
    form.addEventListener('submit', async function(e) {
      e.preventDefault();
      
      const button = form.querySelector('button');
      const originalButtonText = button.textContent;
      
      button.disabled = true;
      button.textContent = 'Sending...';

      const formData = new FormData(form);

      try {
        const response = await fetch(form.action, {
          method: 'POST',
          body: formData,
          headers: { 'Accept': 'application/json' }
        });

        if (response.ok) {
          form.innerHTML = `
            <div style="text-align: center; padding: 20px; animation: fadeIn 0.5s ease;">
              <h3 style="color: #4A90E2; margin-bottom: 10px;">¡Gracias! Mensaje enviado.</h3>
              <p>Me pondré en contacto contigo pronto.</p>
            </div>
          `;
        } else {
          throw new Error('Error al enviar');
        }
      } catch (error) {
        alert('Hubo un problema. Por favor intenta de nuevo.');
        button.disabled = false;
        button.textContent = originalButtonText;
      }
    });
  }

});
