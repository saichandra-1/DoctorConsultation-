"use client";
// import { useState, useEffect } from "react";

export default function Doctors() {
  // const [doctors, setDoctors] = useState([]);

  // useEffect(() => {
  //   fetch("/api/doctors")
  //     .then((res) => res.json())
  //     .then((data) => setDoctors(data));
  // }, []);

  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold text-center mb-6">Available Doctors</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {/* {doctors.map((doctor) => (
          <DoctorCard key={doctor.id} doctor={doctor} />
        ))} */}
        <div>
          <h3>Doctor 1</h3>
          <p>Specialty: General Medicine</p>
          <p>Location: San Francisco, CA</p>
        </div>
      </div>
    </div>
  );
}
    