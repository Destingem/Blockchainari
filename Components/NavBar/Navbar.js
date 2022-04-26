import { Menu, MenuItem, MenuLabel, Text } from "@mantine/core";
import { redirect } from "next/dist/server/api-utils";
import { defaultHead } from "next/head";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { authActions } from "../../store/auth";
import styles from "./NavBar.module.css";

export default function NavBar(props) {
    const dispatch = useDispatch()
    const router = useRouter()
    var state =  useSelector(state => state.auth)

    function handleClick(to){
      router.push(to)
        
    }
    function redirectTo(){
      router.push("/")
    }
    function deauth(){
      localStorage.removeItem("Auth_token")
      localStorage.removeItem("token")
      localStorage.removeItem("wallet")
      dispatch(authActions.deauthenticate())
    }
  return (
    <div className={styles.main}>
      <div className={styles.header}>
          <img src=""></img>
          <div className={styles.text} onClick={redirectTo}><h1>Blockchaináři</h1></div>
      </div>
    
   <Menu position="bottom" placement="end" control={state && state.eth && state.eth.wallet ? <button className={styles.button}><Text>{state.user.firstName + " " + state.user.lastName + " (" +state.eth.wallet + ")"}</Text></button> : <button className={styles.button} onClick={()=> { handleClick("/login")}}>Přihlásit se</button>}>
     <MenuLabel>Lorem Ipsum</MenuLabel>
     <MenuItem onClick={()=> { handleClick("/dashboard")}}>Dashboard</MenuItem>
     <MenuItem onClick={()=> { handleClick("/profile")}}>Profil</MenuItem>
     <MenuLabel onClick={()=> { handleClick("/settings")}}>Settings</MenuLabel>
     <MenuItem onClick={()=> { deauth()}}>Odhlásit se</MenuItem>
   </Menu>
   </div>
  );
}
