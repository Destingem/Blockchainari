
import { Center, MantineProvider } from "@mantine/core";
import { MetaMaskProvider } from "metamask-react";
import Router, {useRouter} from 'next/router'
import { useEffect } from "react";
import styles from "./css/index.module.css"
import NavBar from "../Components/NavBar/Navbar";
import Banner from "../Components/Banner/Banner";
import Bottom from "../Components/Bottom/Bottom";
export default function Index() {
  return (
      <div className={styles.main}>
        <Banner />
        
      </div>
  );
}
