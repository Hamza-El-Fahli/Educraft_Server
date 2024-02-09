const { query, collection, where, getDocs } = require('firebase/firestore');
const db = require('./firestore.js');

// const docRef = query(collection(db, 'utilisateurs'));

// // You can't use `await` outside of an async function, so wrap your code in an async function
// (async () => {
//   try {
//     const querySnapshot = await getDocs(docRef);

//     querySnapshot.forEach((doc) => {
//       console.log(doc.id, " => ", doc.data());
//     });
//   } catch (e) {
//     console.log("No such document! ", e);
//   }
// })();

const getUsers = async ()=>{
  const docRef = query(collection(db, 'utilisateurs'));
  const querySnapshot = await getDocs(docRef);
  let users = []
  querySnapshot.forEach((doc) =>{users.push([doc.id,doc.data()])})
  return users
}


const getIntructors = async ()=>{
  const docRef = query(collection(db, 'instructor'));
  const querySnapshot = await getDocs(docRef);
  let instructors = []
  querySnapshot.forEach((doc) =>{instructors.push([doc.id,doc.data()])})
  return instructors
}



const getCourses = async (instructor = null)=>{
  const docRef = instructor === null ? query(collection(db, 'courses')) :  query(collection(db, 'courses'),where('instructor_id','==',1));
  const querySnapshot = await getDocs(docRef);
  let courses = []
  querySnapshot.forEach((doc) =>{courses.push([doc.id,doc.data()])})
  return courses
}

module.exports ={ getUsers , getCourses }