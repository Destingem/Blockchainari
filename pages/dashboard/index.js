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
import Du from "../../Components/ForDashboard/Du";
import Rozvrh from "../../Components/ForDashboard/Rozvrh";
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
        var msg = [];
        for (var message in data.zpravy) {
          if (data.zpravy[message].date !== "") {
            let { date, nadpis, od, text } = data.zpravy[message];
            msg.unshift({
              date,
              nadpis,
              od,
              text,
              key: Randomstring.generate(7),
            });
          }
        }
        msg = msg.slice(0, 4)
      }
      if (data && data.klasifikace) {
        var znamky = [];
        for (var a in data.klasifikace) {
          if (data.klasifikace[a] !== "" || undefined || null) {
            console.log(a);
            let { date, tema, od, vaha, znamka, predmet } = data.klasifikace[a];
            znamky.unshift({
              date,
              tema,
              od,
              vaha,
              znamka,
              predmet,
              key: Randomstring.generate(7),
            });
          }
        }
        znamky = znamky.slice(0, 4)
      }
      if (data && data.du) {
        var du = [];
        
        for (var b in data.du) {
          
            if (data.du[b].date !== "" || undefined) {
              
              let { date, datum, predmet, tema } = data.du[b];
              du.unshift({
                date,
                datum,
                predmet,
                tema,
                key: Randomstring.generate(7),
              });
            
          }
        }
        du = du.slice(0, 3)
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
            <div className={styles.obsah}>
            <Du du={obsah.homework} />
            </div>
          </div>
        </div>
        <div className={styles.bigger}>
          <Rozvrh />
        </div>
      </div>
    </IsAuthenticated>
  );
}
