import { Input, InputWrapper, Button, MultiSelect } from "@mantine/core";
import { DatePicker, RangeCalendar } from "@mantine/dates";
import { useState, useEffect } from "react";
import styles from "./Du.module.css";
import 'dayjs/locale/cs';
import { useForm } from "@mantine/form";
import { NativeSelect, Select } from "@mantine/core";
import getTrida from "../customHooks/getTrida";
import { useRouter } from "next/router";
var firstLoad = true
export default function Du(props) {
  const router = useRouter()
  const [classes, setClasses] = useState([""])
  const [selClass, setSelClass] = useState([""])
  const [zamereni, setZamereni] = useState([""])
  const [zaci, setZaci] = useState([""])
  const form = useForm({initialValues: {
    trida: "",
    zamereni: "",
    zak: "",
    tema: "",
    odData:"",
    doData:"",
    predmet: ""

  }})
  function handleSubmit(params) {
    props.handleSubmit(params, "du");
  }
  useEffect(async () => {
    const result = await getTrida(router)
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
        setSelClass(selectedClass)
        setZamereni(selectedArray);
      }
    } else {
      firstLoad = false;
    }
  }, [form.values.trida]);
  useEffect(() => {
    if (firstLoad == false) {
      
      if (selClass !== "" && selClass[0]) {
        var zaciARR = []
        for(let zak in selClass[0].zamereni[form.values.zamereni].zaci){
          zaciARR.push(zak)
        }
        setZaci(zaciARR)
      }
    } else {
      firstLoad = false;
    }
  }, [form.values.zamereni]);
  return (
    <div className={styles.du}>
      <h3>Domácí úkol</h3>
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
        <InputWrapper label="Téma" required>
          <Input placeholder="např. Naučit se slovíčka 3. lekce" required {...form.getInputProps("tema", { type: "input" })}/>
        </InputWrapper>
        <InputWrapper label="Od data" required>
          <DatePicker placeholder="01/01/2001" required locale="cs" firstDayOfWeek="monday" {...form.getInputProps("odData", { type: "input" })}/>
        </InputWrapper>
        <InputWrapper label="Do data" required>
          <DatePicker placeholder="02/02/2002" required locale="cs" firstDayOfWeek="monday" {...form.getInputProps("doData", { type: "input" })}/>
        </InputWrapper>
       
        <Button type="submit">Odeslat zprávu</Button>
      </form>
    </div>
  );
}
