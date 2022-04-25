import { Accordion, AccordionItem, Card, Text } from "@mantine/core";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import useFetch from "../customHooks/useFetch";
import styles from "./Uzivatele.module.css";

export default function Uzivatele() {
  const router = useRouter();

  const [uzivatele, setUzivatele] = useState([]);
  useEffect(async () => {
    var fetched = await useFetch(router, { users: true });
    fetched = fetched.users;
    const fetchedARR = [];
    for (let ftch in fetched) {
      fetchedARR.push(fetched[ftch]);
      console.log(ftch);
    }
    setUzivatele(fetchedARR);
  }, []);
  return (
    <div className={styles.main}>
      <Text>Přehled uživatelů</Text>
      <div className={styles.prehled}>
        <Accordion>
          <AccordionItem label="Bez role">
            <Card
              sx={{
                backgroundColor: "rgba(255, 255, 255, 0.63)",
                gap: "50px",
                display: "flex",
              }}
            >
              {uzivatele.map((neovereny) => {
                if (
                  !neovereny.zak &&
                  !neovereny.pracovnik &&
                  !neovereny.pracovnikOP &&
                  !neovereny.ucitel &&
                  !neovereny.reditel &&
                  !neovereny.zastupce &&
                  !neovereny.administrator
                ) {
                  return (
                    <Card>
                      <div className={styles.user}>
                        <Text size="sm">{neovereny.address}</Text>
                        <Text size="sm">{neovereny.birth}</Text>
                        <Text size="sm">
                          {neovereny.firstName + " " + neovereny.lastName}
                        </Text>
                      </div>
                    </Card>
                  );
                }
              })}
            </Card>
          </AccordionItem>
          <AccordionItem label="Žáci">
            {uzivatele.map((zak) => {
              if (zak.zak) {
                  console.log(zak)
                return (
                  <Card>
                    <div className={styles.user}>
                    <Text size="sm">{zak.zak.selectedTrida}</Text>
                    <Text size="sm">{zak.zak.selectedZamereni}</Text>
                      <Text size="sm">{zak.address}</Text>
                      <Text size="sm">{zak.birth}</Text>
                      <Text size="sm">
                        {zak.firstName + " " + zak.lastName}
                      </Text>
                     
                    </div>
                  </Card>
                );
              }
            })}
          </AccordionItem>
          <AccordionItem label="Pracovník">
            {uzivatele.map((praovnik) => {
              if (praovnik.pracovnik) {
                
                return (
                  <Card>
                    <div className={styles.user}>
                      <Text size="sm">{praovnik.address}</Text>
                      <Text size="sm">{praovnik.birth}</Text>
                      <Text size="sm">
                        {praovnik.firstName + " " + praovnik.lastName}
                      </Text>
                     
                    </div>
                  </Card>
                );
              }
            })}
          </AccordionItem>
          <AccordionItem label="Pracovník s personálními pravomocemi">
            {uzivatele.map((pracovnik) => {
              if (pracovnik.pracovnikOP) {
                
                return (
                  <Card>
                    <div className={styles.user}>
                      <Text size="sm">{pracovnik.address}</Text>
                      <Text size="sm">{pracovnik.birth}</Text>
                      <Text size="sm">
                        {pracovnik.firstName + " " + pracovnik.lastName}
                      </Text>
                     
                    </div>
                  </Card>
                );
              }
            })}
          </AccordionItem>
          <AccordionItem label="Zástupce">
            {uzivatele.map((zastupce) => {
              if (zastupce.zastupce) {
                
                return (
                  <Card>
                    <div className={styles.user}>
                      <Text size="sm">{zastupce.address}</Text>
                      <Text size="sm">{zastupce.birth}</Text>
                      <Text size="sm">
                        {zastupce.firstName + " " + zastupce.lastName}
                      </Text>
                     
                    </div>
                  </Card>
                );
              }
            })}
          </AccordionItem>
          <AccordionItem label="Ředitel">
            {uzivatele.map((reditel) => {
              if (reditel.reditel) {
                
                return (
                  <Card>
                    <div className={styles.user}>
                      <Text size="sm">{reditel.address}</Text>
                      <Text size="sm">{reditel.birth}</Text>
                      <Text size="sm">
                        {reditel.firstName + " " + reditel.lastName}
                      </Text>
                     
                    </div>
                  </Card>
                );
              }
            })}
          </AccordionItem>
          <AccordionItem label="Administrátor">
            {uzivatele.map((administrator) => {
              if (administrator.administrator) {
                
                return (
                  <Card>
                    <div className={styles.user}>
                      <Text size="sm">{administrator.address}</Text>
                      <Text size="sm">{administrator.birth}</Text>
                      <Text size="sm">
                        {administrator.firstName + " " + administrator.lastName}
                      </Text>
                     
                    </div>
                  </Card>
                );
              }
            })}
          </AccordionItem>
        </Accordion>
      </div>
    </div>
  );
}
