import { useState } from "react";
import { v4 as uuidv4 } from "uuid";

export default function useSession() {

  const getStoredSession = () => {
    let id = localStorage.getItem("sessionId");

    if (!id) {
      id = uuidv4();
      localStorage.setItem("sessionId", id);
    }
    return id;
  };

  const [sessionId, setSessionId] =
    useState(getStoredSession());

  const newChat = () => {
    const newId = uuidv4();
    localStorage.setItem("sessionId", newId);
    setSessionId(newId);
  };

  return { sessionId, newChat };
}