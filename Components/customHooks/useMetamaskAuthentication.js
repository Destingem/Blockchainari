import { useMetaMask } from "metamask-react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { authActions } from "../../store/auth";
import { modalsActions } from "../../store/modals";
import { ethers } from "ethers";
async function useMetaMaskAuthentication(metamask, dispatch, state) {
  console.log(localStorage.getItem("token"));
  if (localStorage.getItem("Auth_token") == undefined || null) {
    if (localStorage.getItem("token") == undefined || null) {
      metamask.connect();
      const response = await fetch("/api/auth", {
        method: "POST",
        body: JSON.stringify({
          account: metamask.account,
          request: "Generate_nonce",
        }),
      });

      const nonce = await response.json();
      await window.ethereum.send("eth_requestAccounts");
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const signature = await signer.signMessage(nonce.nonce);
      const address = await signer.getAddress();
      const response2 = await fetch("/api/auth", {
        method: "POST",
        body: JSON.stringify({ signature, address, request: "Verify_me" }),
      });

      const resolved = await response2.json();
      var tokenA = resolved.token;
      const wallet = resolved.address;
      console.log(wallet);
      localStorage.setItem("token", tokenA);
      localStorage.setItem("wallet", wallet);
      dispatch(
        authActions.setEth({
          wallet: address,
          status: metamask.status,
          chain: metamask.chainId,
        })
      );
    }
    var response3 = await fetch("/api/auth", {
      method: "POST",
      body: JSON.stringify({
        token: localStorage.getItem("token"),
        address: localStorage.getItem("wallet"),
        request: "Get_Auth_Token",
      }),
    });
    var resolvedResponse3 = await response3.json();
    if (!response3.ok) {
      
      if (resolvedResponse3.removeToken == true) {
        localStorage.removeItem("token");
      } else if (resolvedResponse3.message == "Please provide info") {
        if (
          state.modals.registerInfo.registerFilled == false &&
          !state.modals.registerInfo.firstName
        ) {
          dispatch(modalsActions.setRegister(true));
          console.log(state);
        } else if (
          state.modals.registerInfo.registerFilled == true ||
          state.modals.registerInfo.firstName
        ) {
          dispatch(modalsActions.setRegister(false));
          const { firstName, lastName, birth } = await state.modals
            .registerInfo;

          var response4 = await fetch("/api/auth", {
            method: "POST",
            body: JSON.stringify({
              token: localStorage.getItem("token"),
              address: localStorage.getItem("wallet"),
              request: "Get_Auth_Token",
              firstName,
              lastName,
              birth,
            }),
          });
          const resolvedResponse4 = await response4.json();
          if (await resolvedResponse4.token) {
            localStorage.setItem("Auth_token", await resolvedResponse4.token);
            dispatch(
              authActions.setUser({
                firstName: resolvedResponse3.firstName,
                lastName: resolvedResponse3.lastName,
                birth: resolvedResponse3.birth,
              })
            );
            dispatch(authActions.authenticate());
          }
        }
      }
    } else {
      localStorage.setItem("Auth_token", await resolvedResponse3.token);
    }
  } else {
    dispatch(authActions.authenticate());
    var userInfo = await fetch("/api/auth", {
      method: "POST",
      body: JSON.stringify({
        token: localStorage.getItem("Auth_token"),
        address: localStorage.getItem("address"),
        request: "Get_User_Info",
      }),
    });

    if (userInfo.status == 500) {
      localStorage.removeItem("Auth_token");
    }
    const resolvedUserInfo = await userInfo.json();
    dispatch(
      authActions.setUser({
        firstName: resolvedUserInfo.firstName,
        lastName: resolvedUserInfo.lastName,
        birth: resolvedUserInfo.birth,
      })
    );
    dispatch(
      authActions.setEth({
        wallet: metamask.account,
        status: metamask.status,
        chain: metamask.chainId,
      })
    );
  }
}

export default useMetaMaskAuthentication;
// dispatch(modalsActions.setRegister(true));
//dispatch(authActions.authenticate());
