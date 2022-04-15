import { useDispatch, useSelector } from "react-redux"
import { Redirect } from "next"
import  Router, { useRouter } from "next/router"
import { useEffect, useRef } from "react"
import Link from "next/link"
import { authActions } from "../store/auth"

export default function IsAuthenticated(props){
    const state = useSelector((state)=> {return state.auth})
    var router = useRouter()
    const dispatch = useDispatch()
    if (state.isAuthenicated === true) {
        useEffect(()=> {
            router
        }, [])
        return(
            <>
                {props.children}
            </> 
        )
    }
    else{
       useEffect(()=> {
           router.push("/login")
           dispatch(authActions.deauthenticate())
           dispatch(authActions.setUser({firstName: "", lastName: "", birth: ""}))
       }, [])
        
        return <></>
     }
    }