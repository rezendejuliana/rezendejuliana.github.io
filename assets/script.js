document.addEventListener('DOMContentLoaded', function () {
     // Inicializa o Swiper apenas na galeria
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

    // Função do Contador Regressivo
    const weddingDate = new Date("2026-04-18T10:00:00").getTime();

    function updateCountdown() {
        const now = new Date().getTime();
        const timeLeft = weddingDate - now;

        if (timeLeft < 0) {
            document.getElementById("timer").innerHTML = "Já Casamos! 🎉";
            return;
        }

        const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
        const months = Math.floor(days / 30);
        const remainingDays = days % 30;
        const hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);

        document.getElementById("timer").innerHTML = `${months}m ${remainingDays}d ${hours}h ${minutes}m ${seconds}s`;
    }

    setInterval(updateCountdown, 1000);
    updateCountdown();
});

// Formulário de RSVP
document.getElementById("rsvp-form")?.addEventListener("submit", function(event) {
    event.preventDefault();

    let name = document.getElementById("name").value.trim();
    let guests = document.getElementById("guests").value;

    if (!name) {
        alert("Por favor, insira seu nome.");
        return;
    }

    fetch("http://localhost:3000/rsvp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, guests })
    })
    .then(response => response.json())
    .then(data => {
        document.getElementById("rsvp-message").innerText = data.message;
    })
    .catch(error => {
        console.error("Erro:", error);
        document.getElementById("rsvp-message").innerText = "Erro ao confirmar presença. Tente novamente.";
    });

    this.reset();
});

