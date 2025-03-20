document.addEventListener('DOMContentLoaded', function () {
    // 🟢 Inicializa o Swiper apenas na galeria
    if (document.querySelector('.gallery-swiper')) {
        new Swiper('.gallery-swiper', {
            loop: true,
            navigation: {
                nextEl: '.gallery-swiper .swiper-button-next',
                prevEl: '.gallery-swiper .swiper-button-prev',
            },
            pagination: {
                el: '.gallery-swiper .swiper-pagination',
                clickable: true,
            },
            autoplay: {
                delay: 3000,
            },
            breakpoints: {
                600: {
                    slidesPerView: 2,
                    spaceBetween: 20,
                },
                900: {
                    slidesPerView: 3,
                    spaceBetween: 30,
                },
            },
        });
    }

    // 🟢 Função do Contador Regressivo
    const timerElement = document.getElementById("timer");
    if (timerElement) {
        const weddingDate = new Date("2026-04-18T10:00:00").getTime();

        function updateCountdown() {
            const now = new Date().getTime();
            const timeLeft = weddingDate - now;

            if (timeLeft < 0) {
                timerElement.innerHTML = "Já Casamos! 🎉";
                return;
            }

            const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
            const months = Math.floor(days / 30);
            const remainingDays = days % 30;
            const hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);

            timerElement.innerHTML = `${months}m ${remainingDays}d ${hours}h ${minutes}m ${seconds}s`;
        }

        setInterval(updateCountdown, 1000);
        updateCountdown();
    }

       // PIX Popup
       const presentButtons = document.querySelectorAll(".present-link2");
       const pixPopup = document.getElementById("pix-popup");
       const closePopup = document.querySelector(".pix-close");
       const pixCodeInput = document.getElementById("pix-code");
       const copyPixButton = document.getElementById("copy-pix");
       const qrCodeContainer = document.getElementById("qr-code");
   
       if (pixPopup) {
           presentButtons.forEach(button => {
               button.addEventListener("click", function () {
                   const pixCode = this.getAttribute("data-pix");
   
                   // Set the PIX code in the input field
                   if (pixCodeInput) {
                       pixCodeInput.value = pixCode;
                   }
   
                   // Generate the QR code
                   qrCodeContainer.innerHTML = ""; // Clear previous QR code
                   new QRCode(qrCodeContainer, {
                       text: pixCode,
                       width: 150,
                       height: 150,
                       colorDark: "#000000",
                       colorLight: "#ffffff",
                       correctLevel: QRCode.CorrectLevel.H,
                   });
   
                   // Show the popup
                   pixPopup.style.display = "flex";
               });
           });
   
           closePopup.addEventListener("click", function () {
               pixPopup.style.display = "none";
           });
   
           copyPixButton.addEventListener("click", function () {
               navigator.clipboard.writeText(pixCodeInput.value)
                   .then(() => alert("Código PIX copiado!"))
                   .catch(err => console.error("Erro ao copiar o código PIX", err));
           });
   
           pixPopup.addEventListener("click", function (event) {
               if (event.target === pixPopup) {
                   pixPopup.style.display = "none";
               }
           });
       }
   
       // RSVP Form (unchanged)
       const rsvpForm = document.getElementById("rsvp-form");
       if (rsvpForm) {
           rsvpForm.addEventListener("submit", async (e) => {
               e.preventDefault();
   
               const name = document.getElementById("name").value;
               const guests = parseInt(document.getElementById("guests").value);
   
               if (!name || isNaN(guests)) {
                   alert("Por favor, preencha todos os campos corretamente.");
                   return;
               }
   
               // Show loading spinner
               const submitButton = rsvpForm.querySelector("button[type='submit']");
               submitButton.disabled = true;
               submitButton.innerHTML = '<div class="loading-spinner"></div>';
   
               try {
                   // Simulate API call
                   await new Promise(resolve => setTimeout(resolve, 2000));
   
                   // Show success message
                   document.getElementById("rsvp-message").textContent = "Presença confirmada com sucesso!";
               } catch (error) {
                   console.error("Erro:", error);
                   document.getElementById("rsvp-message").textContent = "Erro ao confirmar presença. Tente novamente.";
               } finally {
                   submitButton.disabled = false;
                   submitButton.textContent = "Confirmar Presença";
               }
           });
       }
});
