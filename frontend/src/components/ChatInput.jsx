import { useState } from "react";

export default function ChatInput({ onSend }) {

  const [text, setText] = useState("");

  const submit = () => {
    if (!text.trim()) return;
    onSend(text);
    setText("");
  };

  return (
    <div className="p-4 bg-white flex gap-2">
      <input
        value={text}
        onChange={e=>setText(e.target.value)}
        className="flex-1 border p-2 rounded"
        placeholder="Ask something..."
      />

      <button
        onClick={submit}
        className="bg-blue-600 text-white px-4 rounded"
      >
        Send
      </button>
    </div>
  );
}