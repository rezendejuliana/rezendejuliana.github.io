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

    // 🟢 Pop-up do PIX
    const presentButtons = document.querySelectorAll(".present-link2");
    const pixPopup = document.getElementById("pix-popup");
    const closePopup = document.querySelector(".pix-close");
    const pixCodeInput = document.getElementById("pix-code");
    const copyPixButton = document.getElementById("copy-pix");

    if (pixPopup) {
        presentButtons.forEach(button => {
            button.addEventListener("click", function () {
                console.log("Botão 'Presentear' clicado!"); // Verificação no console
                const pixCode = this.getAttribute("data-pix");
                if (pixCodeInput) {
                    pixCodeInput.value = pixCode;
                }
                pixPopup.style.display = "flex";
                pixPopup.classList.add("active");
            });
        });

        if (closePopup) {
            closePopup.addEventListener("click", function () {
                console.log("Fechar pop-up clicado!");
                pixPopup.style.display = "none";
                pixPopup.classList.remove("active");
            });
        } else {
            console.error("Botão de fechar pop-up não encontrado!");
        }

        if (copyPixButton) {
            copyPixButton.addEventListener("click", function () {
                navigator.clipboard.writeText(pixCodeInput.value)
                    .then(() => alert("Código PIX copiado!"))
                    .catch(err => console.error("Erro ao copiar o código PIX", err));
            });
        } else {
            console.error("Botão de copiar código PIX não encontrado!");
        }
    } else {
        console.error("Elemento #pix-popup não encontrado!");
    }


    // 🟢 Fechar ao clicar fora do pop-up (na overlay)
    pixPopup.addEventListener("click", function (event) {
        if (event.target === pixPopup) { // Garante que clicou fora da caixa
            pixPopup.style.display = "none";
        }
    });

    // 🟢 RSVP Form
    const rsvpForm = document.getElementById("rsvp-form");
    if (rsvpForm) {
        const BIN_ID = "67d387f18960c979a57127da";
        const API_KEY = "$2a$10$MbHv9mfb58XmirgOlQIQ7...WO4G8NVLTXvSe1Qw2PteXn9ACZ0G2";

        rsvpForm.addEventListener("submit", async (e) => {
            e.preventDefault();

            const name = document.getElementById("name").value;
            const guests = parseInt(document.getElementById("guests").value);

            if (!name || isNaN(guests)) {
                alert("Por favor, preencha todos os campos corretamente.");
                return;
            }

            const newEntry = { name, guests, date: new Date().toISOString() };

            try {
                // 🟢 Fetch the existing data
                const getResponse = await fetch(`https://api.jsonbin.io/v3/b/${BIN_ID}/latest`, {
                    method: "GET",
                    headers: {
                        "X-Master-Key": API_KEY,
                    },
                });

                if (!getResponse.ok) {
                    throw new Error("Erro ao buscar dados existentes.");
                }

                const { record: existingData } = await getResponse.json();
                const dataArray = Array.isArray(existingData) ? existingData : [];
                const updatedData = [...dataArray, newEntry];

                // 🟢 Update the bin
                const putResponse = await fetch(`https://api.jsonbin.io/v3/b/${BIN_ID}`, {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                        "X-Master-Key": API_KEY,
                    },
                    body: JSON.stringify(updatedData),
                });

                if (putResponse.ok) {
                    document.getElementById("rsvp-message").textContent = "Presença confirmada com sucesso!";
                } else {
                    throw new Error("Erro ao atualizar o bin.");
                }
            } catch (error) {
                console.error("Erro:", error);
                document.getElementById("rsvp-message").textContent = "Erro ao confirmar presença. Tente novamente.";
            }
        });
    }
});
