export default function MessageBubble({ msg }) {

  const isUser = msg.role === "user";

  return (
    <div
 className={` px-4 py-3 rounded-2xl
 max-w-[85%] md:max-w-[70%]
 break-words
 ${
   isUser
   ? "ml-auto bg-blue-500 text-white"
   : "bg-white shadow"
 }`}
>
        <p>{msg.content}</p>

        <span className="text-xs opacity-60">
          {new Date(msg.created_at)
            .toLocaleTimeString()}
        </span>
    </div>
  );
}