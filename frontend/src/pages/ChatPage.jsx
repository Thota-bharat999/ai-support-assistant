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
    <div className="h-screen flex flex-col overflow-hidden">
      <Header newChat={newChat}/>
      <ChatWindow
        messages={messages}
        loading={loading}
      />
      <ChatInput onSend={handleSend}/>
    </div>
  );
}