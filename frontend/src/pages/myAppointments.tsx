import Header from "../containers/header";
import { useState, useEffect } from "react";
import axiosInstance from "../utilities/axiosInstance";
import { useSelector } from "react-redux";
import { RootState } from "../store";

const MyAppointments = () => {
  const user = useSelector((state: RootState) => state.auth.user);

  const [appointments, setAppointments] = useState<
    {
      id: string;
      date_time: Date;
      doctor: {
        id: string;
        name: string;
        email: string;
      };
      patient: {
        id: string;
        name: string;
        email: string;
      };
    }[]
  >([]);

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
  }, []);

  return (
    <div>
      <Header />

      <div className='flex items-center flex-col p-8'>
        <h1 className='text-4xl font-medium'>My Appointments</h1>

        <div className='mt-4'>
          {appointments.map((appointment) => (
            <div
              key={appointment.id}
              className='p-4 border border-gray-200 rounded-lg shadow-lg w-96 mt-4'
            >
              <h1 className='font-semibold'>
                {user?.role === "doctor" ? "Patient" : "Doctor"}
              </h1>
              <h2 className='font-medium'>
                {user?.role === "doctor"
                  ? appointment.patient.name
                  : appointment.doctor.name}
              </h2>
              <p>Time: {new Date(appointment.date_time).toLocaleString()}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MyAppointments;
