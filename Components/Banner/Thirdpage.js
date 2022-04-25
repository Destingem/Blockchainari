import styles from "./Thirdpage.module.css";
import { SimpleGrid, Paper, Box } from "@mantine/core";
import { FaReact } from "react-icons/fa";
import { IoFlash, IoLogoFirebase } from "react-icons/io5";
import { Text } from "@mantine/core";
import Image from "next/image";
import {BsChevronRight} from "react-icons/bs"
export default function ThirdPage() {
  return (
    <div className={styles.thirdPage}>
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
        Co používáme
      </Text>
      <Text size="xl" pr="37vh">
        Jedeme full stack Javascript :) Přesněji integraci React.js a Node.js v
        framworku Next.js. O data se nám stará Firebase, ale v budoucnu bude i
        verze s implementací MongoDB. Hosting je momentálně na platformě Vercel.
      </Text>
      <SimpleGrid
        cols={8}
        spacing="sm"
        className={styles.papers}
        style={{ padding: "0 0 0 0", margin: "2vh 30vh 0 30vh"  }}
      >
        <Paper shadow="md" className={styles.paper}>
          <FaReact />
          <Text size="xl">React.js</Text>
          <Text size="md">Javascriptová knihovna pro tvoření UI</Text>
        </Paper>
        <Paper shadow="md" className={styles.paper}>
          <Image src="/images/nextjs_icon.png" width={64} height={64} />
          <Text size="xl">Next.js</Text>
          <Text size="sm">Framework pro React postavený na Node.js</Text>
        </Paper>
        <Paper shadow="md" className={styles.paper}>
          <IoLogoFirebase />
          <Text size="xl">Firebase</Text>
          <Text size="sm">
            Platforma pro backendové funkcionality (databáze, analytiky,
            oveřování apod.)
          </Text>
        </Paper>
        <Paper shadow="md" className={styles.paper}>
          <Image src="/images/mantine.png" width={64} height={64} />
          <Text size="xl">Mantine</Text>
          <Text size="sm">
            Knihovna designů komponentů pro React, včetně tohoto textu
          </Text>
        </Paper>
      </SimpleGrid>
      <Text
        size="xl"
        weight={700}
        sx={{
          fontSize: "4vh",
          color: "gray",
          marginLeft: "0",
          marginTop: "1vh",
        }}
      >
        NPM packages
      </Text>
      <SimpleGrid
        cols={8}
        spacing="sm"
        className={styles.papers}
        style={{ padding: "0 0 0 0"}}
      >
        <Paper shadow="sm" className={styles.paper}>
          <Text size="xl">Redux & Reduxjs Toolkit</Text>
          <Text size="md">Pro state management</Text>
        </Paper>
        <Paper shadow="sm" className={styles.paper}>
          <Text size="xl">Ethers & Metamask React</Text>
          <Text size="md">Pro přihlašování přes MetaMask</Text>
        </Paper>
        <Paper shadow="sm" className={styles.paper}>
          <Text size="xl">JWT</Text>
          <Text size="md">Pro user tokeny</Text>
        </Paper>
        <Paper shadow="sm" className={styles.paper}>
          <Text size="xl">Lodash</Text>
          <Text size="md">V backendu pro handeling user inputů</Text>
        </Paper>
        <Paper shadow="sm" className={styles.paper}>
          <Text size="xl">Randomstring</Text>
          <Text size="md">Pro generování nonce</Text>
        </Paper>
        <Paper shadow="sm" className={styles.paper}>
          <Text size="xl">Zod</Text>
          <Text size="md">Pro ověřování formulářů</Text>
        </Paper>
        <Paper shadow="sm" className={styles.paper}>
          <Text size="xl">+</Text>
          <Text size="md">Vše uvedené výše</Text>
        </Paper>
        <Box shadow="xl" className={styles.paper}>
          <BsChevronRight />
          <Text size="md">Kompletní package.json</Text>
        </Box>
        
      </SimpleGrid>
    </div>
  );
}
