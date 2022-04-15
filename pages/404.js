import { Center } from "@mantine/core";
import { useRouter } from "next/dist/client/router";
export default function NotFound(){
    var router = useRouter()
    setTimeout(() => {
    router.push("/")
    }, 2000);

    return(
        <Center sx={{display: "flex", flexDirection: "column"}}>
            <h1>Stránka nenalezena</h1>
            <p>You will be redicted in {} </p>
        </Center>
    )
}