require("dotenv").config();
const express = require("express");
const morgan = require("morgan");

const api = require("./api/api");

const app = express();

app.use(express.json());

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
