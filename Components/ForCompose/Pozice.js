import styles from "./Pozice.module.css";
import { Button, MultiSelect, Notification, Select } from "@mantine/core";
import { useEffect, useState } from "react";
import useFetch from "../customHooks/fetchRoute";
import { useRouter } from "next/router";
import Randomstring from "randomstring";
import { useForm } from "@mantine/form";
import getUsers from "../customHooks/getUsers";
import getTrida from "../customHooks/getTrida";
var firstLoad = true;
export default function Pozice(props) {
  const router = useRouter();
  const [message, setMessage] = useState({text: "", color: "blue"})
  const [persons, setPersons] = useState([
    {
      wallet: "0x456882",
      firstName: "",
      lastName: "",
      label: "Julie Vidlařová (0x456882)",
    },
  ]);
  const pozice = [
    "Visitor",
    "Žák",
    "Administrativní pracovník",
    "Učitel",
    "Pracovník s personálními pravomocemi",
    "Zástupce",
    "Ředitel",
    "Administrátor",
  ];
  const [classes, setClasses] = useState([]);
  const [zamereni, setZamereni] = useState([]);
  const form = useForm({
    initialValues: {
      selectedUser: "",
      selectedPosition: "",
      selectedTrida: "",
      selectedZamereni: "",
      deleteUser: false,
    },
  });

  useEffect(async () => {
    const result = await getUsers(router);
    setPersons(result);
  }, []);
  function handleSubmit(params) {
    props.handleSubmit(params, "pozice");
  }
  useEffect(async () => {
    const result = await getTrida(router);
    console.log(result);
    if (result[0] && result[0].value) {
      setClasses(result);
    } else{
        setMessage({text:"Nebyly nalezeny žádné třídy!", color: "red"})
    }
  }, []);
  useEffect(() => {
    if (firstLoad == false) {
      var selectedClass = classes.filter((item) => {
        if (item.value == form.values.selectedTrida) {
          return item.zamereni;
        } else {
          return;
        }
      });
      console.log(selectedClass);
      var selectedArray = [];
      if (selectedClass && selectedClass[0]) {
        for (let selectedItem in selectedClass[0].zamereni) {
          selectedArray.push(selectedItem);
        }
        setZamereni(selectedArray);
      }
    } else {
      firstLoad = false;
    }
  }, [form.values.selectedTrida]);

  return (
    <div className={styles.main}>
      <h1 className={styles.heading}>Pozice</h1>
      {message.text && <Notification color={message.color}>{message.text}</Notification>}
      <form onSubmit={form.onSubmit(handleSubmit)}>
        <MultiSelect
          data={persons}
          searchable
          limit={20}
          {...form.getInputProps("selectedUser", { type: "input" })}
        />
        <Select
          data={pozice}
          searchable
          limit={20}
          {...form.getInputProps("selectedPosition", { type: "input" })}
        />
        {form.values.selectedPosition == "Žák" && classes[0] && (
          <Select
            data={classes}
            searchable
            limit={20}
            required
            {...form.getInputProps("selectedTrida", { type: "input" })}
          />
        )}
        {form.values.selectedPosition == "Žák" && zamereni[0] && (
          <Select
            data={zamereni}
            searchable
            limit={20}
            required
            {...form.getInputProps("selectedZamereni", { type: "input" })}
          />
        )}
        <Button type="submit">Odeslat</Button>
      </form>
    </div>
  );
}
//  " " + lastName + " (" + wallet + ")"
