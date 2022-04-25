import styles from "./Du.module.css";
import { Paper, Progress } from "@mantine/core";
import { Text } from "@mantine/core";
export default function Du(props) {
  return (
    Array.isArray(props.du) &&
    props.du.map((znamka) => {
      var startDate = new Date(znamka.datum[0].toString()).getTime();
      var endDate = new Date(znamka.datum[1].toString()).getTime();
      var today = new Date().getTime();
      return (
        <Paper
          shadow="xs"
          radius="xs"
          p="xs"
          sx={{ width: "95%", marginTop: "3%", minHeight: "fit-content" }}
          className={styles.du}
        >
          <div className={styles.info}>
            <Text size="lg">{znamka.predmet}</Text>
            <div style={{ display: "flex", flexDirection: "column", alignItems: "end" }}>
              <Text size="xs">Zadáno: {znamka.date}</Text>
              <Text size="sm">{znamka.tema.slice(0, 22)}</Text>
            </div>
          </div>
          <div className={styles.date}>
            <Progress
              value={
                ((endDate - startDate - (endDate - today)) /
                  (endDate - startDate)) *
                100
              }
              sx={{ width: "100%", minHeight: " 5%" }}
            />
            <div className={styles.data}>
              <Text size="xs">
                {new Date(znamka.datum[0])
                  .toLocaleDateString("cs-CZ", {
                    weekday: "long",

                    month: "short",
                    day: "numeric",
                  })
                  .toString()}
              </Text>
              <Text size="xs">
                {new Date(znamka.datum[1])
                  .toLocaleDateString("cs-CZ", {
                    weekday: "long",

                    month: "short",
                    day: "numeric",
                  })
                  .toString()}
              </Text>
            </div>
          </div>
        </Paper>
      );
    })
  );
}
