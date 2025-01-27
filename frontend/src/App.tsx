import { useSelector } from "react-redux";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import AuthLoading from "./pages/auth/authLoading";
import { RootState } from "./store";
import SignIn from "./pages/auth/signin";
import SignUp from "./pages/auth/signup";
import Home from "./pages";
import SnackbarComponent from "./components/snackbar";
import MyAppointments from "./pages/myAppointments";

function App() {
  const { user, loading } = useSelector((state: RootState) => state.auth);

  if (loading) {
    return <AuthLoading />;
  }

  if (!user) {
    return (
      <BrowserRouter>
        <SnackbarComponent />
        <Routes>
          <Route path='/signin' element={<SignIn />} />
          <Route path='/signup' element={<SignUp />} />
          <Route path='*' element={<Navigate to='/signin' />} />
        </Routes>
      </BrowserRouter>
    );
  }

  return (
    <BrowserRouter>
      <SnackbarComponent />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/my-appointments' element={<MyAppointments />} />
        <Route path='*' element={<Navigate to='/' />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
