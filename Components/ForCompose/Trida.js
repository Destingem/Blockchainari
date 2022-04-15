import styles from "./Trida.module.css";
import Randomstring from "randomstring";
import { InputWrapper, Input, Button, MultiSelect } from "@mantine/core";
import { useEffect, useRef, useState } from "react";
import useFetch from "../customHooks/useFetch";
import { useRouter } from "next/router";
import { useForm } from "@mantine/form";
export default function Trida(props) {
  const router = useRouter();
  const [obory, setObory] = useState([" "]);
  const [zamereni, setZamereni] = useState([" "]);
  const form = useForm({
    initialValues: {
      nazev: "",
      obor: "",
      kod: "",
      zamereni: [],
    },
  });

  async function getZamereni() {
    const fetched = await useFetch(router, { zamereni: true });
    if (fetched && Object.keys(fetched).length > 0 && fetched.tridy !== null) {
      console.log(fetched);

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
      console.log(fetched);

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
  useEffect(async () => {
    getZamereni();
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
      getObor()
    }, 1000);
  }
  useEffect(()=> {
    getObor()
  }, [])
  function handleSubmit(params) {
    props.handleSubmit(params, "tridy", form);
  }
  return (
    <div className={styles.trida}>
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

        <Button type="submit">Přidat třídu</Button>
      </form>
    </div>
  );
}
