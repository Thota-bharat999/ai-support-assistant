import MessageBubble from "./MessageBubble";

export default function ChatWindow({
  messages,
  loading
}) {
  return (

    <div className="
      h-full
      overflow-y-auto
      overflow-x-hidden
      px-3
      md:px-6
      py-4
    ">

      <div className="
        max-w-4xl
        mx-auto
        space-y-4
      ">
        {(Array.isArray(messages) ? messages : []).map((m, i) => (
          <MessageBubble key={i} msg={m}/>
        ))}

        {loading && (
          <p>AI typing...</p>
        )}
      </div>

    </div>
  );
}