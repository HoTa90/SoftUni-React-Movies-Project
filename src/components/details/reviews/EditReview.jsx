import { useEffect, useState } from "react";
import { useParams, useNavigate, Navigate, replace } from "react-router";
import useFirestore from "../../../services/firestore.js";
import ReviewForm from "./ReviewForm.jsx";
import Spinner from "../../loading/Spinner.jsx";
import DetailsHeaderCard from "../DetailsHeaderCard.jsx";
import { useAuth } from "../../../context/AuthContext.jsx";
import { isValidType } from "../../../utils/helper.js";

export default function EditReview() {
    const { reviewId, type } = useParams();
    const { user } = useAuth();
    const navigate = useNavigate();
    const { getReviewById, editReview, dbLoading } = useFirestore();
    const [review, setReview] = useState(null);
    const [details, setDetails] = useState([])

    useEffect(() => {
        const fetchReview = async () => {
            try {

                const reviewData = await getReviewById(reviewId);
                setReview(reviewData);
                setDetails(reviewData.detailsData)
            }
            catch (err) {
                console.log(err.message)
                if (err.message === 'No such review found!') {
                    navigate('404', { replace: true })
                }
            }
        };
        fetchReview();
    }, [reviewId]);

    const submitHandler = async (formData) => {
        await editReview(reviewId, {
            ...formData,
            editedOn: new Date(),
        });
        navigate(-1);
    };

    if (!review) {
        return <Spinner />
    }

    const isOwner = user.uid === review.ownerId;

    if (!isOwner) {
        return <Navigate to='/' />
    }

    if (!isValidType(type)) {
        return <Navigate to={'/404'} replace />
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