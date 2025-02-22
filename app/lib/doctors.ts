// lib/doctors.ts

export interface Doctor {
    id: number;
    name: string;
    specialization: string;
    experience: number;
    rating: number;
    clients: number;
    expertise: string[];
  }
  
  export const doctors: Doctor[] = [
    {
      id: 0,
      name: "Dr. Sarah Johnson",
      specialization: "General Medicine",
      experience: 12,
      rating: 4.8,
      clients: 1500,
      expertise: ["fever", "cough", "fatigue", "sore_throat", "headache"]
    },
    {
      id: 1,
      name: "Dr. Michael Chen",
      specialization: "Pulmonologist",
      experience: 15,
      rating: 4.9,
      clients: 1200,
      expertise: ["shortness_of_breath", "chest_pain", "cough"]
    },
    {
      id: 2,
      name: "Dr. Emily Rodriguez",
      specialization: "Dermatologist",
      experience: 8,
      rating: 4.7,
      clients: 950,
      expertise: ["rash", "weight_loss", "fever"]
    },
    {
      id: 3,
      name: "Dr. James Williams",
      specialization: "Gastroenterologist",
      experience: 20,
      rating: 4.9,
      clients: 2100,
      expertise: ["nausea", "diarrhea", "abdominal_pain"]
    },
    {
      id: 4,
      name: "Dr. Patricia Lee",
      specialization: "Neurologist",
      experience: 14,
      rating: 4.8,
      clients: 1350,
      expertise: ["headache", "dizziness", "fatigue"]
    },
    {
      id: 5,
      name: "Dr. Robert Martinez",
      specialization: "Rheumatologist",
      experience: 17,
      rating: 4.6,
      clients: 1100,
      expertise: ["joint_pain", "fatigue", "weight_loss"]
    },
    {
      id: 6,
      name: "Dr. Lisa Thompson",
      specialization: "Internal Medicine",
      experience: 10,
      rating: 4.7,
      clients: 890,
      expertise: ["fever", "chest_pain", "shortness_of_breath", "fatigue"]
    }
  ];
  