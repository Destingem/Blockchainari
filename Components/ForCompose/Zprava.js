import Randomstring from "randomstring";
import {
  Button,
  Input,
  InputWrapper,
  NativeSelect,
  Textarea,
  MultiSelect,
} from "@mantine/core";
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import useFetch from "../customHooks/fetchRoute";
import styles from "./Zprava.module.css";
import { useForm } from "@mantine/form";

export default function Zprava(props) {
  const router = useRouter();
  const [prijemci, setPrijemci] = useState([]);

  const form = useForm({initialValues: {}})
  useEffect(async () => {
    const data = await useFetch(router, { users: true });
    console.log(data);
    var resolved = [];
    for (var a in data.users) {
      if (data[a] !== "" || undefined || null) {
        let { birth, firstName, lastName, address } = data.users[a];
        resolved.unshift({
          value:address,
          birth,
          firstName,
          lastName,
          label:  firstName + " " + lastName + " (" + address + ") ",
          key: Randomstring.generate(7)
        });
      }
    }
    if (resolved) {
    } else {
      resolved = [];
    }
    console.log(resolved);
    setPrijemci(resolved);
  }, []);
  function handleSubmit(params) {
    props.handleSubmit(params, "zpravy", form);
  }
  return (
    <div className={styles.main}>
      <h3 className={styles.heading}>Zprávy</h3>
      <form onSubmit={form.onSubmit(handleSubmit)} className="zpravy">
        <InputWrapper required label="Příjemce">
          <MultiSelect
            
            limit={10}
            data={prijemci}
            placeholder="Vyberte příjemce..."
            searchable
            nothingFound="Nothing found"
            {...form.getInputProps('prijemce', {type: "input" })}
          />
        </InputWrapper>
        <InputWrapper required label="Nadpis">
          <Input placeholder="např. ABCD" {...form.getInputProps('nadpis', {type: "input" })}/>
        </InputWrapper>
        <InputWrapper required label="Text">
          <Input placeholder="např. ABCD" {...form.getInputProps('text', {type: "input" })} />
        </InputWrapper>

        <Button type="submit">Odeslat zprávu</Button>
      </form>
    </div>
  );
}
