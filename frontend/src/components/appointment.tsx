import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../store";
import { Button } from "@mui/material";
import { Dispatch, SetStateAction, useState } from "react";
import axiosInstance from "../utilities/axiosInstance";
import { set as setSnackbar } from "../store/snackbar.slice";

export type AppointmentProps = {
  _id: string;
  date_time: Date;
  status: string;
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
};

const Appointment = (props: {
  appointment: AppointmentProps;
  reload: boolean;
  setReload: Dispatch<SetStateAction<boolean>>;
}) => {
  const { appointment, setReload } = props;

  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.auth.user);

  const [loading, setLoading] = useState(false);
  const handleCancel = () => {
    setLoading(true);
    axiosInstance
      .put(`appointment/cancel/${appointment._id}`)
      .then((res) => {
        setReload((prev) => !prev);
        dispatch(
          setSnackbar({
            open: true,
            message: res?.data?.message ?? "Appointment cancelled successfully",
            severity: "success",
          })
        );
      })
      .catch((err) => {
        const errorData = err?.response?.data;
        dispatch(
          setSnackbar({
            open: true,
            message:
              errorData?.message?.message ??
              errorData?.errors?.join(", ") ??
              "Failed to cancel appointment",
            severity: "error",
          })
        );
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <div
      key={appointment._id}
      className='p-4 border border-gray-200 rounded-lg shadow-lg mt-4 flex items-start justify-between'
      style={{
        width: "500px",
      }}
    >
      <div>
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

      <div className='flex flex-col items-end gap-2'>
        <h2
          className={`font-medium ${
            appointment.status === "pending"
              ? "text-yellow-500"
              : appointment.status === "cancelled"
              ? "text-red-500"
              : "text-green-500"
          }`}
        >
          {appointment.status.toUpperCase()}
        </h2>

        {appointment.status === "pending" ||
        appointment.status === "confirmed" ? (
          <Button
            variant='contained'
            size='small'
            color='error'
            onClick={handleCancel}
            disabled={loading}
          >
            Cancel
          </Button>
        ) : null}
      </div>
    </div>
  );
};

export default Appointment;
