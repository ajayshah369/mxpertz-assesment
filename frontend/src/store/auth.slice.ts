import { createSlice } from "@reduxjs/toolkit";

type User = {
  id: string;
  name: string;
  email: string;
  role: "patient" | "doctor";
};

interface State {
  loading?: boolean;
  user: User | null | undefined;
}

const initialState: State = {
  loading: true,
  user: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    set: (state, action: { payload: State; type: string }) => {
      return {
        ...state,
        ...action.payload,
      };
    },
  },
});

export const { set } = authSlice.actions;
export default authSlice.reducer;
