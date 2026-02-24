import MessageBubble from "./MessageBubble";

export default function ChatWindow({
  messages,
  loading
}) {
  return (
    <div className=" flex-1
      overflow-y-auto
      overflow-x-hidden
      p-4
      space-y-4
      bg-gray-100">
      {(Array.isArray(messages) ? messages : []).map((m, i) => (
        <MessageBubble key={i} msg={m}/>
      ))}

      {loading && (
        <p className="text-gray-500">
          AI is typing...
        </p>
      )}
    </div>
  );
}