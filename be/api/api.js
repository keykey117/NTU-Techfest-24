const OpenAI = require("openai");
const openai = new OpenAI({ apikey: process.env.OPENAI_API_KEY });

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

module.exports = { completeText };
