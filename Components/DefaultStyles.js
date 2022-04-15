import { produceWithPatches } from "immer";
import Bottom from "./Bottom/Bottom";
import NavBar from "./NavBar/Navbar";
import Head from "next/head";
import RegisterInfo from "./RegisterInfo/RegisterInfo";
import { useDispatch, useSelector } from "react-redux";
import { useMetaMask } from "metamask-react";

export default function DefaultStyles(props) {
  const modals = useSelector(state => {return state.modals})
  const state = useSelector(state => state)
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
      {modals.register == true && <RegisterInfo state={state} />}
      <NavBar />
      {props.children}
      <Bottom />
    </>
  );
}
