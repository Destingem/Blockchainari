import { Paper } from "@mantine/core";
import GlobalStyle from "../../pages/dashboard/dashboard.module.css"
import styles from "./Znamky.module.css"
export default function Znamky(props){

    return(
        <div className={GlobalStyle.smallerDiv}>
            <div className={GlobalStyle.head}>
              <h2 className={GlobalStyle.header}>Klasifikace</h2>
            </div>
            <div className={styles.znamky}>
            {Array.isArray(props.znamky) &&
              props.znamky.map((znamka) => {
                return (
                  <div className={styles.znamka} key={znamka.key}>
                    <Paper sx={{width:" 100%", height: "100%", borderRadius: "2px", display: "flex"}}>
                    <p className={styles.obdrzena_znamka}>{znamka.znamka}</p>
                    <p className={styles.datum}>{znamka.date}</p>
                    <p className={styles.predmet}>{znamka.predmet}</p>
                    <p className={styles.tema}>{znamka.tema}</p>
                    <p className={styles.vaha}>{znamka.vaha}</p>
                    
                    </Paper>
                  </div>
                );
              })}
              </div>
          </div>
    )
}