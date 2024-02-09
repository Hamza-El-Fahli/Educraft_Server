import { query, collection , where, getDocs } from "firebase/firestore";
import { db } from "./firestore.js";


const docRef = query(collection(db,'utilisateurs'));
const querySnapshot = await getDocs(docRef);

try{
  querySnapshot.forEach((doc) => {
    console.log(doc.id, " => ", doc.data());
  });
} catch(e) {

    console.log("No such document! ",e);
}