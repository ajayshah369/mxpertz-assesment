import Header from "../containers/header";
import { useState, useEffect } from "react";
import axiosInstance from "../utilities/axiosInstance";
import { Button } from "@mui/material";
import BookAppointment from "../containers/bookAppointment";
import { useSelector } from "react-redux";
import { RootState } from "../store";

export type Doctor = {
  id: string;
  name: string;
  email: string;
};

const Home = () => {
  const [doctors, setDoctors] = useState<Doctor[]>([]);

  const [doctor, setDoctor] = useState<Doctor | null>(null);

  const user = useSelector((state: RootState) => state.auth.user);

  const getDoctors = () => {
    axiosInstance.get("user/doctors").then((res) => {
      setDoctors(res.data.data);
    });
  };

  useEffect(() => {
    getDoctors();
  }, []);

  const closeAppointment = () => {
    setDoctor(null);
  };

  return (
    <div>
      <Header />

      {user!.role !== "doctor" ? (
        <>
          {doctor ? (
            <BookAppointment doctor={doctor} close={closeAppointment} />
          ) : null}

          <div className='flex items-center flex-col p-8'>
            <h1 className='text-4xl font-medium'>Book Appointment</h1>

            <div className='mt-4'>
              {doctors.map((doctor) => (
                <div
                  key={doctor.id}
                  className='p-4 border border-gray-200 rounded-lg shadow-lg w-96 mt-4 flex items-center justify-between'
                >
                  <h1>{doctor.name}</h1>
                  <Button variant='contained' onClick={() => setDoctor(doctor)}>
                    Book
                  </Button>
                </div>
              ))}
            </div>
          </div>
        </>
      ) : null}
    </div>
  );
};

export default Home;
