import { Paper, RingProgress, Text } from "@mantine/core";
import GlobalStyle from "../../pages/dashboard/dashboard.module.css";
import styles from "./Znamky.module.css";
export default function Znamky(props) {
  return (
    <div className={GlobalStyle.smallerDiv}>
      <div className={GlobalStyle.head}>
        <h2 className={GlobalStyle.header}>Klasifikace</h2>
      </div>
      <div className={styles.znamky}>
        {Array.isArray(props.znamky) &&
          props.znamky.map((znamka) => {
            return (
              <div className={styles.znamka} key={znamka.key}>
                <Paper
                  sx={{
                    width: " 100%",
                    height: "100%",
                    borderRadius: "2px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center" }}>
                    <RingProgress
                      size={55}
                      thickness={4}
                      sections={[{ value: znamka.vaha * 10, color: "blue" }]}
                      roundCaps
                      label={
                        <Text
                          color="blue"
                          weight={700}
                          align="center"
                          size="xl"
                        >
                          {znamka.znamka}
                        </Text>
                      }
                    />

                    <div>
                      <Text className={styles.predmet}>{znamka.predmet}</Text>
                      <Text size="sm" className={styles.tema}>
                        {znamka.tema.slice(0, 17)}
                      </Text>
                    </div>
                  </div>
                  <Text size="sm" className={styles.datum}>
                    {znamka.date}
                  </Text>
                </Paper>
              </div>
            );
          })}
      </div>
    </div>
  );
}
