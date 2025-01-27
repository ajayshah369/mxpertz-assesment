import { Doctor } from "../pages";
import { Backdrop } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { Button, TextField } from "@mui/material";
import { useState } from "react";
import axiosInstance from "../utilities/axiosInstance";
import { useDispatch } from "react-redux";
import { set as setSnackbar } from "../store/snackbar.slice";

const BookAppointment = (props: { doctor: Doctor; close: () => void }) => {
  const dispatch = useDispatch();

  const { doctor, close } = props;

  const [date, setDate] = useState<string>("");
  const [time, setTime] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const createAppointment = (dateTime: Date) => {
    setLoading(true);

    axiosInstance
      .post("appointment", {
        date_time: dateTime.toISOString(),
        doctor: doctor.id,
      })
      .then((res) => {
        dispatch(
          setSnackbar({
            open: true,
            message: res?.data?.message ?? "Appointment booked successfully",
            severity: "success",
          })
        );
        close();
      })
      .catch((err) => {
        const errorData = err?.response?.data;
        dispatch(
          setSnackbar({
            open: true,
            message:
              errorData?.message?.message ??
              errorData?.errors?.join(", ") ??
              errorData?.message ??
              "Appointment booking failed",
            severity: "error",
          })
        );
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const submit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const newDate = new Date(`${date}T${time}`);

    console.log(newDate);

    createAppointment(newDate);
  };

  return (
    <Backdrop
      sx={(theme) => ({ color: "#fff", zIndex: theme.zIndex.drawer + 1 })}
      open={true}
      onClick={close}
    >
      <div
        className='bg-white rounded p-8 text-black relative flex flex-col items-center gap-8'
        style={{
          height: "calc(90%)",
          width: "calc(90%)",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <CloseIcon
          onClick={close}
          className='absolute top-4 right-4 cursor-pointer'
        />

        <h1 className='text-2xl font-bold'>Book Appointment</h1>
        <div className='mt-4 text-xl font-medium'>
          <h1>{doctor.name}</h1>
          <h1>{doctor.email}</h1>
        </div>

        <form
          onSubmit={submit}
          className='mt-4 flex flex-col gap-4'
          style={{
            maxWidth: "400px",
            minWidth: "300px",
          }}
        >
          <TextField
            label='Select Date'
            type='date'
            value={date}
            onChange={(e) => {
              console.log(e.target.value);
              setDate(e.target.value);
            }}
            InputLabelProps={{
              shrink: true,
            }}
            fullWidth
            required
            disabled={loading}
          />
          <TextField
            label='Select Time'
            type='time'
            value={time}
            onChange={(e) => {
              console.log(e.target.value);
              setTime(e.target.value);
            }}
            InputLabelProps={{
              shrink: true,
            }}
            fullWidth
            className='mt-4'
            required
            disabled={loading}
          />
          <Button
            variant='contained'
            type='submit'
            color='primary'
            className='mt-4'
            disabled={loading}
          >
            {loading ? "Loading..." : "Book Appointment"}
          </Button>
        </form>
      </div>
    </Backdrop>
  );
};

export default BookAppointment;
