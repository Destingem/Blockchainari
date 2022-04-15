var jwt = require("jsonwebtoken");
var lodash = require("lodash")
export default async function handler(req, res) {
  var body = await JSON.parse(req.body);
  const secretKey = process.env.JSW_PASS;
  console.log(body);
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
            }
            break;
        case "du":
     
            if (body && body.odData && body.doData && body.tema) {
                if (body.zak[0]) {
                  type = body.zak.map(zak => {
                    return "tridy/" + body.trida + "/zamereni/" + body.zamereni + "/" + zak + "/ukoly"
                  })
                  let {odData, doData, tema} = body
                body = {odData, doData, tema}
                } 
                else if(body.zamereni){
                 
                  type = "tridy/" + body.trida + "/zamereni/" + body.zamereni + "/ukoly"
                  let {odData, doData, tema} = body
                  body = {odData, doData, tema}
                } 
                else if(body.trida && body.trida !== ""){
                  type = "tridy/" + body.trida + "/ukoly"
                  let {odData, doData, tema} = body
                  body = {odData, doData, tema}
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
          if (body && body.nazev) {
            type="predmet/" + body.nazev
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
            }
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
                  date: Date().toLocaleString("cs-CZ").toString().slice(0, 24),
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
                    date: Date().toLocaleString("cs-CZ").toString().slice(0, 24),
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
