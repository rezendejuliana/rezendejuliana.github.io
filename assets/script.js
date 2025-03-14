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

const BIN_ID = "67d387f18960c979a57127da";
const API_KEY = "$2a$10$MbHv9mfb58XmirgOlQIQ7...WO4G8NVLTXvSe1Qw2PteXn9ACZ0G2";

document.getElementById("rsvp-form").addEventListener("submit", async (e) => {
    e.preventDefault();

    const name = document.getElementById("name").value;
    const guests = parseInt(document.getElementById("guests").value);

    if (!name || isNaN(guests)) {
        alert("Por favor, preencha todos os campos corretamente.");
        return;
    }

    const newEntry = { name, guests, date: new Date().toISOString() };

    try {
        // Step 1: Fetch the existing data from the bin
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

        // Ensure existingData is an array (handle cases where the bin is empty or contains invalid data)
        const dataArray = Array.isArray(existingData) ? existingData : [];

        // Step 2: Append the new entry to the existing data
        const updatedData = [...dataArray, newEntry];

        // Step 3: Update the bin with the combined data
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