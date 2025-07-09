import ReactMarkdown from "react-markdown";

export default function ChatBubble({ type, text, citation, onCitationClick }) {
  const isUser = type === "user";

  return (
    <div className={`flex ${isUser ? "justify-start" : "justify-end"}`}>
      <div
        className={`max-w-[80%] p-4 rounded-xl shadow-md whitespace-pre-wrap ${
          isUser
            ? "bg-gray-200 text-left rounded-bl-none"
            : "bg-blue-100 text-left rounded-br-none"
        }`}
      >
        <ReactMarkdown>{text}</ReactMarkdown>

        {citation && (
          <div className="mt-4 flex items-center gap-2 text-sm">
            <button
              onClick={onCitationClick}
              
            >
                <span className="bg-red-600 text-white px-2 py-1 rounded text-xs font-semibold">
                    PDF
                </span>
              
            
            <span className="text-sm text-blue-600 underline hover:text-blue-800 transition cursor-pointer">
  {citation.source}
</span>

            </button>
          </div>
        )}
      </div>
    </div>
  );
}
