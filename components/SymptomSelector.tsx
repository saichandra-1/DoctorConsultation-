"use client";
import { useState } from "react";
import { symptomsList } from "../app/lib/symptoms";

export default function SymptomSelector({ onSelect }: { onSelect: (selected: string[]) => void }) {
  const [selectedSymptoms, setSelectedSymptoms] = useState<string[]>([]);

  const toggleSymptom = (symptom: string) => {
    const updatedSymptoms = selectedSymptoms.includes(symptom)
      ? selectedSymptoms.filter((s) => s !== symptom)
      : [...selectedSymptoms, symptom];

    setSelectedSymptoms(updatedSymptoms);
    onSelect(updatedSymptoms);
  };

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 p-5">
      {symptomsList.map((symptom) => (
        <div
          key={symptom}
          className={`cursor-pointer p-4 rounded-lg border-2 transition-all text-center
            ${selectedSymptoms.includes(symptom) ? "bg-blue-700 border-blue-300" : "bg-white text-gray-900 border-gray-300"}
          `}
          onClick={() => toggleSymptom(symptom)}
        >
          {symptom.replace(/_/g, " ")}
        </div>
      ))}
    </div>
  );
}
