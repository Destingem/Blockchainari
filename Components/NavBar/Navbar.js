import { Menu, MenuItem, MenuLabel } from "@mantine/core";
import { redirect } from "next/dist/server/api-utils";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { authActions } from "../../store/auth";
import styles from "./NavBar.module.css";

export default function NavBar(props) {
    const router = useRouter()
    var state =  useSelector(state => state.auth)

    function handleClick(to){
      router.push(to)
        
    }
    function redirectTo(){
      router.push("/")
    }
  return (
    <div className={styles.main}>
      <div className={styles.header}>
          <img src=""></img>
          <div className={styles.text} onClick={redirectTo}><h1>Blockchaináři</h1></div>
      </div>
    
   <Menu position="bottom" placement="end" control={state && state.eth && state.eth.wallet ? <button className={styles.button} onClick={()=> { handleClick("/dashboard")}}>{state.user.firstName + " " + state.user.lastName + " (" +state.eth.wallet + ")"}</button> : <button className={styles.button} onClick={()=> { handleClick("/login")}}>Přihlásit se</button>}>
     <MenuLabel>Lorem Ipsum</MenuLabel>
     <MenuItem>Dashboard</MenuItem>
     <MenuItem>Profil</MenuItem>
     <MenuLabel>Settings</MenuLabel>
     <MenuItem>Nastavení</MenuItem>
     <MenuItem>Odhlásit se</MenuItem>
   </Menu>
   </div>
  );
}
