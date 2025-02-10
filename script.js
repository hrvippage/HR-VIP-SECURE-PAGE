document.addEventListener('DOMContentLoaded', () => {
    // Initialize EmailJS with your public key
    emailjs.init("xXEDaCph_VOv13l4V"); // Replace with your actual EmailJS public key
  
    // Smooth scroll functionality
    document.querySelectorAll('a[href^="#"], .cta-button').forEach(element => {
      element.addEventListener('click', function (e) {
        e.preventDefault();
        let target;
        if (this.classList.contains('cta-button')) {
          target = document.querySelector('#contacto');
        } else {
          target = document.querySelector(this.getAttribute('href'));
        }
        if (target) {
          target.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });
        }
      });
    });
  
    // Animated entrance for service cards
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
        }
      });
    }, {
      threshold: 0.1
    });
  
    document.querySelectorAll('.service-card').forEach(card => {
      card.style.opacity = '0';
      card.style.transform = 'translateY(20px)';
      card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
      observer.observe(card);
    });
  
    // Handle form submission
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
      contactForm.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(this);
        const formDetails = Object.fromEntries(formData);
        
        // Create email template parameters
        const templateParams = {
          to_email: formDetails.email,
          from_name: "HR VIP SECURE",
          to_name: formDetails.name,
          product_name: formDetails.product,
          message: `Acabas de solicitar comprar este producto "${formDetails.product}", para realizar el pago y darte el soporte que necesites escribe a este numero de whatsapp "+1 829 432 9384" o manda un mensaje a este correo electronico "warlys1213@gmail.com". Gracias por su consulta.`
        };
  
        try {
          // Send email using EmailJS
          await emailjs.send(
            "warlys_13", // Replace with your EmailJS service ID
            "HR_VIP_SECURE", // Replace with your EmailJS template ID
            templateParams
          );
          
          // Show success message
          alert('¡Mensaje enviado con éxito! Por favor, revise su correo electrónico para más instrucciones.');
          
          // Reset form
          this.reset();
        } catch (error) {
          console.error('Error:', error);
          alert('Hubo un error al enviar el mensaje. Por favor, inténtelo de nuevo.');
        }
      });
    }
  });