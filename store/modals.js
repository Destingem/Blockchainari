import { createSlice } from "@reduxjs/toolkit";
import { useMetaMask } from "metamask-react";

const authInitialState = {register: false, registerInfo: {firstName: "", lastName: "", birth: "", registerFilled: false }};

const modalsSlice = createSlice({
  name: "modals",
  initialState: authInitialState,
  reducers: {
      setRegister(state, action){
          state.register = action.payload
      },
      setRegisterInfo(state, action){
        state.registerInfo = action.payload
      }
       
  },
});
export const modalsActions = modalsSlice.actions;
export default modalsSlice.reducer;
