import firebaseDb from "../../lib/firebaseDb";
import {
  collection,
  doc,
  getDocs,
  getDoc,
  addDoc,
  updateDoc,
  deleteDoc,
  query,
  where,
} from "firebase/firestore";

export const getAll = () =>
  getDocs(collection(firebaseDb, "cards")).then((snapshot) =>
    snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
  );

export const get = (uid) =>
  getDocs(query(collection(firebaseDb, "cards"), where("user-uid", "==", uid)))
    .then((snapshot) =>
      snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
    )
    .then((cards) => (cards.length ? cards[0] : undefined));

export const add = ({ uid }) =>
  addDoc(collection(firebaseDb, "cards"), {
    "user-uid": uid,
    balance: 0,
  })
    .then((ref) => getDoc(ref))
    .then((doc) => ({ id: doc.id, ...doc.data() }));

export const update = (id, { balance }) =>
  updateDoc(doc(firebaseDb, "cards", id), {
    balance: balance,
  })
    .then(() => getDoc(doc(firebaseDb, "cards", id)))
    .then((doc) => ({ id: doc.id, ...doc.data() }));

export const remove = (id) => deleteDoc(doc(firebaseDb, "cards", id));
