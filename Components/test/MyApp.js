import { Button, Card } from "@mantine/core";
import { useMetaMask} from "metamask-react";
import styles from "./MyApp.module.css"
export default function MyApp(){
    var { status, connect, account, chainId, ethereum } = useMetaMask();
    function handleLogin(){
        connect()
    }
    async function handleLogout(params) {
        const message = "Test!";
        const accounts = await ethereum.request({ method: 'eth_requestAccounts' });
        const account = accounts[0];
        const signature = await ethereum.request({ method: 'personal_sign', params: [ message, account ] });
        console.log(signature);
    }

    console.log(account);
    console.log(status);
    console.log(chainId);
    console.log(ethereum);
    console.log(connect);
    return(
        <div className={styles.main}>
        <h1>Blockchaináři</h1>
        <div className={styles.metamask}>
        <Button onClick={handleLogin}>Přihlásit se přes MetaMask</Button>
        <Button onClick={handleLogout}>Odhlásit se</Button>
        <Card>
            <h2>Status: {status}</h2>
            <p>Account: {account}</p>
            <p>chainId: {chainId}</p>
            
        </Card>
        </div>
        </div>
    )
}