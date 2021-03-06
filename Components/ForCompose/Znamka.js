import Randomstring from "randomstring";
import styles from "./Znamka.module.css";
import {
  NativeSelect,
  InputWrapper,
  Input,
  MultiSelect,
  Select,
  Accordion,
  AccordionItem,
  Button,
} from "@mantine/core";
import { useEffect, useState } from "react";
import useFetch from "../customHooks/fetchRoute";
import { useRouter } from "next/router";
import { useForm } from "@mantine/form";
import { useInputState } from "@mantine/hooks";
import getTrida from "../customHooks/getTrida";
import getUsers from "../customHooks/getUsers";
import findMatch from "../customHooks/findMatch";
var firstLoad = true;
export default function Znamka(props) {
  const [classes, setClasses] = useState(["KIT1", "BP1", "LG1"]);
  const [zamereni, setZamereni] = useState(["KB", "IT", "LG"]);
  const [zaci, setZaci] = useState([" ", " ", " "]);
  const [selClass, setSelClass] = useState("");
  const [predmety, setPredmety] = useState([
    " ",
    "Český Jazyk",
    "Matematika",
    "Angličtina",
    "Němčina",
  ]);
  const router = useRouter();
  const form = useForm({
    initialValues: {
      trida: "",
      zak: "",
      tema: "",
      znamka: "",
      vaha: "",
      predmet: "",
    },
  });
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
    const result = await getTrida(router);
    setClasses(result);
  }, []);

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

  function handleSubmit(params) {
    props.handleSubmit(params, "znamky");
  }

  return (
    <div className={styles.main}>
      <h3 className={styles.heading}>Klasifikace</h3>
      <div className={styles.klasifikace}>
        <div className={styles.form}>
          <form onSubmit={form.onSubmit(handleSubmit)} className="klasifikace">
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
              <Input
                placeholder="např. Lomené výrazy"
                {...form.getInputProps("tema", { type: "input" })}
              />
            </InputWrapper>
            <Select
              data={["1", "1-", "2", "2-", "3", "3-", "4", "4-", "5"]}
              placeholder="Vyberte..."
              label="Známka"
              description=""
              required
              {...form.getInputProps("znamka", { type: "input" })}
            />
            <Select
              data={["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"]}
              placeholder="Vyberte..."
              label="Váha"
              description=""
              required
              {...form.getInputProps("vaha", { type: "input" })}
            />
            <Select
              data={predmety}
              placeholder="Vyberte..."
              label="Vyberte předmět"
              description=""
              required
              {...form.getInputProps("predmet", { type: "input" })}
            />
            <Button type="submit">Udělit známku</Button>
          </form>
        </div>
        <div className={styles.preview}>
          {zaci && zaci[0] && zaci[0].firstName
            ? zaci.map((zak) => {
                return (
                  <div className={styles.zak}>
                    <div className={styles.zak_info}>
                      <p>{zak.firstName + " " + zak.lastName}</p>
                      <p>{zak.value}</p>
                      <p>{zak.birth}</p>
                    </div>
                    {zak.znamky ? (
                      <Accordion
                        sx={{
                          borderRadius: " 0 0 8px 0",
                          width: "100%",
                          transition: "0.5",
                          backgroundColor: "rgba(255, 255, 255, 0.32)",
                        }}
                      >
                        <AccordionItem
                          label="Klasifikace"
                          sx={{ borderRadius: "3px" }}
                        >
                          {form.values.predmet}
                          {!form.values.predmet ||
                          form.values.predmet == " " ? (
                            <div className={styles.znamky}>
                              {zak.znamky.map((znamka) => {
                                return (
                                  <div className={styles.znamka}>
                                    <p className={styles.grade}>
                                      {znamka.znamka}
                                    </p>
                                    <p>{znamka.date}</p>
                                    <p>{znamka.od}</p>
                                    <p>{znamka.predmet}</p>
                                    <p>{znamka.tema}</p>
                                    <p>{znamka.vaha}</p>
                                  </div>
                                );
                              })}
                            </div>
                          ) : (
                            zak.znamky.map((znamka) => {
                              if (znamka.predmet !== form.values.predmet) {
                                return null;
                              }
                              return (
                                <div className={styles.znamka}>
                                  <p className={styles.grade}>
                                    {znamka.znamka}
                                  </p>
                                  <p>{znamka.date}</p>
                                  <p>{znamka.od}</p>
                                  <p>{znamka.predmet}</p>
                                  <p>{znamka.tema}</p>
                                  <p>{znamka.vaha}</p>
                                </div>
                              );
                            })
                          )}
                        </AccordionItem>
                      </Accordion>
                    ) : null}
                  </div>
                );
              })
            : null}
        </div>
      </div>
    </div>
  );
}
