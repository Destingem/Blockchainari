import metaMaskAuthentication from "../../Components/customHooks/useMetamaskAuthentication";
import NavBar from "../../Components/NavBar/Navbar";
import styles from "../css/login.module.css";
import { useDispatch } from "react-redux";
import { useMetaMask } from "metamask-react";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
export default function Login() {
  const dispatch = useDispatch();
  const metamask = useMetaMask();
  const router = useRouter()
  const state = useSelector(state => state)
 
  function metamaskLogin() {
    const isAuth =  metaMaskAuthentication(metamask, dispatch, state);
   isAuth.then((auth)=> {
    if (auth && auth.status) {
      router.replace("/dashboard")
   }
   })
  }
  return (
    <div className={styles.main}>
      <button
        className={styles.button}
        style={{ backgroundColor: "rgba(255, 255, 255, 0.5)" }}
        onClick={metamaskLogin}
      >
        Přihlásit se přes MetaMask
      </button>
    </div>
  );
}
