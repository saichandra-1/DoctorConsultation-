"use client";
import { useState } from 'react';
import { doctors } from '../app/lib/doctors';
import { DoctorCard } from './DoctorCard';
import { symptomsList } from '@/app/lib/symptoms';

// Main Component
export  function DoctorsComp() {
  const [selectedSymptom, setSelectedSymptom] = useState<string>('');

  const filteredDoctors = selectedSymptom
    ? doctors.filter(doctor => doctor.expertise.includes(selectedSymptom))
    : doctors;

  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold text-center mb-6">Available Doctors</h2>
      
      <div className="mb-8">
        <label htmlFor="symptom-filter" className="block text-sm font-medium text-gray-700 mb-2">
          Filter by Symptom:
        </label>
        <select
          id="symptom-filter"
          value={selectedSymptom}
          onChange={(e) => setSelectedSymptom(e.target.value)}
          className="w-full md:w-64 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        >
          <option value="">All Symptoms</option>
          {symptomsList.map((symptom) => (
            <option key={symptom} value={symptom}>
              {symptom.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
            </option>
          ))}
        </select>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {filteredDoctors.map((doctor) => (
          <DoctorCard key={doctor.id} doctor={doctor} />
        ))}
      </div>
    </div>
  );
}