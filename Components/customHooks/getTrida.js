import useFetch from "./useFetch";
import Randomstring from "randomstring";
export default async function getTrida(router){

    var fetchedClasses = await useFetch(router, { tridy: true });
    console.log(fetchedClasses);
    const resolved = [];
    if (fetchedClasses) {
      for (var a in fetchedClasses.tridy) {
        if (fetchedClasses[a] !== "" || undefined || null) {
          let { nazev, zamereni } = fetchedClasses.tridy[a];
          resolved.unshift({
            value: nazev,
            zamereni,
            label: nazev,
            key: Randomstring.generate(7),
          });
        }
      }
    }
    return resolved
}