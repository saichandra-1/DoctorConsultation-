"use client"
// the appointment component by taking doctor id hrere 
import { useState, useEffect, useCallback } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { format, addDays, parseISO } from 'date-fns';
import { doctors } from '../app/lib/doctors';

interface TimeSlot {
  id: string;
  startTime: string;
  endTime: string;
}
interface Doctor {
  id: string;
  name: string;
  specialization: string;
  experience: number;
  rating: number;
  clients: number;
}

export function AppointmentsComp() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const doctorId = searchParams.get('id');

  const [doctor, setDoctor] = useState<Doctor|null>(null);
  const [selectedDate, setSelectedDate] = useState<string>('');
  const [availableSlots, setAvailableSlots] = useState<TimeSlot[]>([]);
  const [selectedSlot, setSelectedSlot] = useState<TimeSlot | null>(null);
  const [showSummary, setShowSummary] = useState(false);
  const [appointmentId,setAppointmentId] =useState<string>('');
  
  
  // Get next 10 days
  const availableDates = Array.from({ length: 10 }, (_, i) => 
    format(addDays(new Date(), i + 1), 'yyyy-MM-dd')
);

useEffect(() => {
  if (doctorId) {
    // Fetch doctor details
    // @ts-expect-error: Type mismatch due to incompatible library types
      const doctor= doctors[doctorId];
      setDoctor(doctor)
      // console.log(doctorId);
    }
  }, [doctorId]);


  const makeappointment = async () => {
    try {
      const response = await fetch('/api/appointments', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          doctorId,
          date : selectedDate,
          startTime: selectedSlot?.startTime,
          endTime: selectedSlot?.endTime,
        }),
      });
      
      const data = await response.json();
      setAppointmentId(data.id);
      if(data.id)
      return true;
    } catch (error) {
      console.error('Error making appointment:', error);
    }
  };

  const fetchAvailableSlots = useCallback(async () => {
    try {
      const response = await fetch(`/api/slots?id=${doctorId}&date=${selectedDate}`);
      const data = await response.json();
      setAvailableSlots(data);
    } catch (error) {
      console.error('Error fetching time slots:', error);
    }
  }, [doctorId, selectedDate]); // Dependencies for useCallback
  
  useEffect(() => {
    if (selectedDate) {
      fetchAvailableSlots();
    }
  }, [fetchAvailableSlots,selectedDate]); // Now safe to include in dependency array
  

  const handlePayment = async (method: string) => {
    try {
      
      // Check if makeappointment() was successful (assuming it returns something to indicate success)
        const response = await fetch('/api/payments', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            appointmentId: appointmentId,
            amount: 2000,
            doctorId,
            slotId: selectedSlot?.id,
            paymentMethod: method,
          }),
        });
  
        const data = await response.json();
        if (data.success) {
          // router.push(`/invoice/${data.invoiceId}`);
          router.push(`/meet`);
        }
         else {
        // Handle the case where appointment couldn't be made
        console.log('Failed to make appointment');
      }
    } catch (error) {
      console.error('Error processing payment:', error);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      {doctor && (
        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <h2 className="text-2xl font-bold mb-4">{doctor.name}</h2>
          <p className="text-gray-600">🩺 {doctor.specialization}</p>
          <p className="text-gray-600">💼 {doctor.experience} years experience</p>
          <p className="text-gray-600">⭐ {doctor.rating} ({doctor.clients} patients)</p>
        </div>
      )}


      <div className="bg-white rounded-lg shadow-lg p-6">
        <h3 className="text-xl font-semibold mb-4">Schedule Appointment</h3>
        
        {/* Date Selection */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Select Date
          </label>
          <select
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            className="w-full p-2 border rounded-md"
          >
            <option value="">Choose a date</option>
            {availableDates.map(date => (
              <option key={date} value={date}>
                {format(parseISO(date), 'MMMM d, yyyy')}
              </option>
            ))}
          </select>
        </div>

        {/* Time Slots */}
        {selectedDate && (
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Available Time Slots
            </label>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {availableSlots.map(slot => (
                <button
                  key={slot.id}
                  onClick={() => setSelectedSlot(slot)}
                  className={`p-2 border rounded-md ${
                    selectedSlot?.id === slot.id
                      ? 'bg-blue-500 text-white'
                      : 'hover:bg-blue-50'
                  }`}
                >
                  {format(parseISO(slot.startTime), 'h:mm a')}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Finalize Button */}
        {selectedSlot && (
          <button
            onClick={async() => {setShowSummary(true);await makeappointment();}}
            className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600"
          >
            Finalize Appointment
          </button>
        )}
      </div>

      {/* Summary Modal */}
      {showSummary && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg p-6 max-w-md w-full">
            <h3 className="text-xl font-semibold mb-4">Appointment Summary</h3>
            <p>Doctor: {doctor?.name}</p>
            <p>Date: {format(parseISO(selectedDate), 'MMMM d, yyyy')}</p>
            <p>Time: {format(parseISO(selectedSlot?.startTime || ''), 'h:mm a')}</p>
            <p>Duration: 1 hour</p>
            <p className="font-semibold mt-4">Select Payment Method:</p>
            
            <div className="grid grid-cols-2 gap-3 mt-3">
              {['UPI', 'CREDIT_CARD', 'PHONE_PAY', 'GPAY', 'WALLET'].map(method => (
                <button
                  key={method}
                  onClick={() => handlePayment(method)}
                  className="p-2 border rounded-md hover:bg-blue-50"
                >
                  {method}
                </button>
              ))}
            </div>
            
            <button
              onClick={() => setShowSummary(false)}
              className="w-full mt-4 p-2 border rounded-md hover:bg-gray-50"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
}