import axios from "axios";

const baseUrl = "http://localhost:3001/api";

const completeText = (chatHistory) => {
  console.log(chatHistory);
  const chat = { chat: chatHistory };
  const req = axios.post(baseUrl + "/chatbot", chat);
  return req.then((res) => res.data);
};

const transcribe = (blob) => {
  const fd = new FormData();
  fd.append("audioFile", blob, "test.webm");
  const req = axios.post(baseUrl + "/transcribe", fd);
  return req.then((res) => res.data);
};

const textToSpeech = (text) => {
  const data = { text: text };
  const req = axios.post(baseUrl + "/tts", data);
  return req.then((res) => res.data.message === "success");
};

export default { completeText, transcribe, textToSpeech };
