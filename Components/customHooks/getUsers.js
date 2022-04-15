import useFetch from "./useFetch";
import Randomstring from "randomstring";
export default async function getUsers(router){
    const data = await useFetch(router, { users: true });
        console.log(data);
        var resolved = [];
        for (var a in data.users) {
          if (data[a] !== "" || undefined || null) {
            let { birth, firstName, lastName, address } = data.users[a];
            resolved.unshift({
              value: address,
              birth,
              firstName,
              lastName,
              label: firstName + " " + lastName + " (" + address + ") ",
              key: Randomstring.generate(7)
            });
          }
        }
        if (resolved) {
        } else {
          resolved = [];
        }
    return resolved
}