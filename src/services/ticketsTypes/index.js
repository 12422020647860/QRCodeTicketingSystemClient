import firebaseDb from "../../lib/firebaseDb";
import {
  collection,
  doc,
  getDocs,
  getDoc,
  addDoc,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";

export const getAll = () =>
  getDocs(collection(firebaseDb, "tickets-types")).then((snapshot) =>
    snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
  );

export const get = (id) =>
  getDoc(doc(firebaseDb, "tickets-types", id)).then((snapshot) => ({
    id: snapshot.id,
    ...snapshot.data(),
  }));

export const add = ({ price, stations }) =>
  addDoc(collection(firebaseDb, "tickets-types"), {
    price: price,
    stations: stations,
  });

export const update = (id, { price, stations }) =>
  updateDoc(doc(firebaseDb, "tickets-types", id), {
    price: price,
    stations: stations,
  });

export const remove = (id) => deleteDoc(doc(firebaseDb, "tickets-types", id));
