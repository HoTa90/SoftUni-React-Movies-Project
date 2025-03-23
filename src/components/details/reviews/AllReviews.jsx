import { useEffect, useState } from "react";
import { Link, useParams } from "react-router";
import { useFetch } from "../../../hooks/useFetch.js";
import useFirestore from "../../../services/firestore.js";
import Spinner from "../../loading/Spinner.jsx";
import ReviewComponent from "./ReviewComponent.jsx";
import DetailsHeaderCard from "../DetailsHeaderCard.jsx";
import { ArrowUturnLeftIcon } from "@heroicons/react/16/solid";
import SearchReview from "./SearchReview.jsx";

export default function AllReviews() {
    const { id, type } = useParams()
    const { getDetails } = useFetch()
    const { getReviewsForMovie, dbLoading, deleteReview } = useFirestore()
    const [originalReviews, setOriginalReviews] = useState([])
    const [filteredReviews, setFilteredReviews] = useState([])
    const [searchedReviews, setSearchedReviews] = useState([])
    const [details, setDetails] = useState([])
    const [searchTerm, setSearchTerm] = useState("");
    const [filter, setFilter] = useState("default");


    useEffect(() => {
        const fetchData = async () => {
            try {

                const [movieData, reviewsData] = await Promise.all([
                    getDetails(type, id),
                    getReviewsForMovie(id)

                ])

                setDetails(movieData)
                setOriginalReviews(reviewsData)
                setSearchedReviews(reviewsData)
                setFilteredReviews(originalReviews)

            } catch (err) {

                console.log(err.message)
            }
        }
        if (type && id) {
            fetchData();
        }


    }, [type, id])

    useEffect(() => {
        applyFilter(filter)
    }, [filter, searchedReviews])

    const applyFilter = (filter) => {
        let filtered = [...searchedReviews]

        switch (filter) {
            case 'rating-asc': filtered.sort((a, b) => a.rating - b.rating);
                break;
            case 'rating-desc': filtered.sort((a, b) => b.rating - a.rating);
                break;
            default:
                break;
        }

        setFilteredReviews(filtered)

    }


    const handleSearch = (term) => {

        let searched = [...originalReviews]

        if (term) {
            searched = searched.filter((review) => {
                return (
                    review.title.toLowerCase().includes(term.toLowerCase()) ||
                    review.username.toLowerCase().includes(term.toLowerCase())
                );
            });
        }

        setSearchedReviews(searched)
        applyFilter(filter)

    };

    const onClear = () => {
        setSearchTerm('');
        setFilter('default');
        setSearchedReviews(originalReviews)
        setFilteredReviews(originalReviews)
    }

    const deleteReviewHandler = async (reviewId) => {
        try {
            await deleteReview(reviewId);

            setOriginalReviews((prev) => prev.filter((review) => review.id !== reviewId));
            setSearchedReviews((prev) => prev.filter((review) => review.id !== reviewId));
            setFilteredReviews((prev) => prev.filter((review) => review.id !== reviewId));
        } catch (err) {
            console.error("Failed to delete review:", err);
        }
    }


    return (
        <div className="pb-6">

            {dbLoading || !details ? <Spinner />
                :
                <>
                    <DetailsHeaderCard details={details} type={type} />

                    <div className="container mx-auto pb-10">
                        <div className="flex items-center justify-center mt-10">

                            <Link
                                className="hover:text-gray-400 transition mb-6"
                                to={-1}
                            >
                                <div className="tooltip tooltip-warning normal-case" data-tip={`Go Back`}>
                                    <ArrowUturnLeftIcon className="h-8 w-8" />
                                </div>
                            </Link>
                            <h2 className="text-md uppercase ml-2 text-center">
                                All Reviews For {details?.title || details?.name}
                            </h2>

                        </div>
                        <SearchReview
                            searchTerm={searchTerm}
                            setSearchTerm={setSearchTerm}
                            filter={filter}
                            setFilter={setFilter}
                            onClear={onClear}
                            onSearch={handleSearch} />
                        {filteredReviews.length > 0 ? (
                            filteredReviews.map((review) => (
                                <div
                                    key={review.id}
                                    className="p-6 mt-6 rounded-lg"
                                >
                                    <ReviewComponent review={review} onDelete={deleteReviewHandler} />
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