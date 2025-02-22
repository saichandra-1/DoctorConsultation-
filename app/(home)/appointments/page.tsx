import { Suspense } from "react";
import { AppointmentsComp } from "../../../components/Appointmentscomp";

export default function Appointments() {
  return (
    <div className="container mx-auto">
      <Suspense fallback={<div>Loading...</div>}>
        <AppointmentsComp />
      </Suspense>
    </div>
  );
}
