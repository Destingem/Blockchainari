import { Input, InputWrapper, Button, MultiSelect } from "@mantine/core";
import { DatePicker, DateRangePicker, RangeCalendar } from "@mantine/dates";
import { useState, useEffect } from "react";
import styles from "./Du.module.css";
import { useForm } from "@mantine/form";
import { NativeSelect, Select } from "@mantine/core";
import getTrida from "../customHooks/getTrida";
import { useRouter } from "next/router";
import useFetch from "../customHooks/useFetch";
import getUsers from "../customHooks/getUsers";
import "dayjs/locale/cs";
var firstLoad = true;
export default function Du(props) {
  const router = useRouter();
  const [classes, setClasses] = useState([""]);
  const [selClass, setSelClass] = useState([""]);
  const [zamereni, setZamereni] = useState([""]);
  const [predmety, setPredmety] = useState([
    " ",
    "Český Jazyk",
    "Matematika",
    "Angličtina",
    "Němčina",
  ]);
  const [zaci, setZaci] = useState([""]);
  const form = useForm({
    initialValues: {
      trida: "",
      zamereni: "",
      zak: "",
      tema: "",
      datum: "",
      predmet: "",
    },
  });
  function handleSubmit(params) {
    props.handleSubmit(params, "du");
  }
  useEffect(async () => {
    if (firstLoad == false) {
      if (
        selClass !== "" &&
        selClass[0] &&
        selClass[0].zamereni[form.values.zamereni]
      ) {
        var zaciARR = [];
        for (let zak in selClass[0].zamereni[form.values.zamereni].zaci) {
          zaciARR.push({ wallet: [zak], label: [zak], value: [zak] });
        }
        var users = await getUsers(router);
        for (let user in users) {
          var znamkyARR = [];
          for (let znamka in users[user].znamky) {
            znamkyARR.push(users[user].znamky[znamka]);
          }
          users[user].znamky = znamkyARR;
        }
        console.log(users);
        var findedARR = [];
        for (let user in users) {
          for (let zak in zaciARR) {
            if (users[user].value == zaciARR[zak].wallet[0]) {
              findedARR.push(users[user]);
            }
          }
        }
        console.log(findedARR);
        setZaci(findedARR);
      }
    } else {
      firstLoad = false;
    }
  }, [form.values.zamereni]);
  useEffect(async () => {
    const result = await useFetch(router, {
      predmety_tridy: true,
      value: form.values.trida,
    });

    if (result) {
      var resultARR = [];
      for (let res in result.predmety_tridy) {
        resultARR.push(res);
      }

      setPredmety([" ", ...resultARR]);
    }
  }, [form.values.trida]);
  useEffect(async () => {
    const result = await getTrida(router);
    setClasses(result);
  }, []);
  useEffect(() => {
    if (firstLoad == false) {
      var selectedClass = classes.filter((item) => {
        if (item.value == form.values.trida) {
          return item.zamereni;
        } else {
          return;
        }
      });
      var selectedArray = [];
      if (selectedClass && selectedClass[0]) {
        for (let selectedItem in selectedClass[0].zamereni) {
          selectedArray.push(selectedItem);
        }
        setSelClass(selectedClass);
        setZamereni(selectedArray);
      }
    } else {
      firstLoad = false;
    }
  }, [form.values.trida]);

  return (
    <div className={styles.main}>
      <h3 className={styles.heading}>Domácí úkoly</h3>
      <form onSubmit={form.onSubmit(handleSubmit)} className="du">
        <Select
          data={classes}
          placeholder="Vyberte..."
          label="Třída"
          description=""
          required
          {...form.getInputProps("trida", { type: "input" })}
        />
        <Select
          data={zamereni}
          placeholder="Vyberte..."
          label="Zaměření"
          description=""
          required
          {...form.getInputProps("zamereni", { type: "input" })}
        />
        <MultiSelect
          data={zaci}
          placeholder="Vyberte..."
          label="Žák"
          description=""
          required
          {...form.getInputProps("zak", { type: "input" })}
        />
        <Select
          data={predmety}
          placeholder="Vyberte..."
          label="Předmět"
          description=""
          required
          {...form.getInputProps("predmet", { type: "input" })}
        />
        <InputWrapper label="Téma" required>
          <Input
            placeholder="např. Naučit se slovíčka 3. lekce"
            required
            {...form.getInputProps("tema", { type: "input" })}
          />
        </InputWrapper>
        <InputWrapper label="Datum" required>
          <DateRangePicker
            placeholder="01/01/2001"
            required
            locale="cs"
            firstDayOfWeek="monday"
            {...form.getInputProps("datum", { type: "input" })}
          />
        </InputWrapper>

        <Button type="submit">Odeslat zprávu</Button>
      </form>
    </div>
  );
}
