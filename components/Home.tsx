"use client";
import { useState } from "react";
import Hero from "./Hero";
import SymptomSelector from "@/components/SymptomSelector";
import PredictedDiseases from "@/components/PredictedDiseases";
import Loader from "./Loader";

export default function Home() {
  const [selectedSymptoms, setSelectedSymptoms] = useState<string[]>([]);
  const [predictedDiseases, setPredictedDiseases] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (selectedSymptoms.length === 0) return;
    setLoading(true);

    try {
      const res = await fetch("/api/predict", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ symptoms: selectedSymptoms }),
      });

      const data = await res.json();
      setPredictedDiseases(data.predictedDiseases || []);
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center p-6">
      <Hero />
      <SymptomSelector onSelect={setSelectedSymptoms} />

      <button
        onClick={handleSubmit}
        disabled={loading || selectedSymptoms.length === 0}
        className="mt-4 px-6 py-3 bg-blue-500 text-white font-semibold rounded-lg disabled:bg-gray-400"
      >
        {loading ? "Predicting..." : "Get Prediction"}
      </button>

      {loading ? <Loader /> : <PredictedDiseases diseases={predictedDiseases} />}
    </div>
  );
}
