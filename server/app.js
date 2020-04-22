const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const mailSender = require("./mail-sender")

const app = express();

var corsOptions = {
    origin: '*',
    optionsSuccessStatus: 200
};

app.use(cors(corsOptions));
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb' }));

app.use(bodyParser.json());

app.post("/sendmail", async (req, res) => {
    console.log("request came");
    let application = req.body;

    try {
        const sentMessageInfo = await mailSender.sendMail(application);
        res.send(sentMessageInfo);
    } catch (error) {
        console.error(error);
        res.status(400);
        res.send({ error: "Failed to send email" });
    }
});

app.listen(3000, () => {
    console.log("The server started on port 3000");
});