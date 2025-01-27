import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Checkbox from "@mui/material/Checkbox";
import CssBaseline from "@mui/material/CssBaseline";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormLabel from "@mui/material/FormLabel";
import FormControl from "@mui/material/FormControl";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import MuiCard from "@mui/material/Card";
import { styled } from "@mui/material/styles";
import { Select, MenuItem } from "@mui/material";
import { Link } from "react-router-dom";
import axiosInstance from "../../utilities/axiosInstance";
import { useDispatch } from "react-redux";
import { set as setUser } from "../../store/auth.slice";
import { RootState } from "../../store";
import { set as setSnackbar } from "../../store/snackbar.slice";

const Card = styled(MuiCard)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignSelf: "center",
  width: "100%",
  padding: theme.spacing(4),
  gap: theme.spacing(2),
  margin: "auto",
  boxShadow:
    "hsla(220, 30%, 5%, 0.05) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.05) 0px 15px 35px -5px",
  [theme.breakpoints.up("sm")]: {
    width: "450px",
  },
  ...theme.applyStyles("dark", {
    boxShadow:
      "hsla(220, 30%, 5%, 0.5) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.08) 0px 15px 35px -5px",
  }),
}));

const SignUpContainer = styled(Stack)(({ theme }) => ({
  height: "calc((1 - var(--template-frame-height, 0)) * 100dvh)",
  minHeight: "100%",
  padding: theme.spacing(2),
  [theme.breakpoints.up("sm")]: {
    padding: theme.spacing(4),
  },
  "&::before": {
    content: '""',
    display: "block",
    position: "absolute",
    zIndex: -1,
    inset: 0,
    backgroundImage:
      "radial-gradient(ellipse at 50% 50%, hsl(210, 100%, 97%), hsl(0, 0%, 100%))",
    backgroundRepeat: "no-repeat",
    ...theme.applyStyles("dark", {
      backgroundImage:
        "radial-gradient(at 50% 50%, hsla(210, 100%, 16%, 0.5), hsl(220, 30%, 5%))",
    }),
  },
}));

export default function SignUp() {
  const dispatch = useDispatch();

  const [emailError, setEmailError] = React.useState(false);
  const [emailErrorMessage, setEmailErrorMessage] = React.useState("");
  const [passwordError, setPasswordError] = React.useState(false);
  const [passwordErrorMessage, setPasswordErrorMessage] = React.useState("");
  const [nameError, setNameError] = React.useState(false);
  const [nameErrorMessage, setNameErrorMessage] = React.useState("");
  const [roles] = React.useState(["patient", "doctor"]);
  const [role, setRole] = React.useState("patient");
  const [roleError, setRoleError] = React.useState(false);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [roleErrorMessage, setRoleErrorMessage] = React.useState("");
  const [loading, setLoading] = React.useState(false);

  const validateInputs = () => {
    const email = document.getElementById("email") as HTMLInputElement;
    const password = document.getElementById("password") as HTMLInputElement;
    const name = document.getElementById("name") as HTMLInputElement;

    let isValid = true;

    if (!email.value || !/\S+@\S+\.\S+/.test(email.value)) {
      setEmailError(true);
      setEmailErrorMessage("Please enter a valid email address.");
      isValid = false;
    } else {
      setEmailError(false);
      setEmailErrorMessage("");
    }

    if (!password.value || password.value.length < 6) {
      setPasswordError(true);
      setPasswordErrorMessage("Password must be at least 6 characters long.");
      isValid = false;
    } else {
      setPasswordError(false);
      setPasswordErrorMessage("");
    }

    if (!name.value || name.value.length < 1) {
      setNameError(true);
      setNameErrorMessage("Name is required.");
      isValid = false;
    } else {
      setNameError(false);
      setNameErrorMessage("");
    }

    if (!role || role.length < 1 || roles.indexOf(role) === -1) {
      setRoleError(true);
      setRoleErrorMessage("Role is required.");
      isValid = false;
    } else {
      setRoleError(false);
      setRoleErrorMessage("");
    }

    return isValid;
  };

  const signup = (data: {
    name: string;
    email: string;
    password: string;
    role: string;
  }) => {
    setLoading(true);
    axiosInstance
      .post("/auth/signup", data)
      .then((res) => {
        dispatch(setUser({ user: res.data.data as RootState["auth"]["user"] }));
        dispatch(
          setSnackbar({
            open: true,
            message: res?.data?.message ?? "Signup successful",
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
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (nameError || emailError || passwordError || roleError) {
      return;
    }
    const formData = new FormData(event.currentTarget);
    const data = {
      name: formData.get("name") as string,
      email: formData.get("email") as string,
      password: formData.get("password") as string,
      role: formData.get("role") as string,
    };

    signup(data);
  };

  return (
    <>
      <CssBaseline enableColorScheme />
      <SignUpContainer direction='column' justifyContent='space-between'>
        <Card variant='outlined'>
          <Typography
            component='h1'
            variant='h4'
            sx={{ width: "100%", fontSize: "clamp(2rem, 10vw, 2.15rem)" }}
          >
            Sign up
          </Typography>
          <Box
            component='form'
            onSubmit={handleSubmit}
            sx={{ display: "flex", flexDirection: "column", gap: 2 }}
          >
            <FormControl>
              <FormLabel htmlFor='name'>Full name</FormLabel>
              <TextField
                autoComplete='name'
                name='name'
                required
                fullWidth
                id='name'
                placeholder='Jon Snow'
                error={nameError}
                helperText={nameErrorMessage}
                color={nameError ? "error" : "primary"}
              />
            </FormControl>
            <FormControl>
              <FormLabel htmlFor='email'>Email</FormLabel>
              <TextField
                required
                fullWidth
                id='email'
                placeholder='your@email.com'
                name='email'
                autoComplete='email'
                variant='outlined'
                error={emailError}
                helperText={emailErrorMessage}
                color={emailError ? "error" : "primary"}
              />
            </FormControl>
            <FormControl>
              <FormLabel htmlFor='role'>Role</FormLabel>
              <Select
                id='role'
                name='role'
                variant='outlined'
                defaultValue='patient'
                fullWidth
                required
                color={roleError ? "error" : "primary"}
                onChange={(e) => setRole(e.target.value as string)}
              >
                {roles.map((role) => (
                  <MenuItem key={role} value={role}>
                    {role.toLocaleUpperCase()}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <FormControl>
              <FormLabel htmlFor='password'>Password</FormLabel>
              <TextField
                required
                fullWidth
                name='password'
                placeholder='••••••'
                type='password'
                id='password'
                autoComplete='new-password'
                variant='outlined'
                error={passwordError}
                helperText={passwordErrorMessage}
                color={passwordError ? "error" : "primary"}
              />
            </FormControl>
            <FormControlLabel
              control={<Checkbox value='allowExtraEmails' color='primary' />}
              label='I want to receive updates via email.'
            />
            <Button
              type='submit'
              fullWidth
              variant='contained'
              onClick={validateInputs}
              disabled={loading}
            >
              {loading ? "Loading..." : "Sign up"}
            </Button>

            <Typography
              variant='body2'
              sx={{ textAlign: "center", color: "text.secondary" }}
            >
              Already have an account?{" "}
              <Link to='/signin' className='text-black font-semibold'>
                Sign In
              </Link>
            </Typography>
          </Box>
        </Card>
      </SignUpContainer>
    </>
  );
}
