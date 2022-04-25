import styles from "./Predmet.module.css";
import { Button, Input, InputWrapper, MultiSelect } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useEffect, useState } from "react";
import useFetch from "../customHooks/useFetch";
import { useRouter } from "next/router";
export default function Predmet(props) {
  const router = useRouter()
  const [vyucujici, setVyucujici] = useState([{label: "Julie Vidlařová"}, {label: "Jiří Sedláček"}, {label: "Brichta"}])
  const form = useForm({
    initialValues: {
      nazevPredmetu: "",
      zkratka: "",
      vyucujici: []
      
    }
  })
  function handleSubmit(params){
    props.handleSubmit(params, "predmety")
  }
  function handleNewTeacher(props){
    params.preventDefault();
    props.handleSubmit(params, "ucitele");
  }
  useEffect(async ()=> {
    const fetched = await useFetch(router, {ucitele: true})
    const fetched2 = await useFetch(router, {users: true})
    const ucitele = fetched.ucitele
    const users = fetched2.users
    var fetchedARR = []
    var usersARR = []
    for(let ftch in users){
      fetchedARR.unshift(users[ftch])
    }
    for(let user in users){
      usersARR.unshift(users[user])
    }
    var findedARR = []
    for(let ucitel in ucitele){
        console.log(ucitel);
        for(let user in users){
          console.log(user);
          if (user == ucitel) {
            findedARR.push({...users[user], label: users[user].firstName + " " + users[user].lastName + " (" + users[user].address + ")", value: users[user].address })
          }
        }
    }
    
    setVyucujici(findedARR)
  }, [])
  return (
    <div className={styles.main}>
    <h1 className={styles.heading}>Předmět</h1>
      <form onSubmit={form.onSubmit(handleSubmit)}>
      <InputWrapper id="" required label="Název předmětu">
        <Input id="" placeholder="např. Ekonomika" required {...form.getInputProps("nazevPredmetu", { type: "input" })} />
      </InputWrapper>
      <InputWrapper id="" required label="Zkratka">
        <Input id="" placeholder="např. ABCD" required {...form.getInputProps("zkratka", { type: "input" })} />
      </InputWrapper>
      <MultiSelect
        label="Vyučující"
        data={vyucujici}
        placeholder="Select items"
        searchable
        creatable
        getCreateLabel={(query) => `+ Create ${query}`}
        onCreate={handleNewTeacher}
        required
        {...form.getInputProps("vyucujici", { type: "input" })}
      />
      <Button type="submit">Vytvořit</Button>
      </form>
    </div>
  );
}
