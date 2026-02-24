import { useState } from "react";

export default function ChatInput({ onSend }) {

  const [text, setText] = useState("");

  const submit = () => {
    if (!text.trim()) return;
    if (typeof onSend === "function") {
      onSend(text);
      setText("");
    } else {
      console.warn("ChatInput: onSend is not a function", onSend);
    }
  };

  return (
    <div className=" bg-white
 border-t
 p-3 md:p-4
 flex gap-2">
      <input
        value={text}
        onChange={e=>setText(e.target.value)}
        className="flex-1
 border
 rounded-xl
 px-4 py-2
 text-sm md:text-base"
        placeholder="Ask something..."
      />

      <button
        onClick={submit}
        className=" bg-blue-500
 text-white
 px-4 md:px-6
 rounded-xl"
      >
        Send
      </button>
    </div>
  );
}