document.addEventListener('DOMContentLoaded', () => {
    // Inicializa EmailJS con tu clave pública
    emailjs.init("xXEDaCph_VOv13l4V"); // Reemplázalo con tu clave pública real

    // Función para manejar el envío del formulario
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', async function(e) {
            e.preventDefault();
            
            // Obtiene los datos del formulario
            const formData = new FormData(this);
            const formDetails = Object.fromEntries(formData);
            
            // Verifica que el correo no esté vacío
            if (!formDetails.email) {
                alert("Por favor, ingresa un correo electrónico válido.");
                return;
            }

            // Parámetros de la plantilla de EmailJS
            const templateParams = {
                to_email: formDetails.email, // Correo del usuario
                from_name: "HR VIP SECURE",
                to_name: formDetails.name || "Cliente",
                product_name: formDetails.product || "Producto",
                message: `Acabas de solicitar comprar este producto "${formDetails.product}". 
                          Para realizar el pago y darte soporte, escribe a este WhatsApp "+1 829 432 9384" 
                          o envía un correo a "warlys1213@gmail.com". Gracias por su consulta.`
            };

            try {
                // Envía el correo con EmailJS
                await emailjs.send(
                    "warlys_13", // ID del servicio
                    "HR_VIP_SECURE", // ID de la plantilla
                    templateParams
                );
                
                // Muestra un mensaje de éxito
                alert('¡Mensaje enviado con éxito! Revisa tu correo electrónico.');

                // Resetea el formulario
                this.reset();
            } catch (error) {
                console.error('Error al enviar el mensaje:', error);
                alert('Hubo un error al enviar el mensaje. Inténtelo de nuevo.');
            }
        });
    }
});
