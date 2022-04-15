import { createSlice } from "@reduxjs/toolkit";
import { useMetaMask } from "metamask-react";

const authInitialState = {
  isAuthenicated: false,
  token: "",
  eth: { wallet: "", status: "", chain: "" },
  user: {firstName: "", lastName: "", birth: ""}
};

const authSlice = createSlice({
  name: "auth",
  initialState: authInitialState,
  reducers: {
    authenticate(state) {
      state.isAuthenicated = true;
    },
    deauthenticate(state) {
      state.isAuthenicated = false;
      
    },
    setToken(state, token) {
      state.eth.token = token.payload;
      
    },
    setWallet(state, wallet) {
      state.eth.wallet = wallet.payload;
      localStorage.setItem("wallet", wallet.payload);
    },
    setNetwork(state, network) {
      state.eth.network = network.payload;
    },
    setChain(state, chain) {
      state.eth.chain = chain.payload;
    },
    setEth(state, eth) {
      state.eth = eth.payload;
    },
    setUser(state, action){
      state.user = action.payload
    }
  },
});
export const authActions = authSlice.actions;
export default authSlice.reducer;
