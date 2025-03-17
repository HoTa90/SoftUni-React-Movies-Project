import { db } from "./firebase.js";
import { addDoc, collection, doc, getDoc, setDoc, deleteDoc } from "firebase/firestore";


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

    const checkIfInWatchlist = async (userId, dataId) => {

        console.log("userId:", userId, "dataId:", dataId);

        if (!userId || !dataId) {
            throw new Error("userId or dataId is missing");
        }

        const docRef = doc(db, 'users', userId.toString(), 'watchlist', dataId.toString());
        const docSnapshot = await getDoc(docRef)
        return docSnapshot.exists()
    }

    const removeFromWatchlist = async (userId, dataId) => {
        try {
            await deleteDoc(doc(db, 'users', userId?.toString(), 'watchlist', dataId?.toString()));
            console.log('Successfully removed from watchlist');
        } catch (err) {
            console.error('Error removing from watchlist:', err);
        }
    };

    return {
        addDocument,
        addToWatchList,
        checkIfInWatchlist,
        removeFromWatchlist
    }
}