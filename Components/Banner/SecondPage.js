import styles from "./Secondpage.module.css"
import { SimpleGrid, Paper } from "@mantine/core"
import { IoFlash, IoLogoFirebase } from "react-icons/io5";
import {AiFillSafetyCertificate, AiFillGithub, AiOutlineMobile} from "react-icons/ai"
import {VscSettings} from "react-icons/vsc"
import { Text } from "@mantine/core";
import Image from "next/image";
export default function SecondPage(){

    return(
        <div className={styles.secondPage}>
        <div className={styles.text}>
          <Text
            size="xl"
            weight={700}
            sx={{
              fontSize: "8vh",
              color: "gray",
              marginLeft: "0",
              marginTop: "1vh",
            }}
          >
            Méně je někdy více
          </Text>
          <Text size="xl">
            Minimalistický design. Žádné přihlašovací údaje. To jsou Blockchaináři. Zatím se jedná pouze o ročníkový projekt na téma Blockchain, nemůžou být považováni za software určený k přímému nasazení.
          </Text>
          <SimpleGrid cols={5} spacing="sm" className={styles.papers} style={{marginTop: "18vh"}}>
            <Paper shadow="md" className={styles.paper}>
             
             <IoFlash />
             <Text size="xl">Rychlost</Text>
             <Text size="md">Postaveno na Node.js s Firebase</Text>
            </Paper>
            <Paper shadow="md" className={styles.paper}>
              <AiFillSafetyCertificate />
              <Text size="xl">Bezpečnost</Text>
              <Text size="sm">Díky ověření přes Metamask neukládáme žádné přihlašovací údaje</Text>
            </Paper>
            <Paper shadow="md" className={styles.paper}>
            <AiFillGithub />
            <Text size="xl">Opensource</Text>
            <Text size="sm">Zdrojový kód včetně backendu je dostupný na githubu *click*</Text>
            </Paper>
            <Paper shadow="md" className={styles.paper}>
            <AiOutlineMobile />
            <Text size="xl">Responsivita</Text>
            <Text size="sm">Celé prostředí je optimalizováno pro mobily, počítače či tablety</Text>
            </Paper>
            <Paper shadow="md" className={styles.paper}>
            <VscSettings />
            <Text size="xl">Modularita</Text>
            <Text size="sm">Prostředí lze snadno upravovat, dle potřeb zákazníka</Text>
            </Paper>
          </SimpleGrid>
        </div>
        <div style={{ marginLeft: "10vh" , minWidth: "60vh"}}>
          <Image src="/images/mobile.png" width={278} height={541} />
        </div>
      </div>
    )
}