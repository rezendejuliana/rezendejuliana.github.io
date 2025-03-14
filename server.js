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

    const response = await fetch(`https://api.jsonbin.io/v3/b/${BIN_ID}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            "X-Master-Key": API_KEY,
        },
        body: JSON.stringify(newEntry),
    });

    if (response.ok) {
        document.getElementById("rsvp-message").textContent = "Presença confirmada com sucesso!";
    } else {
        document.getElementById("rsvp-message").textContent = "Erro ao confirmar presença. Tente novamente.";
    }
});