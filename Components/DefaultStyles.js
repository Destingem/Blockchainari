import { produceWithPatches } from "immer";
import Bottom from "./Bottom/Bottom";
import NavBar from "./NavBar/Navbar";
import Head from "next/head";
import RegisterInfo from "./RegisterInfo/RegisterInfo";
import { useDispatch, useSelector } from "react-redux";
import { useMetaMask } from "metamask-react";
import styles from "./DefaultStyles.module.css"
export default function DefaultStyles(props) {
  try {
    var modals = useSelector(state => {return state.modals})
    var state = useSelector(state => state)
  } catch (error) {
    console.log(error);
  }
  return (
   <>{props.children}</>
  );
}
