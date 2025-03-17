import { db } from "./firebase.js";
import { addDoc, collection, doc, setDoc } from "firebase/firestore";


export default function useFirestore() {

    const addDocument = async (collectionName, data) => {
        const docRef = await addDoc(collection(db, collectionName), data);
        console.log('Document written with id', docRef.id)
    }

    const addToWatchList = async (userId, dataId, data) => {
        try {
            await setDoc(doc(db, 'users', userId, 'watchlist', dataId), data)
            console.log('Successfully added to watchlsit')

        } catch (err) {
            console.log(err, 'Error adding to Watchlist')
        }
    }

    return {
        addDocument,
        addToWatchList
    }
}