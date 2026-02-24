import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:5000/api"
});

export const sendMessage = (data) =>
  api.post("/chat", data);

export const getConversation = (sessionId) =>
  api.get(`/conversations/${sessionId}`);

export const getSessions = () =>
  api.get("/sessions");