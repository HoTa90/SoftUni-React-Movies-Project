import { useEffect, useState } from "react";
import { Link, useParams } from "react-router";
import { useFetch } from "../../../hooks/useFetch.js";
import useFirestore from "../../../services/firestore.js";
import Spinner from "../../loading/Spinner.jsx";
import ReviewComponent from "./ReviewComponent.jsx";
import DetailsHeaderCard from "../DetailsHeaderCard.jsx";

export default function AllReviews() {
    const { id, type } = useParams()
    const { getDetails } = useFetch()
    const { getReviewsForMovie } = useFirestore()
    const [reviews, setReviews] = useState([])
    const [details, setDetails] = useState([])
    const [loading, setIsloading] = useState(true)

    useEffect(() => {
        const fetchData = async () => {
            setIsloading(true)
            try {

                const [movieData, reviewsData] = await Promise.all([
                    getDetails(type, id),
                    getReviewsForMovie(id)

                ])

                setDetails(movieData)
                setReviews(reviewsData)

            } catch (err) {

                console.log(err.message)
            } finally {
                setIsloading(false)
            }
        }

        fetchData();
    }, [type, id])


    return (
        <div className="pb-6">

            {loading ? <Spinner />
                :
                <>
                    <DetailsHeaderCard details={details} type={type} />
                    <div className="container mx-auto px-4 pb-10">
                        <h2 className="text-md uppercase mt-10 text-center">
                            <Link to={-1}>{'< '}</Link>
                            All Reviews For {details?.title || details?.name}</h2>
                        {reviews.length > 0 ? (reviews.map(review => (
                            <div key={review.id} className="p-6 mt-6 rounded-lg ">
                                <ReviewComponent review={review} />

                            </div>
                        )))
                            :
                            <p className="text-gray-300 text-center">
                                No reviews yet.</p>
                        }
                    </div>
                </>}

        </div>
    );
}