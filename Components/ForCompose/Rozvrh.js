
import { useForm } from "@mantine/form"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import useFetch from "../customHooks/useFetch"
import styles from "./Rozvrh.module.css"

export default function Rozvrh(){
    const [classes, setClasses] = useState([])
    const router = useRouter()
    const form = useForm({
        initialValues: {
            trida: "",
            zamereni: "",
            rozvrh: {d1: [], d2: [],d3: [],d4: [],d5: []}
        }
    })
    function submitHandler(props){
        var fetched = useFetch(router, {predmety: true})
    }
    useEffect(()=> {

    }, [form.zamereni])
    return(
        <div>
            <form onSubmit={form.onSubmit(submitHandler)}>
            <div className={styles.classes}>
                {classes && classes.map((cls) => {
                    return(
                        <></>
                    )
                })}
            </div>
            </form>
        </div>
    )
}