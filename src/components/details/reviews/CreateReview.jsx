import { useAuth } from "../../../context/AuthContext.jsx";

import { useParams } from "react-router";
import ReviewForm from "./ReviewForm.jsx";

export default function CreateReview({ movieDetails, setLatest, onCreate }) {
    const { type, id } = useParams();
    const { user } = useAuth();

    const submitHandler = async (formData) => {
        const reviewData = {
            ownerId: user.uid,
            username: user.username,
            ...formData,
            detailsData: {
                id: id.toString(),
                type: type,
                title: movieDetails?.title || movieDetails?.name,
                poster_path: movieDetails?.poster_path,
                release_date: movieDetails?.release_date || movieDetails?.first_air_date,
                original_language: movieDetails?.original_language,
                vote_average: movieDetails?.vote_average,
                backdrop_path: movieDetails?.backdrop_path,
                overview: movieDetails?.overview,
                runtime: movieDetails?.runtime || movieDetails?.last_episode_to_air?.runtime

            },
            createdOn: new Date(),
            editedOn: null
        };


        try {
            const latestReview = await onCreate(reviewData);
            console.log("Successfully added review");
            setLatest(latestReview)
        } catch (err) {
            console.log(err.message);
        }
    };

    return (
        <ReviewForm
            onSubmit={submitHandler}
            buttonText="Submit Review"
        />
    );
}