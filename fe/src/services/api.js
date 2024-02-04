import axios from "axios";

const baseUrl = "http://localhost:3001/api/chatbot";

const completeText = (chatHistory) => {
  console.log(chatHistory);
  const chat = { chat: chatHistory };
  const req = axios.post(baseUrl, chat);
  return req.then((res) => res.data);
};

export default { completeText };
