import { useMetaMask } from "metamask-react";
import { route } from "next/dist/server/router";
import { Router, useRouter } from "next/router";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styles from "./Banner.module.css";
import { authActions } from "../../store/auth";
import { useEffect } from "react";
import useMetaMaskAuthentication from "../customHooks/useMetamaskAuthentication";
export default function Banner() {
// inicializace
const metamaskAuth =  useMetaMaskAuthentication
  const router = useRouter();
  const stateAuth = useSelector((state) => state.auth);
  const dispatch = useDispatch()
  const metamask = useMetaMask()
  const state = useSelector(state => state)
  //handeling funkce
  async function metamaskLogin() {
    if (state.isAuthenicated) {
      router.push("/dashboard")
    }
    else{
      metamaskAuth(metamask, dispatch, state)
    }
  }
  
  //return
  return (
    <div className={styles.main}>
      <h1 className={styles.header}>
        Budoucnost školnách informačních systémů
      </h1>
      <p className={styles.paragraph}>
        Buďte její součástí už dnes. Vyzkoušejte ji už zdarma.
      </p>
      <div className={styles.buttons}>
        <button
          className={styles.button}
          
          onClick={metamaskLogin}
        >
          {stateAuth.isAuthenicated ? "Dashboard" : "Přihlásit se přes MetaMask"}
        </button>
      </div>
    </div>
  );
}
