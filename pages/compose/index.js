import { useRef, useState } from "react";
import styles from "./compose.module.css";
import { Notification } from "@mantine/core";
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
export default function Compose() {
  const [message, setMessage] = useState("");
  const dispatch = useDispatch();
  const router = useRouter()
  const [value, setValue] = useState("");
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
        var {doData, odData, tema, trida, zak, zamereni} = props
        request = { Auth_token, type, odData, doData, tema, trida, zak, zamereni };
      break;
      case "tridy":
        let {nazev, obor, kod, zamereni: zamereniA} = props
        var objectZamereni = {}
        zamereniA.map(zamer=> {

          objectZamereni = {...objectZamereni, [zamer]: {a: "a"}}
        })
        console.log(objectZamereni);
        request = {Auth_token, nazev, obor, zamereni: objectZamereni, kod, type}
      break;
      case "predmety":
        nazev = props.target[0].value
        popis =  props.target[1].value
        vyucujici = props.target[2].value
        request = {Auth_token, nazev, popis, vyucujici, type}
        break;
      case "pozice":
        if (props.selectedPosition && props.selectedPosition == "Žák") {
          let {selectedPosition, selectedTrida, selectedUser, deleteUser, selectedZamereni} = props
          request = {Auth_token, selectedPosition, selectedTrida, selectedZamereni, selectedUser, deleteUser, type}
        }
        
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
      <NativeSelect
        data={["Známka", "Domácí úkol", "Rozvrh", "Zpráva", "Třída", "Předmět", "Správa uživatelů"]}
        placeholder="Co chcete přidat"
        label="Vyberte co chete přidat"
        description="Známku, Domácí úkoly, Rozvrh či zprávu"
        required
        value={value}
        onChange={(event) => setValue(event.currentTarget.value)}
      />

      {value == "Zpráva" && <Zprava handleSubmit={handleSubmit} />}
      {value == "Známka" && <Znamka handleSubmit={handleSubmit} />}
      {value == "Domácí úkol" && <Du handleSubmit={handleSubmit} />}
      <div className={styles.rozvrh}></div>
      {value == "Třída" && <Trida handleSubmit={handleSubmit} />}
      {value == "Předmět" && <Predmet handleSubmit={handleSubmit} />}
      {value == "Správa uživatelů" && <Pozice handleSubmit={handleSubmit} />}
    </div>
  );
}
