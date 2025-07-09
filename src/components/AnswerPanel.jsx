export default function AnswerPanel({ answerData }) {
  if (!answerData) return null;

  const { answer, citations } = answerData;

  return (
    <div className="bg-white rounded-lg p-3 border-l-4 border-blue-600">
      <p className="text-lg">{answer}</p>

      {citations.map((cite, index) => (
        <div key={index} className="mt-4 text-sm">
          <strong>Source:</strong>{" "}
          <a
            href={cite.link}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-700 underline"
          >
            {cite.source}
          </a>
          <p className="italic mt-1">“{cite.text}”</p>
        </div>
      ))}
    </div>
  );
}
