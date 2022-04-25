import styles from "./Trida.module.css";
import Randomstring from "randomstring";
import { InputWrapper, Input, Button, MultiSelect, Text, Select } from "@mantine/core";
import { useEffect, useRef, useState } from "react";
import useFetch from "../customHooks/useFetch";
import { useRouter } from "next/router";
import { useForm } from "@mantine/form";
export default function Trida(props) {
  const router = useRouter();
  const [obory, setObory] = useState([" "]);
  const [zamereni, setZamereni] = useState([" "]);
  const [predmety, setPredmety] = useState([{label: "A", value: "A"}]);
  const form = useForm({
    initialValues: {
      nazev: "",
      obor: "",
      kod: "",
      zamereni: [],
      predmety: [],
    },
  });

  async function getZamereni() {
    const fetched = await useFetch(router, { zamereni: true });
    if (fetched && Object.keys(fetched).length > 0 && fetched.tridy !== null) {
      var resolved = [];
      for (var item in fetched.tridy) {
        resolved.push({
          value: fetched.tridy[item].zamereni,
          label: fetched.tridy[item].zamereni,
          key: Randomstring.generate(7),
        });
      }
      setZamereni(resolved);
    }
  }
  async function getObor() {
    const fetched = await useFetch(router, { obor: true });
    if (fetched && Object.keys(fetched).length > 0) {
      var resolved = [];
      for (var item in fetched.obory) {
        resolved.push({
          value: item,
          label: fetched.obory[item].obor,
          key: Randomstring.generate(7),
        });
      }
      setObory(resolved);
    }
  }
  async function getPredmet() {
    const fetched = await useFetch(router, { predmety: true });
    console.log(fetched);
    if (fetched && Object.keys(fetched).length > 0) {
      console.log(fetched);

      var resolved = [];
      for (var item in fetched.predmety) {
        resolved.push({
          value: fetched.predmety[item],
          label: item,
          key: Randomstring.generate(7),
        });
      }
      setPredmety(resolved);
    }
  }
  useEffect(async () => {
    getZamereni();
    getPredmet();
    getObor();
  }, []);
  function onCreateHandler(params) {
    props.handleSubmit(params, "zamereni");
    setTimeout(() => {
      getZamereni();
    }, 1000);
  }
  function onCreateOborHandler(params) {
    props.handleSubmit(params, "obor");
    setTimeout(() => {
      getObor();
    }, 1000);
  }
  function onCreatePredmetyHandler(params) {
    props.handleSubmit(params, "predmet");
    setTimeout(() => {
      getPredmet();
    }, 1000);
  }

  function handleSubmit(params) {
    props.handleSubmit(params, "tridy", form);
  }
  return (
    <div className={styles.main}>
      <h1 className={styles.heading}>Třída</h1>
      <form onSubmit={form.onSubmit(handleSubmit)}>
        <InputWrapper id="" required label="Název třídy">
          <Input
            id="input-demo"
            placeholder="např. KIT2"
            {...form.getInputProps("nazev")}
          />
        </InputWrapper>
        <InputWrapper id="" required label="Obor">
          <MultiSelect
            data={obory}
            onCreate={onCreateOborHandler}
            searchable
            creatable
            id="input-demo"
            placeholder="např. Informační Technologie"
            getCreateLabel={(query) => `+ Přidat ${query}`}
            {...form.getInputProps("obor")}
          />
        </InputWrapper>
        <InputWrapper id="" required label="Kód oboru">
          <Input
            id="input-demo"
            placeholder="např. 18-20-M/01"
            {...form.getInputProps("kod")}
          />
        </InputWrapper>
        <InputWrapper id="" required label="Zaměření">
          <MultiSelect
            searchable
            creatable
            getCreateLabel={(query) => `+ Přidat ${query}`}
            id="input-demo"
            data={zamereni}
            onCreate={onCreateHandler}
            placeholder="např. Kybernetická bezpečnost"
            {...form.getInputProps("zamereni", { type: "input" })}
          />
        </InputWrapper>
       {form.values.zamereni && form.values.zamereni.map(zamereni => {
          return(
            <div>
            <Text>{zamereni}</Text>
            <InputWrapper id="" required label="Předměty">
          <MultiSelect
            searchable
            creatable
            getCreateLabel={(query) => `+ Přidat ${query}`}
            id="input-demo"
            data={predmety}
            onCreate={onCreatePredmetyHandler}
            placeholder="např. Kybernetická bezpečnost"
            {...form.getInputProps(zamereni+ ".predmety", { type: "input" })}
          />
        </InputWrapper>
        { form.values[zamereni + ".predmety"] ?
        form.values[zamereni + ".predmety"].map((predmet) => {
            console.log(predmet)
            return (
              <InputWrapper id="" required label={"Předmět " + predmet.nazevPredmetu}>
              <Select label="Vyučující" data={predmet.vyucujici} />
              
              </InputWrapper>
            );
          }): <></>}
         
        </div>
          )
       })}
        

        <Button type="submit">Přidat třídu</Button>
      </form>
    </div>
  );
}
