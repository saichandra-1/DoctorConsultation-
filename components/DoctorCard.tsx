import { Doctor } from '../app/lib/doctors';
import { useRouter } from 'next/navigation';


export function DoctorCard({ doctor }: { doctor: Doctor }) {
    const router = useRouter();
    const formatSymptom = (symptom: string) => {
      return symptom.split('_').map(word => 
        word.charAt(0).toUpperCase() + word.slice(1)
      ).join(' ');
    };
  
    return (
      <div className="bg-white text-gray-900 rounded-lg p-4 shadow-lg hover:shadow-xl transition-shadow duration-300">
        <h3 className="text-xl font-semibold">{doctor.name}</h3>
        <p className="mb-2">🩺 {doctor.specialization}</p>
        <p>💼 {doctor.experience} years</p>
        <p className="mb-3">⭐ {doctor.rating} ({doctor.clients} patients)</p>
        
        <div className="mb-4">
          <p className="text-sm font-medium text-gray-700 mb-2">Treats symptoms:</p>
          <div className="flex flex-wrap gap-2">
            {doctor.expertise.map((symptom) => (
              <span
                key={symptom}
                className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium hover:bg-blue-200 transition-colors duration-200"
              >
                {formatSymptom(symptom)}
              </span>
            ))}
          </div>
        </div>
        
        <button 
        onClick={() => router.push(`/appointments?id=${doctor.id}`)}
        className="w-full mt-2 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors duration-200">
          Schedule Appointment
        </button>
      </div>
    );
  }
  
