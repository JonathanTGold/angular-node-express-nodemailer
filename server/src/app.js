const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const mailSender = require("./mail-sender");

const app = express();

const port = 3000;

const corsOptions = {
    origin: '*',
    optionsSuccessStatus: 200
};

app.use(cors(corsOptions));
app.use(express.json({ limit: '2mb' }));
app.use(bodyParser.json());

app.post("/sendmail", async (req, res) => {
    console.info("request came");
    const form = req.body;

    const WasSent = await mailSender.send(form);

    WasSent ? res.status(200) : res.status(500);

    res.send({ sent: WasSent });
});

app.listen(3000, () => {
    console.log(`The server listening on port ${port}`);
});