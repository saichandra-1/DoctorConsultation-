export default function DoctorCard({ doctor }) {
    return (
      <div className="bg-white text-gray-900 rounded-lg p-4 shadow-lg">
        <h3 className="text-xl font-semibold">{doctor.name}</h3>
        <p>🩺 {doctor.specialization}</p>
        <p>💼 {doctor.experience} years</p>
        <p>⭐ {doctor.rating} ({doctor.clients} patients)</p>
        <button className="mt-3 bg-blue-500 text-white px-4 py-2 rounded">Schedule Appointment</button>
      </div>
    );
  }
        