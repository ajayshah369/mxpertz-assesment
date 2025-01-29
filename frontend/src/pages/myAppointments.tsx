import Header from "../containers/header";
import { useState, useEffect } from "react";
import axiosInstance from "../utilities/axiosInstance";

import Appointment, { AppointmentProps } from "../components/appointment";

const MyAppointments = () => {
  const [appointments, setAppointments] = useState<AppointmentProps[]>([]);
  const [reload, setReload] = useState(false);

  const getMyAppointments = () => {
    axiosInstance
      .get("appointment")
      .then((res) => {
        setAppointments(res.data.data);
      })
      .catch(() => {});
  };

  useEffect(() => {
    getMyAppointments();
  }, [reload]);

  return (
    <div>
      <Header />

      <div className='flex items-center flex-col p-8'>
        <h1 className='text-4xl font-medium'>My Appointments</h1>

        <div className='mt-4'>
          {appointments.map((appointment) => (
            <Appointment
              key={appointment._id}
              appointment={appointment}
              reload={reload}
              setReload={setReload}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default MyAppointments;
