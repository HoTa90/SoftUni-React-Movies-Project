import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext.jsx";
import useFirestore from "../services/firestore.js";
import { useNavigate, useParams } from "react-router";
import { toast } from "react-toastify";


export default function useUserReviews() {
    const { user } = useAuth();
    const { username } = useParams();
    const [reviews, setReviews] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const { getUserReviews, deleteReview } = useFirestore();

    const navigate = useNavigate()

    useEffect(() => {
        if (user.username === username) {
            setLoading(true);
            setError(null);
            getUserReviews(user.uid)
                .then(setReviews)
                .catch((err) => setError(err.message))
                .finally(() => setLoading(false));
        } else {
            toast.info('You can only access your own reviews!')
            navigate('/404', { replace: true })
        }
    }, [user, navigate, username, getUserReviews]);

    const deleteReviewHandler = async (reviewID) => {
        try {
            setLoading(true)
            await deleteReview(reviewID);
            setReviews((prevReviews) => prevReviews.filter((review) => review.id !== reviewID));
        } catch (err) {
            console.error("Error deleting review:", err);
        } finally {
            setLoading(false)
        }
    };

    return { reviews, loading, error, deleteReviewHandler };
}