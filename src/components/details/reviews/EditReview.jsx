import { useEffect, useState } from "react";
import { useParams, useNavigate, Navigate } from "react-router";
import useFirestore from "../../../services/firestore.js";
import ReviewForm from "./ReviewForm.jsx";
import Spinner from "../../loading/Spinner.jsx";
import DetailsHeaderCard from "../DetailsHeaderCard.jsx";
import { useAuth } from "../../../context/AuthContext.jsx";
import { isValidType } from "../../../utils/helper.js";
import { toast } from "react-toastify";

export default function EditReview() {
    const { reviewId, type } = useParams();
    const { user } = useAuth();
    const navigate = useNavigate();
    const { getReviewById, editReview, dbLoading } = useFirestore();
    const [review, setReview] = useState(null);
    const [details, setDetails] = useState([])

    useEffect(() => {

        if (!isValidType(type)) {
            toast.info("Invalid URL!");
            navigate('/404', { replace: true });
            return; 
        }

        const fetchAndValidateReview = async () => {
            try {
                const reviewData = await getReviewById(reviewId);
                

                if (user.uid !== reviewData.ownerId) {
                    toast.info("You can only edit your own reviews!");
                    navigate('/', { replace: true });
                    return;
                }

                setReview(reviewData);
                setDetails(reviewData.detailsData);
            } catch (err) {
                console.error("Error fetching review:", err.message);
                if (err.message === 'No such review found!') {
                   toast.error(err.message)
                    navigate('/404', { replace: true });
                }
            }
        };

        fetchAndValidateReview();
    }, [reviewId, type, user, navigate, getReviewById]);

    const submitHandler = async (formData) => {
        await editReview(reviewId, {
            ...formData,
            editedOn: new Date(),
        });
        navigate(-1);
    };

    if (!review) {
        return <Spinner />;
    }

    return (
        <div className="pb-10">
            <DetailsHeaderCard details={details} type={type} />
            {dbLoading ?
                <div className="mt-5">
                    <Spinner />
                </div>
                :
                <ReviewForm
                    onSubmit={submitHandler}
                    initialData={{
                        title: review.title,
                        rating: review.rating,
                        review: review.review,
                    }}
                    buttonText="Save Changes"
                />
            }

        </div>
    );
}