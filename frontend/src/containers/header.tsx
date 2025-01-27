import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../store";
import { Button, Chip } from "@mui/material";
import axiosInstance from "../utilities/axiosInstance";
import { set as setUser } from "../store/auth.slice";
import { set as setSnackbar } from "../store/snackbar.slice";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state: RootState) => state.auth);

  const logout = () => {
    axiosInstance
      .get("/auth/logout")
      .then((res) => {
        dispatch(setUser({ user: null }));
        dispatch(
          setSnackbar({
            open: true,
            message: res?.data?.message ?? "Login successful",
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
              errorData?.message ??
              "Login failed",
            severity: "error",
          })
        );
      });
  };

  return (
    <header className='shadow-2xl p-4 flex items-center justify-between'>
      <div className='flex items-center gap-12'>
        <div>
          <h1 className='text-2xl font-bold'>{user!.name}</h1>
          <Chip label={user!.role} color='primary'></Chip>
        </div>

        <Button
          variant='outlined'
          size='small'
          onClick={() => navigate("/my-appointments")}
        >
          My Appointments
        </Button>
      </div>

      <Button onClick={logout} variant='contained'>
        Logout
      </Button>
    </header>
  );
};

export default Header;
