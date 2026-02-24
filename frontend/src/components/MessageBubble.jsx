export default function MessageBubble({ msg }) {

  const isUser = msg.role === "user";

  return (
    <div
      className={`flex ${
        isUser ? "justify-end" : "justify-start"
      }`}
    >
      <div
 className={`p-3 rounded-lg
 max-w-[70%]
 break-words
 ${
   isUser
   ? "bg-blue-500 text-white"
   : "bg-white shadow"
 }`}
>
        <p>{msg.content}</p>

        <span className="text-xs opacity-60">
          {new Date(msg.created_at)
            .toLocaleTimeString()}
        </span>
      </div>
    </div>
  );
}