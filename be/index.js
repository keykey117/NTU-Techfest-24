require("dotenv").config();
const multer = require("multer");
const upload = multer({ dest: "./uploads" });

const express = require("express");
const cors = require("cors");
const morgan = require("morgan");

const api = require("./api/api");

const app = express();

app.use(express.json());
app.use(cors());

morgan.token("body", (req) => {
  return JSON.stringify(req.body);
});

// logging requests
app.use(morgan("dev"));

app.get("/", (req, res, next) => {
  res.json({ test: "test" });
});

app.post("/api/chatbot", (req, res, next) => {
  const body = req.body;
  if (!body.chat) {
    return res.status(400).json({
      error: "chat missing",
    });
  }
  chat = [...body.chat];
  console.log(chat);
  api
    .completeText(body.chat)
    .then((chat) => res.json(chat))
    .catch((err) => {
      next(err);
    });
});

app.post(
  "/api/transcribe",
  upload.single("audioFile"),
  async (req, res, next) => {
    api
      .transcribe(req.file)
      .then((transcript) => res.json(transcript))
      .catch((err) => {
        next(err);
      });
  }
);

app.post("/api/tts", (req, res, next) => {
  const body = req.body;
  if (!body.text) {
    return res.status(400).json({
      error: "text missing",
    });
  }
  api
    .textToSpeech(body.text)
    .then(() => {
      res.json({ message: "success" });
    })
    .catch((err) => {
      next(err);
    });
});

const unknownEndpoint = (req, res) => {
  res.status(404).send({ error: "unknown endpoint" });
};

app.use(unknownEndpoint);

const errorHandler = (err, req, res, next) => {
  console.log(err.message);
  return res.status(400).json({ error: err.message });
};

app.use(errorHandler);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`server running on port ${PORT}`);
});
