var jwt = require("jsonwebtoken");
var lodash = require("lodash")
import 'dayjs/locale/cs';
export default async function handler(req, res) {
  var body = await JSON.parse(req.body);
  const secretKey = process.env.JSW_PASS;
  console.log(body);
  var date = new Date().toLocaleDateString("cs-CZ", { weekday: "short", year: 'numeric', month: 'short', day: 'numeric' }).toString()
  try {
    const token = await jwt.verify(body.Auth_token, secretKey, { maxAge: "1h" });
    console.log(token);
    var type = ""
    var method = "POST"
    if (token) {
    delete body.token
      switch (body.type) {
        case "zpravy":
          if (body) {
            type = body.prijemce.map(prij=> {
              return  "/authedUsers/"+ prij +"/zpravy"
            })
              let fetched = await fetch("https://blockchainari-d4489-default-rtdb.europe-west1.firebasedatabase.app/authedUsers.json")
              let resolved = await fetched.json()
              console.log(resolved);
              var odesilatel = {}
              for (let person in await resolved){
                if (resolved[person].address == token.address) {
                  console.log(resolved[person].address );
                  console.log( token.address);
                  odesilatel =  {firstName: person.firstName, lastName: person.lastName}
                }
              }
              body.odesilatel = odesilatel
          }
          break;
        case "znamky":
            if (body && body.predmet && body.tema && body.trida && body.vaha && body.zak && body.zamereni && body.znamka) {
                type = body.zak.map(zak => {
                  return "authedUsers/" + zak + "/zak/znamky"
                })
                method =  "POST"
                let {znamka, vaha, predmet, tema} = body
                body = {znamka, vaha, predmet, tema}
                date = new Date().toLocaleDateString("cs-CZ", { weekday: "short", month: 'short', day: 'numeric' })
            }
            break;
        case "du":
     
            if (body && body.predmet && body.datum && body.tema) {
                if (body.zak[0]) {
                  type = body.zak.map(zak => {
                    return "authedUsers/" + zak + "/zak/ukoly"
                  })
                  let {datum , tema, predmet} = body
                  
                body = {datum, tema, predmet}
                } 
                
            } else{
              
            }
            
          break;
        case "tridy":
          if (body && body.nazev && body.obor && body.zamereni && body.kod) {
              type="tridy/" + body.nazev
              method="PUT"
          }
          break;
        case "predmety":
          if (body && body.nazevPredmetu) {
            type="predmety/" + body.nazevPredmetu
            method="PUT"
          }
          break;
        case "pozice":
            console.log(body);
            if (body.selectedPosition == "Žák") {
              type = body.selectedUser.map(user => {
              
                return "tridy/" + body.selectedTrida + "/zamereni/" + body.selectedZamereni + "/zaci/" + user
              
              })
              let typeA = body.selectedUser.map(user => {
                 return "authedUsers/" + user + "/" + lodash.deburr(body.selectedPosition).toLowerCase().replace(" ", "")
              })
              type=[...type, ...typeA]
              method = "PUT"
            } else if (body.selectedPosition== "Učitel"){
              type = "ucitele/" + body.selectedUser
              let typeA = "authedUsers/" + body.selectedUser + "/ucitel"
              type = [type, typeA]
              method="PUT"
            } else if(body.selectedPosition== "Administrativní pracovník"){
              type = "pracovnici/" + body.selectedUser
              let typeA = "authedUsers/" + body.selectedUser + "/pracovnik"
              type = [type, typeA]
              method="PUT"
            } else if(body.selectedPosition== "Pracovník s personálními pravomocemi"){
              type = "pracovniciOP/" + body.selectedUser
              let typeA = "authedUsers/" + body.selectedUser + "/pracovnikOP"
              type = [type, typeA]
              method="PUT"
            } else if(body.selectedPosition== "Zástupce"){
              type = "zastupci/" + body.selectedUser
              let typeA = "authedUsers/" + body.selectedUser + "/zastupce"
              type = [type, typeA]
              method="PUT"
            } else if(body.selectedPosition== "Ředitel"){
              type = "reditel/" + body.selectedUser
              let typeA = "authedUsers/" + body.selectedUser + "/reditel"
              type = [type, typeA]
              method="PUT"
            } else if(body.selectedPosition== "Administrátor"){
              type = "administratory/" + body.selectedUser
              let typeA = "authedUsers/" + body.selectedUser + "/administrator"
              type = [type, typeA]
              method="PUT"
            } 
            //
            delete body.selectedUser
            delete body.deleteUser

          break;
        case "rozvrhy":
          
          break;
        case "zamereni":
          type="zamereni"
          method="POST"
          break;
        case "obor":
          console.log(body);
          type="obory/" + lodash.deburr(body.obor).toLowerCase().replace(" ", "")
          method="PUT"
          break;
        case "predmet":
          type="predmety/" + body.predmet
          method="PUT"
          break;
        default:
          res.status(400).json({ message: "Invalid method" });
          break;
      }
      if (type && type !== "") {
        delete body.Auth_token
        delete body.type
        
          if (!Array.isArray(type) ) {
            fetch(
              "https://blockchainari-d4489-default-rtdb.europe-west1.firebasedatabase.app/" + type + ".json",
              {
                method: method,
                body: JSON.stringify({
                  ...body,
                  od: token.address,
                  date
                }),
              }
            );
          } else{
            type.map((item)=> {
              fetch(
                "https://blockchainari-d4489-default-rtdb.europe-west1.firebasedatabase.app/" + item + ".json",
                {
                  method: method,
                  body: JSON.stringify({
                    ...body,
                    od: token.address,
                    date
                  }),
                }
              );
            })
          }
          res.status(201).json({ message: "Sucesfully added!" });
      } else{
        res.status(402).json({ message: "Invalid parameter" });
      }
    }
  } catch (error) {
    console.log(error);
    res.status(401).json({ removeToken: true });
  }
}
