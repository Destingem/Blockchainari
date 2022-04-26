import styles from "./Rozvrh.module.css";
import { Card, Col, Grid, Paper, Text } from "@mantine/core";
import Link from "next/link";

export default function Rozvrh() {
  var hodiny = [
    "7:00 - 7:45",
    "7:50 - 8:35",
    "8:45 - 9:30",
    "9:50 - 10:35",
    "10:45 - 11:30",
    "11:35 - 12:20",
    "12:25 - 13:10",
    "13:15 - 14:00",
    "14:05 - 14:50",
    "14:55 - 15:40",
    "15:45 - 16:30",
  ];
  var dny = [
    {
      day_short: "Po",
      day: "Pondělí",
      date: "1.1.2022",
      predmety: [
        {
          nazev: "Kybernetické prostředí",
          zkratka: "KyP",
          vyucujici: "Bc. Jiří Sedláček",
          supl: false,
          message: "",
        },
        {
          nazev: "Kybernetické prostředí",
          zkratka: "KyP",
          vyucujici: "Bc. Jiří Sedláček",
          supl: false,
          message: "",
        },
        {
          nazev: "Kybernetické prostředí",
          zkratka: "KyP",
          vyucujici: "Bc. Jiří Sedláček",
          supl: false,
          message: "",
        },
        {
          nazev: "Kybernetické prostředí",
          zkratka: "KyP",
          vyucujici: "Bc. Jiří Sedláček",
          supl: false,
          message: "",
        },
        {
          nazev: "Kybernetické prostředí",
          zkratka: "KyP",
          vyucujici: "Bc. Jiří Sedláček",
          supl: false,
          message: "",
        },
        {
          nazev: "Kybernetické prostředí",
          zkratka: "KyP",
          vyucujici: "Bc. Jiří Sedláček",
          supl: false,
          message: "",
        },
        {
          nazev: "Kybernetické prostředí",
          zkratka: "KyP",
          vyucujici: "Bc. Jiří Sedláček",
          supl: false,
          message: "",
        },
        {
          nazev: "Kybernetické prostředí",
          zkratka: "KyP",
          vyucujici: "Bc. Jiří Sedláček",
          supl: false,
          message: "",
        },
        {
          nazev: "Kybernetické prostředí",
          zkratka: "KyP",
          vyucujici: "Bc. Jiří Sedláček",
          supl: false,
          message: "",
        },
        {
          nazev: "Kybernetické prostředí",
          zkratka: "KyP",
          vyucujici: "Bc. Jiří Sedláček",
          supl: false,
          message: "",
        },
      ],
    },
    {
      day_short: "Út",
      day: "Úterý",
      date: "2.1.2022",
      predmety: [
        {
          nazev: "Kybernetické prostředí",
          zkratka: "KyP",
          vyucujici: "Bc. Jiří Sedláček",
          supl: false,
          message: "",
        },
        {
          nazev: "Kybernetické prostředí",
          zkratka: "KyP",
          vyucujici: "Bc. Jiří Sedláček",
          supl: false,
          message: "",
        },
        {
          nazev: "Kybernetické prostředí",
          zkratka: "KyP",
          vyucujici: "Bc. Jiří Sedláček",
          supl: false,
          message: "",
        },
        {
          nazev: "Kybernetické prostředí",
          zkratka: "KyP",
          vyucujici: "Bc. Jiří Sedláček",
          supl: false,
          message: "",
        },
        {
          nazev: "Kybernetické prostředí",
          zkratka: "KyP",
          vyucujici: "Bc. Jiří Sedláček",
          supl: false,
          message: "",
        },
        {
          nazev: "Kybernetické prostředí",
          zkratka: "KyP",
          vyucujici: "Bc. Jiří Sedláček",
          supl: false,
          message: "",
        },
        {
          nazev: "Kybernetické prostředí",
          zkratka: "KyP",
          vyucujici: "Bc. Jiří Sedláček",
          supl: false,
          message: "",
        },
        {
          nazev: "Kybernetické prostředí",
          zkratka: "KyP",
          vyucujici: "Bc. Jiří Sedláček",
          supl: false,
          message: "",
        },
        {
          nazev: "Kybernetické prostředí",
          zkratka: "KyP",
          vyucujici: "Bc. Jiří Sedláček",
          supl: false,
          message: "",
        },
        {
          nazev: "Kybernetické prostředí",
          zkratka: "KyP",
          vyucujici: "Bc. Jiří Sedláček",
          supl: false,
          message: "",
        },
      ],
    },
    {
      day_short: "St",
      day: "Středa",
      date: "3.1.2022",
      predmety: [
        {
          nazev: "Kybernetické prostředí",
          zkratka: "KyP",
          vyucujici: "Bc. Jiří Sedláček",
          supl: false,
          message: "",
        },
        {
          nazev: "Kybernetické prostředí",
          zkratka: "KyP",
          vyucujici: "Bc. Jiří Sedláček",
          supl: false,
          message: "",
        },
        {
          nazev: "Kybernetické prostředí",
          zkratka: "KyP",
          vyucujici: "Bc. Jiří Sedláček",
          supl: false,
          message: "",
        },
        {
          nazev: "Kybernetické prostředí",
          zkratka: "KyP",
          vyucujici: "Bc. Jiří Sedláček",
          supl: false,
          message: "",
        },
        {
          nazev: "Kybernetické prostředí",
          zkratka: "KyP",
          vyucujici: "Bc. Jiří Sedláček",
          supl: false,
          message: "",
        },
        {
          nazev: "Kybernetické prostředí",
          zkratka: "KyP",
          vyucujici: "Bc. Jiří Sedláček",
          supl: false,
          message: "",
        },
        {
          nazev: "Kybernetické prostředí",
          zkratka: "KyP",
          vyucujici: "Bc. Jiří Sedláček",
          supl: false,
          message: "",
        },
        {
          nazev: "Kybernetické prostředí",
          zkratka: "KyP",
          vyucujici: "Bc. Jiří Sedláček",
          supl: false,
          message: "",
        },
        {
          nazev: "Kybernetické prostředí",
          zkratka: "KyP",
          vyucujici: "Bc. Jiří Sedláček",
          supl: false,
          message: "",
        },
        {
          nazev: "Kybernetické prostředí",
          zkratka: "KyP",
          vyucujici: "Bc. Jiří Sedláček",
          supl: false,
          message: "",
        },
      ],
    },
    {
      day_short: "Čt",
      day: "Čtvrtek",
      date: "4.1.2022",
      predmety: [
        {
          nazev: "Kybernetické prostředí",
          zkratka: "KyP",
          vyucujici: "Bc. Jiří Sedláček",
          supl: false,
          message: "",
        },
        {
          nazev: "Kybernetické prostředí",
          zkratka: "KyP",
          vyucujici: "Bc. Jiří Sedláček",
          supl: false,
          message: "",
        },
        {
          nazev: "Kybernetické prostředí",
          zkratka: "KyP",
          vyucujici: "Bc. Jiří Sedláček",
          supl: false,
          message: "",
        },
        {
          nazev: "Kybernetické prostředí",
          zkratka: "KyP",
          vyucujici: "Bc. Jiří Sedláček",
          supl: false,
          message: "",
        },
        {
          nazev: "Kybernetické prostředí",
          zkratka: "KyP",
          vyucujici: "Bc. Jiří Sedláček",
          supl: false,
          message: "",
        },
        {
          nazev: "Kybernetické prostředí",
          zkratka: "KyP",
          vyucujici: "Bc. Jiří Sedláček",
          supl: false,
          message: "",
        },
        {
          nazev: "Kybernetické prostředí",
          zkratka: "KyP",
          vyucujici: "Bc. Jiří Sedláček",
          supl: false,
          message: "",
        },
        {
          nazev: "Kybernetické prostředí",
          zkratka: "KyP",
          vyucujici: "Bc. Jiří Sedláček",
          supl: false,
          message: "",
        },
        {
          nazev: "Kybernetické prostředí",
          zkratka: "KyP",
          vyucujici: "Bc. Jiří Sedláček",
          supl: false,
          message: "",
        },
        {
          nazev: "Kybernetické prostředí",
          zkratka: "KyP",
          vyucujici: "Bc. Jiří Sedláček",
          supl: false,
          message: "",
        },
      ],
    },
    {
      day_short: "Pá",
      day: "Pátek",
      date: "5.1.2022",
      predmety: [
        {
          nazev: "Kybernetické prostředí",
          zkratka: "KyP",
          vyucujici: "Bc. Jiří Sedláček",
          supl: false,
          message: "",
        },
        {
          nazev: "Kybernetické prostředí",
          zkratka: "KyP",
          vyucujici: "Bc. Jiří Sedláček",
          supl: false,
          message: "",
        },
        {
          nazev: "Kybernetické prostředí",
          zkratka: "KyP",
          vyucujici: "Bc. Jiří Sedláček",
          supl: false,
          message: "",
        },
        {
          nazev: "Kybernetické prostředí",
          zkratka: "KyP",
          vyucujici: "Bc. Jiří Sedláček",
          supl: false,
          message: "",
        },
        {
          nazev: "Kybernetické prostředí",
          zkratka: "KyP",
          vyucujici: "Bc. Jiří Sedláček",
          supl: false,
          message: "",
        },
        {
          nazev: "Kybernetické prostředí",
          zkratka: "KyP",
          vyucujici: "Bc. Jiří Sedláček",
          supl: false,
          message: "",
        },
        {
          nazev: "Kybernetické prostředí",
          zkratka: "KyP",
          vyucujici: "Bc. Jiří Sedláček",
          supl: false,
          message: "",
        },
        {
          nazev: "Kybernetické prostředí",
          zkratka: "KyP",
          vyucujici: "Bc. Jiří Sedláček",
          supl: false,
          message: "",
        },
        {
          nazev: "Kybernetické prostředí",
          zkratka: "KyP",
          vyucujici: "Bc. Jiří Sedláček",
          supl: false,
          message: "",
        },
        {
          nazev: "Kybernetické prostředí",
          zkratka: "KyP",
          vyucujici: "Bc. Jiří Sedláček",
          supl: false,
          message: "",
        },
      ],
    },
  ];
  return (
    <div className={styles.rozvrh}>
      <div className={styles.rozvrh_head}>
        <Link href="/rozvrh" >
       
          <h2 className={styles.rozvrh_header}>Rozvrh</h2>
        </Link>
      </div>
      <div className={styles.obsah}>
        <Grid
          columns={hodiny.length + 1}
          justify="center"
          sx={{ display: "flex" }}
        >
          <Col span={1}>
            <Card className={styles.card}></Card>
          </Col>
          {hodiny &&
            hodiny.map((hodina) => {
              return (
                <Col span={1}>
                  <Card className={styles.card}>
                    <Text size="xl">{hodiny.indexOf(hodina)}</Text>
                    <Text size="xs">{hodina}</Text>
                  </Card>
                </Col>
              );
            })}
        </Grid>

        <Grid
          columns={dny.length}
          sx={{ margin: "0", gap: "2vh", marginTop: "2vh" }}
        >
          {dny &&
            dny.map((den) => {
              return (
                <Col sx={{ padding: "0" }}>
                  <Card className={styles.padding0}>
                    <Grid columns={11} className={styles.day}>
                      <Col span={1} sx={{ padding: 0 }}>
                        <Card
                          className={styles.hodina}
                          sx={{ backgroundColor: "white" }}
                        >
                          <Text>{den.day_short}</Text>
                          <Text>{den.date}</Text>
                        </Card>
                      </Col>

                      {den.predmety &&
                        den.predmety.map((predmet) => {
                          return (
                            <Col span={1} sx={{ padding: 0 }}>
                              <Card
                                className={styles.hodina}
                                sx={{
                                  padding: 0,
                                  backgroundColor: "#ffffff18",
                                }}
                              >
                                <Text>{predmet.zkratka}</Text>
                                <Text size="xs">{predmet.vyucujici}</Text>
                              </Card>
                            </Col>
                          );
                        })}
                    </Grid>
                  </Card>
                </Col>
              );
            })}
        </Grid>
      </div>
    </div>
  );
}
