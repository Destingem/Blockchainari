import { Card, Text } from "@mantine/core";
import styles from "./Zpravy.module.css";

export default function Zpravy(props) {
  return (
    <div className={styles.zpravy}>
      <div className={styles.head}>
        <h2 className={styles.header}>Zprávy</h2>
      </div>
      <div className={styles.content}>
        {Array.isArray(props.zpravy) &&
          props.zpravy.map((zprava) => {
            return (
              <Card className={styles.zprava} key={zprava.key}>
                <div>
                  <Text className={styles.zprava_nadpis}>{zprava.nadpis}</Text>
                  <Text size="sm">{zprava.text.slice(0, 50)}</Text>
                </div>

                <div>
                  <Text size="sm">{zprava.od}</Text>
                  <Text size="xs">{zprava.date}</Text>
                </div>
              </Card>
            );
          })}
      </div>
    </div>
  );
}
