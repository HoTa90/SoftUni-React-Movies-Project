import { useCallback, useState } from "react";
import { db } from "./firebase.js";
import { addDoc, collection, doc, getDoc, setDoc, deleteDoc, getDocs, query, where, orderBy, limit, updateDoc } from "firebase/firestore";
import { toast } from "react-toastify";


export default function useFirestore() {
    const [dbLoading, setDbLoading] = useState(false)

    const removeFromWatchlist = async (userId, dataId) => {
        setDbLoading(true)
        try {
            await deleteDoc(doc(db, 'users', userId?.toString(), 'watchlist', dataId?.toString()));
            toast.success('Successfully removed from Watchlist!')
        } catch (err) {
            console.error('Error removing from watchlist:', err);
            toast.error('Error removing from Watchlist!')
        } finally {
            setDbLoading(false)
        }
    };


    const getWatchlist = useCallback(async (userId) => {
        setDbLoading(true)
        try {
            const watchlistSnapshot = await getDocs(collection(db, 'users', userId, 'watchlist'));
            const watchListData = watchlistSnapshot.docs.map((doc) => ({ ...doc.data() }))
            return watchListData
        } catch (err) {
            console.log('Failed fetching watchlist', err.message)
        } finally {
            setDbLoading(false)
        }
    }, [])

    const checkIfInWatchlist = useCallback(async (userId, dataId) => {

        setDbLoading(true)

        if (!userId || !dataId) {
            throw new Error("userId or dataId is missing");
        }
        try {

            const docRef = doc(db, 'users', userId.toString(), 'watchlist', dataId.toString());
            const docSnapshot = await getDoc(docRef)
            return docSnapshot.exists()

        } catch (err) {
            console.log('failed to check', err)
        } finally {
            setDbLoading(false)
        }


    }, [])

    const addToWatchList = async (userId, dataId, data) => {
        setDbLoading(true)
        try {
            await setDoc(doc(db, 'users', userId, 'watchlist', dataId), data)

        } catch {
            toast.error('Failed to add to watchlist')
        } finally {
            setDbLoading(false)
        }
    }


    const addReview = async (data) => {
        setDbLoading(true)
        try {
            const docRef = await addDoc(collection(db, 'reviews'), data)
            toast.success(`Review with title "${data.title}" was created sucessfully!`)
            return { id: docRef.id, ...data };
        }
        catch  {
            toast.error('Failed to create review!')
        } finally {
            setDbLoading(false)
        }
    }

    const getReviewsForMovie = useCallback(async (movieId) => {
        setDbLoading(true)
        try {
            const reviewsRef = collection(db, 'reviews');
            const reviewsSnapshot = await getDocs(query(reviewsRef, where('detailsData.id', '==', movieId.toString())));

            const reviews = reviewsSnapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data()
            }))

            return reviews
        } catch (err) {
            console.error('Failed fetching reviews', err.message)
            return null
        } finally {
            setDbLoading(false)
        }

    }, [])

    const getUserReviews = useCallback(async (userId) => {
        setDbLoading(true)
        try {
            const reviewsRef = collection(db, 'reviews');
            const reviewsSnapshot = await getDocs(query(reviewsRef, where('ownerId', '==', userId.toString())));

            const reviews = reviewsSnapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data()
            }))

            return reviews
        } catch (err) {
            console.log('Failed fetching reviews', err.message)
            return null
        } finally {
            setDbLoading(false)
        }

    }, [])

    const getLatestReview = useCallback(async (movieId) => {
        setDbLoading(true)
        try {
            const reviewsRef = collection(db, 'reviews');
            const q = query(reviewsRef,
                where('detailsData.id', '==', movieId.toString()),
                orderBy('createdOn', 'desc'),
                limit(1),
            )

            const reviewsSnapshot = await getDocs(q)

            if (!reviewsSnapshot.empty) {
                const latestReview = { id: reviewsSnapshot.docs[0].id, ...reviewsSnapshot.docs[0].data() };
                return latestReview;
            }
            return null

        } catch (err) {
            console.log('Failed fetching the latest review', err.message)
            return null
        } finally {
            setDbLoading(false)
        }
    }, [])

    const editReview = async (reviewId, data) => {
        setDbLoading(true)
        try {
            const reviewRef = doc(db, 'reviews', reviewId);
            await updateDoc(reviewRef, {
                ...data,
                editedOn: new Date()
            });
            toast.success(`Review with title ${data.title} was updated!`)
        } catch {
            toast.error('Failed to edit the review!')
        } finally {
            setDbLoading(false)
        }
    }

    const deleteReview = async (reviewId) => {
        setDbLoading(true);
        try {
            const reviewRef = doc(db, 'reviews', reviewId);
            const reviewSnapshot = await getDoc(reviewRef);
            if (reviewSnapshot.exists()) {
                await deleteDoc(reviewRef);
                toast.success('Your review was deleted!')
            } else {
                toast.info('Review does not exist')
            }
        } catch (err) {
            console.error('Failed to delete', err);
            toast.error('Failed to delete review')
        } finally {
            setDbLoading(false);
        }
    };

    const getReviewById = useCallback(async (reviewId) => {
        setDbLoading(true)
        try {
            const reviewRef = doc(db, 'reviews', reviewId);
            const reviewSnapshot = await getDoc(reviewRef);

            if (reviewSnapshot.exists()) {
                return { id: reviewSnapshot.id, ...reviewSnapshot.data() };
            } else {
                throw new Error("No such review found!")
            }
        } catch (err) {
            console.error("Error fetching review:", err.message);
            throw err
        } finally {
            setDbLoading(false)
        }
    }, []);

    return {
        addToWatchList,
        checkIfInWatchlist,
        removeFromWatchlist,
        getWatchlist,
        addReview,
        getReviewsForMovie,
        getLatestReview,
        editReview,
        getReviewById,
        deleteReview,
        getUserReviews,
        dbLoading
    }
}