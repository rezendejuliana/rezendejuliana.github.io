const express = require("express");
const fs = require("fs");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
const PORT = 3000;

app.use(cors({ origin: "https://seusite.com" })); // Substitua pelo domínio do seu site
app.use(bodyParser.json());

// Rota para salvar os dados do RSVP
app.post("/rsvp", (req, res) => {
    const { name, guests } = req.body;

    if (!name || typeof guests !== "number") {
        return res.status(400).json({ message: "Dados inválidos!" });
    }

    const newEntry = { name, guests, date: new Date().toISOString() };

    fs.readFile("rsvp-list.json", (err, data) => {
        let rsvpList = [];

        if (!err) {
            try {
                rsvpList = JSON.parse(data);
            } catch (error) {
                console.error("Erro ao ler JSON:", error);
            }
        }

        rsvpList.push(newEntry);

        fs.writeFile("rsvp-list.json", JSON.stringify(rsvpList, null, 2), (err) => {
            if (err) {
                console.error("Erro ao salvar RSVP:", err);
                return res.status(500).json({ message: "Erro ao salvar presença!" });
            }
            res.json({ message: "Presença confirmada com sucesso!" });
        });
    });
});

app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});