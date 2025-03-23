import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext.jsx";
import useFirestore from "../services/firestore.js";


export default function useUserReviews() {
    const { user } = useAuth();
    const [reviews, setReviews] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const { getUserReviews, deleteReview } = useFirestore();

    useEffect(() => {
        if (user) {
            setLoading(true);
            setError(null);
            getUserReviews(user.uid)
                .then(setReviews)
                .catch((err) => setError(err.message))
                .finally(() => setLoading(false));
        }
    }, [user]);

    const deleteReviewHandler = async (reviewID) => {
        try {
            setLoading(true)
            await deleteReview(reviewID);
            setReviews((prevReviews) => prevReviews.filter((review) => review.id !== reviewID));
        } catch (err) {
            console.error("Error deleting review:", err);
        } finally{
            setLoading(false)
        }
    };

    return { reviews, loading, error, deleteReviewHandler };
}