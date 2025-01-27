import { Box, CircularProgress } from "@mui/material";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { set as setUser } from "../../store/auth.slice";

import axiosInstance from "../../utilities/axiosInstance";

const AuthLoading = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const getUser = async () => {
      axiosInstance
        .get("/auth")
        .then((res) => {
          dispatch(setUser({ user: res.data.data, loading: false }));
        })
        .catch(() => {
          dispatch(setUser({ user: null, loading: false }));
        });
    };

    getUser();
  }, [dispatch]);

  return (
    <Box
      component={"div"}
      className='h-screen flex justify-center items-center'
    >
      <CircularProgress size={80} />
    </Box>
  );
};

export default AuthLoading;
