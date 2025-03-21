import { db } from "./firebase.js";
import { addDoc, collection, doc, getDoc, setDoc, deleteDoc, getDocs, query, where, query, orderBy, limit } from "firebase/firestore";


export default function useFirestore() {

    const addDocument = async (collectionName, data) => {
        const docRef = await addDoc(collection(db, collectionName), data);
        console.log('Document written with id', docRef.id)
    }




    const removeFromWatchlist = async (userId, dataId) => {
        try {
            await deleteDoc(doc(db, 'users', userId?.toString(), 'watchlist', dataId?.toString()));
            console.log('Successfully removed from watchlist');
        } catch (err) {
            console.error('Error removing from watchlist:', err);
        }
    };


    const getWatchlist = async (userId) => {

        try {
            const watchlistSnapshot = await getDocs(collection(db, 'users', userId, 'watchlist'));
            const watchListData = watchlistSnapshot.docs.map((doc) => ({ ...doc.data() }))
            return watchListData
        } catch (err) {
            console.log('Failed fetching watchlist', err.message)
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

    const addToWatchList = async (userId, dataId, data) => {
        try {
            await setDoc(doc(db, 'users', userId, 'watchlist', dataId), data)
            console.log('Successfully added to watchlsit')

        } catch (err) {
            console.log(err, 'Error adding to Watchlist')
        }
    }


    const addReview = async (data) => {

        try {
            const docRef = await addDoc(collection(db, 'reviews'), data)
            console.log('Sucessfully added to reviews', docRef.id)
        }
        catch (err) {
            console.log(err, 'Error creating a review')
        }
    }

    const getReviewsForMovie = async (movieId) => {

        try {
            const reviewsRef = collection(db, 'reviews');
            const reviewsSnapshot = await getDocs(query(reviewsRef, where('movieId', '==', movieId)));

            const reviews = reviewsSnapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data()
            }))

            return reviews
        } catch (err) {
            console.log('Failed fetching reviews', err.message)
            return null
        }

    }

    const getLatestReview = async (movieId) => {
        try {
            const reviewsRef = collection(db, 'reviews');
            const query = query(reviewsRef,
                where('movieId', '==', movieId),
                orderBy('createdOn', 'desc'),
                limit(1)
            )

            const reviewsSnapshot = await getDocs(query)

            if (!reviewsSnapshot.empty) {
                return {id: reviewsSnapshot.docs[0].id, ...reviewsSnapshot.docs[0].data() }
            }
            return null

        } catch (err) {
            console.log('Failed fetching the latest review', err.message)
            return null
        }
    }

    return {
        addDocument,
        addToWatchList,
        checkIfInWatchlist,
        removeFromWatchlist,
        getWatchlist,
        addReview,
        getReviewsForMovie,
    }
}