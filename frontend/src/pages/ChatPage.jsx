import { useEffect, useState } from "react";
import Header from "../components/Header";
import ChatWindow from "../components/ChatWindow";
import ChatInput from "../components/ChatInput";
import useSession from "../hooks/useSession";
import {
 sendMessage,
 getConversation
} from "../api/chatApi";

export default function ChatPage() {

  const { sessionId, newChat } =
    useSession();

  const [messages,setMessages]=useState([]);
  const [loading,setLoading]=useState(false);

  useEffect(()=>{
    loadConversation();
  },[sessionId]);

  const loadConversation=async()=>{
    const res =
      await getConversation(sessionId);
    setMessages(res.data);
  };

  const handleSend = async(text)=>{

    const userMsg={
      role:"user",
      content:text,
      created_at:new Date()
    };

    setMessages(prev=>[...prev,userMsg]);
    setLoading(true);

    const res =
      await sendMessage({
        sessionId,
        message:text
      });

    setMessages(prev=>[
      ...prev,
      {
        role:"assistant",
        content:res.data.reply,
        created_at:new Date()
      }
    ]);

    setLoading(false);
  };

  return (
    <div className="h-screen flex flex-col bg-gray-100">

      {/* HEADER */}
      <header className="flex justify-between items-center
        px-4 md:px-8 py-4 bg-white shadow-sm">

        <h1 className="font-semibold text-lg">
          AI Support Assistant
        </h1>

        <button onClick={newChat} className="bg-blue-500 text-white
          px-4 py-2 rounded-lg">
          New Chat
        </button>
      </header>

      {/* CHAT AREA */}
      <div className="flex-1 overflow-hidden">
        <ChatWindow messages={messages} loading={loading} />
      </div>

      {/* INPUT */}
      <ChatInput onSend={handleSend} />

    </div>
  );
}