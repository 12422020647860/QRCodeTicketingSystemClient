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
  getDocs(collection(firebaseDb, "transactions")).then((snapshot) =>
    snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
  );

export const get = (id) =>
  getDoc(doc(firebaseDb, "transactions", id)).then((snapshot) => ({
    id: snapshot.id,
    ...snapshot.data(),
  }));

export const add = ({ cardId, uId, amount }) =>
  addDoc(collection(firebaseDb, "transactions"), {
    card: doc(firebaseDb, "cards", cardId),
    charger: uId,
    chargerType: "user",
    paymentMethod: "bank card",
    amount: amount,
    date: new Date().getTime(),
  })
    .then((ref) => getDoc(ref))
    .then((doc) => ({ id: doc.id, ...doc.data() }));

export const update = (id, { cardId, uId, amount }) =>
  updateDoc(doc(firebaseDb, "transactions", id), {
    card: doc(firebaseDb, "cards", cardId),
    charger: uId,
    chargerType: "user",
    paymentMethod: "bank card",
    amount: amount,
    date: new Date().getTime(),
  });

export const remove = (id) => deleteDoc(doc(firebaseDb, "transactions", id));
