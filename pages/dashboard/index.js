import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import IsAuthenticated from "../../Components/IsAuthenticated";
import styles from "./dashboard.module.css";
import { authActions } from "../../store/auth";
import { useRouter } from "next/router";
import useFetch from "../../Components/customHooks/useFetch";
import { Paper, Text } from "@mantine/core";
import Zpravy from "../../Components/ForDashboard/Zpravy";
import Randomstring from "randomstring";
import Znamky from "../../Components/ForDashboard/Znamky";
export default function Dashboard() {
  const [obsah, setObsah] = useState({ zpravy: [], grade: [], homework: [] });
  const dispatch = useDispatch();
  const router = useRouter();

  useEffect(() => {
    const res = useFetch(router, {
      zpravy: true,
      klasifikace: true,
      du: true,
      rozvrh: true,
    });
    res.then((data) => {
      console.log(data);
      if (data && data.zpravy) {
        const msg = [];
        for (var message in data.zpravy) {
          if (data.zpravy[message].date !== "") {
            let { date, nadpis, od, zprava } = data.zpravy[message];
            msg.unshift({
              date,
              nadpis,
              od,
              zprava,
              key: Randomstring.generate(7),
            });
          }
        }
      }
      if (data && data.klasifikace) {
        const znamky = [];
        for (var a in data.klasifikace) {
          if (data.klasifikace[a] !== "" || undefined || null) {
            console.log(a);
            let { date, tema, od, vaha, znamka } = data.klasifikace[a];
            znamky.unshift({
              date,
              tema,
              od,
              vaha,
              znamka,
              key: Randomstring.generate(7),
            });
          }
        }
      }
      if (data && data.du) {
        const du = [];
        for (var b in data.du) {
          if (data.du[b].date !== "" || undefined) {
            let { date, doData, od, odData, tema } = data.du[b];
            du.unshift({
              date,
              doData,
              od,
              odData,
              tema,
              key: Randomstring.generate(7),
            });
          }
        }
      }
      setObsah((obsahBefore) => {
        var zpravy = obsahBefore.zpravy;
        var grade = obsahBefore.grade;
        var homework = obsahBefore.homework;
        if (msg) {
          zpravy = msg;
        }
        if (znamky) {
          grade = znamky;
        }
        if (du) {
          homework = du;
        }
        return { zpravy, grade, homework };
      });
    });
  }, []);

  return (
    <IsAuthenticated>
      <div className={styles.main}>
        <div className={styles.small}>
          <Zpravy zpravy={obsah.zpravy} />
          <Znamky znamky={obsah.grade} />
          <div className={styles.smallerDiv}>
            <div className={styles.head}>
              <h2 className={styles.header}>Domácí úkoly</h2>
            </div>
            {Array.isArray(obsah.homework) &&
              obsah.homework.map((znamka) => {
                return (
                  <Paper
                    shadow="xs"
                    radius="xs"
                    p="xs"
                    sx={{ width: " 100%", maxHeight: "25%", marginTop: "1%" }}
                  >
                    <Text>{znamka.date}</Text>
                    <Text>{znamka.od}</Text>
                    <Text>{znamka.odData}</Text>
                    <Text>{znamka.doData}</Text>
                    <Text>{znamka.tema}</Text>
                  </Paper>
                );
              })}
          </div>
        </div>
        <div className={styles.bigger}>
          <div className={styles.rozvrh}>
            <div className={styles.rozvrh_head}>
              <h1 className={styles.rozvrh_header}>Rozvrh</h1>
            </div>
          </div>
        </div>
      </div>
    </IsAuthenticated>
  );
}
