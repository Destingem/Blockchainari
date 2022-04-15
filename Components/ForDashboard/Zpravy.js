
import styles from "./Zpravy.module.css"

export default function Zpravy(props){

    return(
        <div className={styles.zpravy}>
            <div className={styles.head}>
              <h2 className={styles.header}>Zprávy</h2>
            </div>
            <div className={styles.content}>
              {Array.isArray(props.zpravy) &&
                props.zpravy.map((zprava) => {
                  return (
                    <div className={styles.zprava} key={zprava.key}>
                      <div className={styles.part}>
                        <p className={styles.zprava_nadpis}>{zprava.nadpis}</p>
                      </div>
                      <div className={styles.part}>
                        <p>{zprava.zprava.slice(0, 50)}</p>
                      </div>

                      <div>
                        <p>{zprava.od}</p>
                        <p>{zprava.date}</p>
                      </div>
                    </div>
                  );
                })}
            </div>
          </div>
    )
}