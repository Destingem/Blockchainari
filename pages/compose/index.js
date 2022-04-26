import { useRef, useState } from "react";
import styles from "./compose.module.css";
import { MantineProvider, Notification, Tab, Tabs } from "@mantine/core";
import { NativeSelect } from "@mantine/core";
import { AiFillCheckCircle } from "react-icons/ai";
import { useDispatch } from "react-redux";
import { authActions } from "../../store/auth";
import { InputWrapper, Input, MultiSelect } from "@mantine/core";
import Zprava from "../../Components/ForCompose/Zprava";
import Znamka from "../../Components/ForCompose/Znamka";
import Du from "../../Components/ForCompose/Du";
import Trida from "../../Components/ForCompose/Trida";
import Predmet from "../../Components/ForCompose/Predmet";
import Pozice from "../../Components/ForCompose/Pozice";
import { useRouter } from "next/router";
import {SiGoogleclassroom} from "react-icons/si"
import {RiNumber1} from "react-icons/ri"
import {MdOutlineFormatListBulleted} from "react-icons/md"
import {AiOutlineSchedule} from "react-icons/ai"
import {BiMessage} from "react-icons/bi"
import {FaChalkboardTeacher, FaUserFriends} from "react-icons/fa"
import Rozvrh from "../../Components/ForCompose/Rozvrh";
import Uzivatele from "../../Components/ForCompose/Uzivatele";
export default function Compose() {
  const [message, setMessage] = useState("");
  const dispatch = useDispatch();
  const router = useRouter()
  async function handleSubmit(props, type, form) {
   console.log(props);
    var request = {};
    var Auth_token = localStorage.getItem("Auth_token");
    var nadpis, zprava, trida, tema, znamka, vaha, predmet, odData, doData, nazev, obor, zamereni, kod, popis, vyucujici, osoba, pozice, prijemce, nazev, obor, kod = undefined
    switch (type) {
      case "zpravy":
        let {prijemce, nadpis, text} = props
        request = { Auth_token, type, prijemce, text, nadpis };
        break;
      case "znamky":
        var {predmet, tema, trida, vaha, zak, zamereni, znamka} = props
        request = { Auth_token, type, predmet, tema, trida, vaha, zak, zamereni, znamka};
        break;
      case "du":
        console.log(props);
        var {datum, tema, trida, zak, zamereni, predmet} = props
        request = { Auth_token, type, datum, tema, trida, zak, zamereni, predmet };
      break;
      case "tridy":
        let {nazev, obor, kod, zamereni: zamereniA, predmety} = props
        var objectZamereni = {}
        zamereniA.map(zamer=> {

          objectZamereni = {...objectZamereni, [zamer.name]: {a: "a"}}
        })
        var objectPredmety = {}
        predmety.map(predmet=> {

          objectPredmety = {...objectPredmety, [predmet]: {a: "a"}}
        })
        request = {Auth_token, nazev, obor, zamereni: objectZamereni, kod, type, predmety: objectPredmety}
      break;
      case "predmety":
        let {nazevPredmetu, zkratka, vyucujici} = props
        var vyucujiciARR = {}
        for(let teacher in vyucujici){
          vyucujiciARR = {...vyucujiciARR, [vyucujici[teacher]]: "a"}
        }
        request = {Auth_token, nazevPredmetu, zkratka, vyucujici, type}
        break;
      case "pozice":
      if (props.selectedPosition) {
          if (props.selectedPosition == "Žák") {
            let {selectedPosition, selectedTrida, selectedUser, deleteUser, selectedZamereni} = props
            request = {Auth_token, selectedPosition, selectedTrida, selectedZamereni, selectedUser, deleteUser, type}
          } else{
            let {selectedPosition, selectedUser} = props
            request = {Auth_token, selectedPosition, selectedUser: selectedUser[0], type}
          }
      }
        console.log(props);
        break;
      case "rozvrhy":
        break;
      case "zamereni":
        request = {Auth_token, zamereni: props, type}
      break;
      case "obor":
        console.log(props);
        const obors = props
        request = {Auth_token, obor: props, type}
        break;
      case "predmet":
        
        request = {Auth_token, predmet: props, type}
        break;
      default:
        break;
    }

    const res = await fetch("/api/postdata", {
      method: "POST",
      body: JSON.stringify(request),
    });
    const toJson = await res.json();
    console.log(await res);
    if (res.status == 201) {
      if (props) {
        
      }
      setMessage(toJson.message);
    } else {
      setMessage(toJson.message);
    }
    if (toJson && toJson.removeToken) {
      dispatch(authActions.deauthenticate());
      localStorage.removeItem("token")
      localStorage.removeItem("Auth_token")
      router.replace("/login")
    }
  }

  return (
    <MantineProvider>
    <div className={styles.main}>
      {message && (
        <Notification
          onClick={() => {
            setMessage("");
          }}
          icon={<AiFillCheckCircle size={18} />}
          color="teal"
          title="Teal notification"
        >
          {message}
        </Notification>
      )}
      
      <Tabs className={styles.menu} >
        <Tabs.Tab color="blue" sx={{color: "#fff", fontWeight: "bolder"}} label="Známky" icon={<RiNumber1 />}><Znamka handleSubmit={handleSubmit} /></Tabs.Tab>
        <Tabs.Tab color="blue" sx={{color: "#fff", fontWeight: "bolder"}} label="Domácí úkoly" icon={<MdOutlineFormatListBulleted />}><Du handleSubmit={handleSubmit} /></Tabs.Tab>
        <Tabs.Tab color="blue" sx={{color: "#fff", fontWeight: "bolder"}} label="Rozvrh" icon={<AiOutlineSchedule  />}><Rozvrh handleSubmit={handleSubmit} /></Tabs.Tab>
        <Tabs.Tab color="blue" sx={{color: "#fff", fontWeight: "bolder"}} label="Zpráva" icon={<BiMessage />}><Zprava handleSubmit={handleSubmit} /></Tabs.Tab>
        <Tabs.Tab color="blue" sx={{color: "#fff", fontWeight: "bolder"}} label="Třída" icon={<SiGoogleclassroom />}><Trida handleSubmit={handleSubmit} /></Tabs.Tab>
        <Tabs.Tab color="blue" sx={{color: "#fff", fontWeight: "bolder"}} label="Předmět" icon={<FaChalkboardTeacher />}><Predmet handleSubmit={handleSubmit} /></Tabs.Tab>
        <Tabs.Tab color="blue" sx={{color: "#fff", fontWeight: "bolder"}} label="Přehled uživatelů" icon={<FaUserFriends />}><Uzivatele handleSubmit={handleSubmit}/></Tabs.Tab>
        <Tabs.Tab color="blue" sx={{color: "#fff", fontWeight: "bolder"}} label="Správa uživatelů" icon={<FaUserFriends />}><Pozice handleSubmit={handleSubmit} /></Tabs.Tab>
      </Tabs>
    </div>
    </MantineProvider>
  );
}
// Davidova sestra je sportovní člověk