export default function Header({ newChat }) {
  return (
    <div className="flex justify-between p-4 bg-white shadow">
      <h1 className="font-bold text-lg">
        AI Support Assistant
      </h1>

      <button
        onClick={newChat}
        className="bg-blue-500 text-white px-4 py-2 rounded"
      >
        New Chat
      </button>
    </div>
  );
}