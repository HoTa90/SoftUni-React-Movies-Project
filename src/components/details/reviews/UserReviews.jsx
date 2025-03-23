import useUserReviews from "../../../hooks/useUserReviews.js";
import ReviewComponent from "./ReviewComponent.jsx";
import HeroCard from "../../HeroCard.jsx";
import Spinner from "../../loading/Spinner.jsx";

export default function UserReviews() {
    const { reviews, deleteReviewHandler, loading, error } = useUserReviews();

    const groupedReviews = reviews.reduce((acc, review) => {
        const mediaId = review.detailsData.id; // Unique ID for movie or TV show
        const type = review.detailsData.type; // 'movie' or 'tv'
        if (!acc[mediaId]) {
            acc[mediaId] = {
                media: review.detailsData, // Store movie or TV show details
                type: type, // Store the type ('movie' or 'tv')
                reviews: [],
            };
        }
        acc[mediaId].reviews.push(review);
        return acc;
    }, {});

    return (
        <section className="px-20 py-15">
            <h2 className="text-white text-2xl font-bold mb-8">My Reviews</h2>
            {loading ? (
                <Spinner />
            ) : error ? (
                <p className="text-red-500">{error}</p>
            ) : reviews.length > 0 ? (
                <div>
                    {Object.values(groupedReviews).map((group) => (
                        <div key={group.media.id} className="flex mb-8">
                            <div className="w-64 pr-8 flex-shrink-0">
                                <HeroCard
                                    data={group.media}
                                    type={group.type}
                                    isUserReviews={true}
                                />
                            </div>

                            <div className="flex-1 overflow-x-auto">
                                <div className="flex space-x-8 pl-8"> 
                                    {group.reviews.map((review) => (
                                        <div key={review.id} className="flex-shrink-0 w-96">
                                            <ReviewComponent
                                                review={review}
                                                onDelete={deleteReviewHandler}
                                                isUserReviews={true}
                                            />
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <h3 className="text-gray-400 text-lg italic mb-8">You haven't created any reviews yet!</h3>
            )}
        </section>
    );
}