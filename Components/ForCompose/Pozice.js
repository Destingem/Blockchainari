import styles from "./Pozice.module.css";
import { Button, MultiSelect, Select } from "@mantine/core";
import { useEffect, useState } from "react";
import useFetch from "../customHooks/useFetch";
import { useRouter } from "next/router";
import Randomstring from "randomstring";
import { useForm } from "@mantine/form";
import getUsers from "../customHooks/getUsers";
import getTrida from "../customHooks/getTrida";
var firstLoad = true
export default function Pozice(props) {
  const router = useRouter();
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
    "Uklizečky apod.",
    "Učitel",
    "Studijní apod.",
    "Zástupce",
    "Ředitel",
    "Administrátor",
  ];
  const [classes, setClasses] = useState([]);
  const [zamereni, setZamereni] = useState([])
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
    setClasses(result);
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
        setZamereni(selectedArray)
      }
      
      
    } else {
      firstLoad = false;
    }
  }, [form.values.selectedTrida]);

  return (
    <div className={styles.persons}>
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
        {form.values.selectedPosition == "Žák" && (
          <Select
            data={classes}
            searchable
            limit={20}
            {...form.getInputProps("selectedTrida", { type: "input" })}
          />
        )}
        {form.values.selectedPosition == "Žák" && (
          <Select
            data={zamereni}
            searchable
            limit={20}
            {...form.getInputProps("selectedZamereni", { type: "input" })}
          />
        )}
        <Button type="submit">Odeslat</Button>
      </form>
    </div>
  );
}
//  " " + lastName + " (" + wallet + ")"
