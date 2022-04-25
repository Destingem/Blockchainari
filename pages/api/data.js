require("dotenv").config();
var jwt = require("jsonwebtoken");
const secretKey = process.env.JSW_PASS;
export default async function handler(req, res) {
  const body = await JSON.parse(req.body);
  console.log(body);

  try {
    const verification = jwt.verify(body.token, secretKey, { maxAge: "1h" });
    console.log(verification);
    if (
      verification &&
      verification.exp - Date.now() / 1000 > 0 &&
      verification.allowLogin
    ) {
      var response = {};
      if (body.zpravy) {
        const fetched = await fetch(
          "https://blockchainari-d4489-default-rtdb.europe-west1.firebasedatabase.app/authedUsers/" + verification.address +  "/zpravy.json"
        );
        const data = await fetched.json();
        response = { ...response, zpravy: data };
      }
      if (body.klasifikace) {
        const fetched = await fetch(
          "https://blockchainari-d4489-default-rtdb.europe-west1.firebasedatabase.app/authedUsers/" + verification.address + "/zak/znamky.json"
        );
        const data = await fetched.json();
        response = { ...response, klasifikace: data };
      }
      if (body.du) {
        const fetched = await fetch(
          "https://blockchainari-d4489-default-rtdb.europe-west1.firebasedatabase.app/authedUsers/" + verification.address + "/zak/ukoly.json"
        );
        const data = await fetched.json();
        response = { ...response, du: data };
      }
      if (body.rozvrh) {
        const fetched = await fetch(
          "https://blockchainari-d4489-default-rtdb.europe-west1.firebasedatabase.app/rozvrh.json"
        );
        const data = await fetched.json();
        response = { ...response, rozvrh: data };
      }
      if (body.users) {
        const fetched = await fetch(
          "https://blockchainari-d4489-default-rtdb.europe-west1.firebasedatabase.app/authedUsers.json"
        );
        const data = await fetched.json();
        response = { ...response, users: data };
      }
      if (body.tridy) {
        const fetched = await fetch(
            "https://blockchainari-d4489-default-rtdb.europe-west1.firebasedatabase.app/tridy.json"
          );  
          const data = await fetched.json();
          response = {...response, tridy: data}
      }
      if (body.zamereni) {
        const fetched = await fetch(
            "https://blockchainari-d4489-default-rtdb.europe-west1.firebasedatabase.app/zamereni.json"
          );  
          const data = await fetched.json();
          response = {...response, tridy: data}
      }
      if(body.obor){
        const fetched = await fetch(
          "https://blockchainari-d4489-default-rtdb.europe-west1.firebasedatabase.app/obory.json"
        );
        const data = await fetched.json();
          response = {...response, obory: data}
      }
      if(body.znamky){
        const fetched = await fetch(
          "https://blockchainari-d4489-default-rtdb.europe-west1.firebasedatabase.app/tridy/" + body.trida + "/zamereni/" + body.zamereni + "/zaci/" + body.address + "/znamky.json"
        );
        const data = await fetched.json();
        response = {...response, znamky: data}
      }
      if (body.predmety) {
        const fetched = await fetch(
          "https://blockchainari-d4489-default-rtdb.europe-west1.firebasedatabase.app/predmety.json"
        );
        const data = await fetched.json();
        response = {...response, predmety: data}
      }
      if(body.predmety_tridy){
        const fetched = await fetch(
          "https://blockchainari-d4489-default-rtdb.europe-west1.firebasedatabase.app/tridy/"+ body.value + "/predmety.json"
        );
        const data = await fetched.json();
        response = {...response, predmety_tridy: data}
      }
      if(body.ucitele){
        const fetched = await fetch(
          "https://blockchainari-d4489-default-rtdb.europe-west1.firebasedatabase.app/ucitele.json"
        );
        const data = await fetched.json();
        response = {...response, ucitele: data}
      }
      console.log(response);
      res.status(200).json(response);
    } else {
      res.status(403).json({ error: "Not authentificated", removeToken: true });
    }
  } catch (error) {
    res.status(403).json({ error: "Not authentificated", removeToken: true });
  }
}
