import db from "../config/firebase"
import firebase from 'firebase';
import { Item } from "./types";

export default {
    getFromDate: (user: firebase.User, fecha: Date): Promise<Item[]> => {
        return db.collection("users")
            .doc(user.uid)
            .collection("puchos")
            .doc(fecha.toLocaleDateString().replace(/\//g, ""))
            .collection("items")
            .get()
            .then(data => {
                if (!data.empty) {
                    const puchos = data.docs.map((p) => {
                        return { fecha: new Date(p.data().fecha.seconds * 1000) } as Item;
                    });
                    return puchos as Item[];
                }
            return [] as Item[];
            })
            .catch(() => [] as Item[])
    },

    subscribe: (user: firebase.User, callback: (items) => void) => {
        db.collection("users")
            .doc(user.uid)
            .collection("puchos")
            .doc(new Date().toLocaleDateString().replace(/\//g, ""))
            .collection("items")
            .onSnapshot((data) => callback(data));
    }
}