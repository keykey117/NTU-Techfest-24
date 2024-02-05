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

export default { completeText, transcribe };
