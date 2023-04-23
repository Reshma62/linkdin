import { getDatabase, ref, onValue } from "firebase/database";
import { auth } from "../firebase.confige";
const db = getDatabase();
export function getCurrentUser(data, setCurrentUser) {
  const usersRef = ref(db, "users/");
  onValue(usersRef, (snapshot) => {
    let arr = [];
    snapshot.forEach((item) => {
      if (data.uid == item.val().userId) {
        arr.push(item.val());
      }
    });
    setCurrentUser(arr[0]);
  });
}
export function getLoginUser(setLoginUser) {
  const usersRef = ref(db, "users/");
  onValue(usersRef, (snapshot) => {
    let arr = [];
    snapshot.forEach((item) => {
      arr.push({...item.val()});
    });
    setLoginUser(arr);
  });
}
