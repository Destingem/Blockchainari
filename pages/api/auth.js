require("dotenv").config();
const secretKey = process.env.JSW_PASS;
console.log("Secret: " + secretKey);
var jwt = require("jsonwebtoken");
import Randomstring from "randomstring";
import { ethers } from "ethers";
export default async function handler(req, res) {
  const body = JSON.parse(req.body);
  if (body.request == "Generate_nonce") {
    const randomstring = Randomstring.generate(9);
    fetch(
      "https://blockchainari-d4489-default-rtdb.europe-west1.firebasedatabase.app/users/" +
        body.account +
        ".json",
      {
        method: "PUT",
        body: JSON.stringify({ wallet: body.account, nonce: randomstring }),
      }
    );
    res.status(200).json({ nonce: randomstring });
  } else if (body.request == "Verify_me") {
    const address = body.address.toLowerCase();
    const noncefromDB = await fetch(
      "https://blockchainari-d4489-default-rtdb.europe-west1.firebasedatabase.app/users/" +
        address +
        ".json"
    );
    var resolvedNonceDB = await noncefromDB.json();
    const signerAddr = await ethers.utils.verifyMessage(
      resolvedNonceDB.nonce,
      body.signature
    );
    if (signerAddr.toLowerCase() == resolvedNonceDB.wallet) {
      var token = jwt.sign({ address: address, allowLogin: false }, secretKey, {
        expiresIn: "1h",
      });
      res.status(200).json({ token, address });
    } else {
      res.status(401).json({ message: "Adress dismatch" });
    }
  } else if (body.request == "Get_Auth_Token") {
    if (body.token) {
      console.log("A");
      try{
        var Vertoken = jwt.verify(body.token, secretKey, { maxAge: "1h" });
      } catch(error){
        res.status(401).json({message: error, removeToken:true})
      }
      const token = jwt.sign(
        { address: Vertoken.address, allowLogin: true },
        secretKey,
        { expiresIn: "1h" }
      );
      if (Vertoken) {
        const getInfo = await fetch(
          "https://blockchainari-d4489-default-rtdb.europe-west1.firebasedatabase.app/authedUsers/" +
            Vertoken.address +
            ".json"
        );
        const resolvedInfo = await getInfo.json();
        if (
          resolvedInfo &&
          resolvedInfo.firstName &&
          resolvedInfo.lastName &&
          resolvedInfo.birth
        ) {
          res
            .status(200)
            .json({
              token,
              address: Vertoken.address,
              firstName: resolvedInfo.firstName,
              lastName: resolvedInfo.lastName,
              birth: resolvedInfo.birth,
            });
        } else if (body.firstName && body.lastName && body.birth) {
          const postInfo = await fetch(
            "https://blockchainari-d4489-default-rtdb.europe-west1.firebasedatabase.app/authedUsers/" +
              Vertoken.address +
              ".json",
            {
              method: "PUT",
              body: JSON.stringify({
                firstName: body.firstName,
                lastName: body.lastName,
                birth: body.birth,
                address: Vertoken.address
              }),
            }
          );
          if (postInfo.ok) {
            res
              .status(200)
              .json({
                token,
                adress: Vertoken.address,
                firstName: body.firstName,
                lastName: body.lastName,
                birth: body.birth,
              });
          } else {
            console.log(postInfo);
            res
              .status(500)
              .json({
                message: "Problem on serverside with DB, try again later",
              });
          }
        } else {
          console.log(body);
          res.status(400).json({ message: "Please provide info" });
        }
      } else {
        res.status(401).json({ message: "Invalid Token" });
      }
    } else{
      res.status(400).json({message: "No body"})
    }
  } else if (body.request == "Get_User_Info") {
    console.log("B");
    const Vertoken = jwt.verify(body.token, secretKey, { maxAge: "1h" });
    if (Vertoken) {
      const getInfo = await fetch(
        "https://blockchainari-d4489-default-rtdb.europe-west1.firebasedatabase.app/authedUsers/" +
          Vertoken.address +
          ".json"
      );
      const resolvedInfo = await getInfo.json();
      if (
        resolvedInfo &&
        resolvedInfo.firstName &&
        resolvedInfo.lastName &&
        resolvedInfo.birth
      ) {
        res
          .status(200)
          .json({
            address: Vertoken.address,
            firstName: resolvedInfo.firstName,
            lastName: resolvedInfo.lastName,
            birth: resolvedInfo.birth,
          });
      } else{
        res.status(401).json({ message: "User is not in DB" });
      }
    } else {
      res.status(401).json({ message: "Invalid Token" });
    }
  }
}
/* if (resolvedNonceDB.firstName && resolvedNonceDB.lastName && resolvedNonceDB.birth) {
            res.status(200).json({ token, address, firstName: resolvedNonceDB.firstName, lastName: resolvedNonceDB.lastName, birth: resolvedNonceDB.birth })
        } else if(body.firstName && body.lastName && body.birth){
            const postInfo = await fetch("https://blockchainari-d4489-default-rtdb.europe-west1.firebasedatabase.app/users/" + address + ".json", {
                method: "PUT",
                body: JSON.stringify({firstName :body.firstName, lastName: body.lastName, birth: body.birth})
            })
            if (1 == 1) {
                res.status(200).json({ token, address, firstName: resolvedNonceDB.firstName, lastName: resolvedNonceDB.lastName, birth: resolvedNonceDB.birth })
            } */
