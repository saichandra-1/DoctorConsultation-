import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { symptoms } = await req.json();

    if (!symptoms || !Array.isArray(symptoms)) {
      return NextResponse.json({ error: "Invalid input" }, { status: 400 });
    }

    // Expanded disease prediction based on symptoms
    const diseasePredictions: Record<string, string[]> = {
      fever: ["Flu", "Malaria", "Typhoid", "Dengue"],
      cough: ["Common Cold", "Bronchitis", "Asthma", "Pneumonia"],
      headache: ["Migraine", "Tension Headache", "Sinusitis", "Flu"],
      fatigue: ["Anemia", "Hypothyroidism", "Diabetes", "Chronic Fatigue Syndrome"],
      nausea: ["Food Poisoning", "Gastritis", "Peptic Ulcer", "Pregnancy"],
      rash: ["Allergic Reaction", "Eczema", "Psoriasis", "Chickenpox"],
      chest_pain: ["Heart Attack", "Angina", "Pneumonia", "Costochondritis"],
      abdominal_pain: ["Appendicitis", "Irritable Bowel Syndrome", "Gallstones", "Kidney Stones"],
      shortness_of_breath: ["Asthma", "Chronic Obstructive Pulmonary Disease (COPD)", "Pneumonia", "Pulmonary Embolism"],
      joint_pain: ["Arthritis", "Gout", "Lupus", "Lyme Disease"],
      dizziness: ["Vertigo", "Low Blood Pressure", "Dehydration", "Anemia"],
      sore_throat: ["Tonsillitis", "Pharyngitis", "Strep Throat", "Laryngitis"],
      diarrhea: ["Gastroenteritis", "Irritable Bowel Syndrome", "Crohn's Disease", "Celiac Disease"],
      weight_loss: ["Hyperthyroidism", "Cancer", "Diabetes", "Tuberculosis"],
    };

    const predictedDiseases = new Set<string>();

    symptoms.forEach((symptom) => {
      if (diseasePredictions[symptom]) {
        diseasePredictions[symptom].forEach((disease) =>
          predictedDiseases.add(disease)
        );
      }
    });

    return NextResponse.json({
      predictedDiseases: Array.from(predictedDiseases),
    });
  } catch (error) {
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
  }
}
