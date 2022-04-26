import { useDispatch } from "react-redux" 
import { useRouter } from "next/router"
import { authActions } from "../../store/auth"
export default async function fetchRoute(router, props){

    const token = localStorage.getItem("Auth_token")
    const response = await fetch("/api/data", {
      method: "POST",
      body: JSON.stringify({token: token, ...props})
    })
    const res = await response.json()
    if (res.removeToken) {
      localStorage.removeItem("Auth_token")
      localStorage.removeItem("wallet")
      //dispatch(authActions.deauthenticate())
     // dispatch(authActions.setEth({ wallet: "", status: "", chain: "" }))
      router.replace("/login")
    } else{
        return await res
    }
}