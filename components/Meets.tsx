"use client"
import { useState, useEffect } from "react"
import { format, parseISO } from 'date-fns';
import { doctors } from "@/app/lib/doctors";

export function Meets() {
    const [meets, setMeets] = useState([]);
    useEffect(() => {
        const fetchMeets = async () => {
            try {
                const response = await fetch('/api/meets'); // Use relative URL
                const data = await response.json();
                if (data.error) {
                    console.log(data.error);
                } else {
                    setMeets(data.data); // Update state with fetched data
                }
            } catch (error) {
                console.error('Fetch error:', error);
            }
        };
        fetchMeets();
    }, []); // Empty dependency array runs once on mount

    interface Meet{
        id:string;
        doctorId:number;
        date:string;
        startTime:string;
        endTime:string;
    }

    return (
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
    {meets.map((meet:Meet) => (
        <div key={meet.id} className="bg-white text-gray-900 rounded-lg p-4 shadow-lg hover:shadow-xl transition-shadow duration-300">
            <h1 className="text-2xl font-semibold">Your upcoming meeting</h1>
            <h1 className="text-xl font-medium">{doctors[meet.doctorId].name}</h1>
            <p className="text-sm font-semibold">Date: {format(parseISO(meet.date),'MMMM d, yyyy')}</p>
            <p className="text-sm font-semibold">Start Time: {format(parseISO(meet.startTime), 'h:mm a')}</p>
            <p className="text-sm font-semibold">End Time: {format(parseISO(meet.endTime),'h:mm a')}</p>
            <button className="mt-4 px-6 py-3 bg-blue-500 text-white font-semibold rounded-lg disabled:bg-gray-400">
                Start meeting
            </button>
        </div>
    ))}
</div>

    );
}