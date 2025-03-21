import { useEffect, useState } from "react";
import { Link, useParams } from "react-router";
import { useFetch } from "../../../hooks/useFetch.js";
import useFirestore from "../../../services/firestore.js";
import Spinner from "../../loading/Spinner.jsx";
import ReviewComponent from "./ReviewComponent.jsx";
import DetailsHeaderCard from "../DetailsHeaderCard.jsx";
import { ArrowUturnLeftIcon } from "@heroicons/react/16/solid";

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
                    <div className="container mx-auto pb-10">
                        <div className="flex items-center justify-center mt-10">
                            <Link
                                className="hover:text-gray-400 transition mb-6"
                                to={-1}
                            >
                                <ArrowUturnLeftIcon className="h-8 w-8" />
                            </Link>
                            <h2 className="text-md uppercase ml-2 text-center">
                                All Reviews For {details?.title || details?.name}
                            </h2>
                        </div>
                        {reviews.length > 0 ? (
                            reviews.map((review) => (
                                <div
                                    key={review.id}
                                    className="p-6 mt-6 rounded-lg"
                                >
                                    <ReviewComponent review={review} />
                                </div>
                            ))
                        ) : (
                            <p className="text-gray-300 text-center">
                                No reviews yet.
                            </p>
                        )}
                    </div>
                </>}

        </div>
    );
}