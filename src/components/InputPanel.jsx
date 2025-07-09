import { useState } from "react";

export default function InputPanel({ onSubmit, loading }) {
  const [query, setQuery] = useState("");

  const handleSubmit = () => {
    if (!query.trim()) return;
    onSubmit(query);
    setQuery("");
  };

  return (
    <div className="mt-6 flex items-center gap-2">
      <textarea
        rows={2}
        placeholder="Ask anything..."
        className="flex-1 p-3 border rounded-lg"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <button
        onClick={handleSubmit}
        disabled={loading}
        className="px-4 py-2 bg-pink-600 text-white rounded-lg"
      >
        {loading ? "..." : "Send"}
      </button>
    </div>
  );
}
