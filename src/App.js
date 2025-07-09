import { useState } from "react";
import InputPanel from "./components/InputPanel";
import ChatBubble from "./components/ChatBubble";
import PdfModal from "./components/PdfModal";

export default function App() {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [pdfOpen, setPdfOpen] = useState(false);

  const pdfUrl =
    "https://lexisingapore-my.sharepoint.com/:b:/g/personal/harshit_lexi_sg/EdOegeiR_gdBvQxdyW4xE6oBCDgj5E4Bo5wjvhPHpqgIuQ?e=TEu4vz";

  const handleQuerySubmit = (query) => {
    setMessages((prev) => [...prev, { type: "user", text: query }]);
    setLoading(true);

    setTimeout(() => {
      const response = {
        answer: `**Yes**,  under Section 166 of the Motor Vehicles Act, 1988, the claimants are entitled to an addition for future prospects even when the deceased was self-employed and aged 54–55 years at the time of the accident. In Dani Devi v. Pritam Singh, the Court held that 10% of the deceased’s annual income should be added as future prospects.

> *"...as the age of the deceased at the time of accident was held to be about 54–55 years, being self-employed, **10% of annual income** should have been awarded on account of future prospects."*  
> [Para 7]`,
        citation: {
          source: "Dani_Devi_v_Pritam_Singh.pdf",
          link: pdfUrl,
        },
      };

      setMessages((prev) => [
        ...prev,
        {
          type: "bot",
          text: response.answer,
          citation: response.citation,
        },
      ]);
      setLoading(false);
    }, 1000);
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-6">
      <h1 className="text-2xl font-bold text-center mb-4">Lexi Legal Assistant</h1>

      <div className="space-y-4">
        {messages.map((msg, index) => (
          <ChatBubble
            key={index}
            {...msg}
            onCitationClick={() => setPdfOpen(true)}
          />
        ))}
      </div>

      <InputPanel onSubmit={handleQuerySubmit} loading={loading} />

      <PdfModal
        isOpen={pdfOpen}
        onClose={() => setPdfOpen(false)}
      
      />
    </div>
  );
}
