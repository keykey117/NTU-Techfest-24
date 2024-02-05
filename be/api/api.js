const OpenAI = require("openai");
const openai = new OpenAI({ apikey: process.env.OPENAI_API_KEY });
const axios = require("axios");
const fs = require("fs");
const FormData = require("form-data");

// messages is an array of message objects
// message object = {role: "user" or "assistant", content: "message"}
async function completeText(messages) {
  const system = { role: "system", content: "You are a helpful assistant" };

  const completion = await openai.chat.completions.create({
    messages: [system, ...messages],
    model: "gpt-3.5-turbo",
  });

  // for debugging
  console.log(completion.choices[0]);

  return completion.choices[0].message;
}

async function transcribe(audioFile) {
  try {
    const formData = new FormData();
    formData.append("model", "whisper-1");
    formData.append("language", "en");
    formData.append("file", fs.createReadStream(audioFile.path), {
      filename: audioFile.originalname,
    });
    const resp = await axios.post(
      "https://api.openai.com/v1/audio/transcriptions",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
        },
      }
    );

    return resp.data.text;
  } catch (e) {
    console.log("error", e);
    res.send(new Error(e));
  }
}

module.exports = { completeText, transcribe };
