import { useMetaMask } from "metamask-react";
import { Router, useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import styles from "./Banner.module.css";
import useMetaMaskAuthentication from "../customHooks/useMetamaskAuthentication";
import { BsChevronDown, BsChevronUp } from "react-icons/bs";
import { Affix, Button, Paper, SimpleGrid, Text, Transition } from "@mantine/core";
import ThirdPage from "./Thirdpage";
import SecondPage from "./SecondPage";
import { useWindowScroll } from "@mantine/hooks";
import { useEffect } from "react";
export default function Banner() {
  const [scroll, scrollTo] = useWindowScroll()
  const metamaskAuth = useMetaMaskAuthentication;
  const router = useRouter();
  const stateAuth = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const metamask = useMetaMask();
  const state = useSelector((state) => state);
  //handeling funkce
  async function metamaskLogin() {
    if (state.isAuthenicated) {
      router.push("/dashboard");
    } else {
      metamaskAuth(metamask, dispatch, state);
    }
  }
  var windowHeight = ""
  useEffect(()=> {
    windowHeight = window.innerHeight
  })
  function handleClick(){
    if (windowHeight !== "") {
      scrollTo({ y: windowHeight })
    }
  }
  return (
    <div>
      <div id="main" className={styles.background}>
        <div className={styles.main}>
          <h1 className={styles.header}>
            Budoucnost školních informačních systémů
          </h1>
          <p className={styles.paragraph}>
            Buďte její součástí už dnes. Vyzkoušejte ji zdarma.
          </p>
          <div className={styles.buttons}>
            <Button className={styles.button} onClick={metamaskLogin}>
              {stateAuth.isAuthenicated
                ? "Dashboard"
                : "Přihlásit se přes MetaMask"}
            </Button>
          <Button component="button" sx={{height: "100%", fontWeight: "normal"}}>Více informací</Button>
          </div>

          <BsChevronDown
            style={{
              color: "#fff",
              position: "absolute",
              bottom: "2vh",
              fontSize: "8vh",
              fontWeight: "normal",
              marginLeft: "auto",
              marginRight: "auto",
              left: " 0",
              right: "0",
              
            }}
            onClick={handleClick}
          />
        </div>
      </div>
      <SecondPage />
      <ThirdPage />
      <Affix position={{bottom: 20, right: 20}}>
      <Transition transition="slide-up" mounted={scroll.y > 0}>
          {(transitionStyles) => (
            <Button
              
              style={transitionStyles}
              onClick={() => scrollTo({ y: 0 })}
            >
             <BsChevronUp style={{fontSize: "2vh", fontWeight: "bolder"}} />
            </Button>
          )}
        </Transition>
      </Affix>
    </div>
  );
}
