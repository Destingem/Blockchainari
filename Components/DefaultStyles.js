import { produceWithPatches } from "immer";
import Bottom from "./Bottom/Bottom";
import NavBar from "./NavBar/Navbar";
import Head from "next/head";
import RegisterInfo from "./RegisterInfo/RegisterInfo";
import { useDispatch, useSelector } from "react-redux";
import { useMetaMask } from "metamask-react";
import styles from "./DefaultStyles.module.css";
export default function DefaultStyles(props) {
  try {
    var modals = useSelector((state) => {
      return state.modals;
    });
    var state = useSelector((state) => state);
  } catch (error) {
    console.log(error);
  }
  return (
    <>
      <Head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
        <link
          href="https://fonts.googleapis.com/css2?family=Nunito:wght@700&family=Roboto:wght@300&display=swap"
          rel="stylesheet"
        />
      </Head>
      {props.children}
    </>
  );
}

/*

      <Head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
        <link
          href="https://fonts.googleapis.com/css2?family=Nunito:wght@700&family=Roboto:wght@300&display=swap"
          rel="stylesheet"
        />
      </Head>
      {modals && modals.register == true && state && <RegisterInfo state={state} />}
      <NavBar />
      {props.children}
      <Bottom />
*/
