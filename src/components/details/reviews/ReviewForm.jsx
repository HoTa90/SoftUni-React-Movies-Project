
import { useState } from "react";
import "./ReviewForm.css";
import { useAuth } from "../../../context/AuthContext.jsx";
import useFirestore from "../../../services/firestore.js";

export default function ReviewForm({ movieData }) {
    const [formData, setFormData] = useState({ title: '', rating: 5, review: '' })
    const { user } = useAuth()
    const {addReview} = useFirestore()

    const formChangeHandler = (e) => {
        setFormData((prev) => ({
            ...prev,
            [e.target.name]: e.target.value
        }))
    }

    const ratingChangeHandler = (e) => {
        setFormData((prev) => ({
            ...prev,
            rating: Number(e.target.value)
        }))
    }

    const submitHandler = async (e) => {
        e.preventDefault();

        const reviewData = {
            movieId: movieData.id,
            userId: user.uid,
            ...formData

        }
        try{
            await addReview(reviewData)
            console.log('Sucessfully added reiview')
            setFormData({ title: '', rating: 5, review: '' })


        } catch (err){
            console.log(err.message)
        }
         
    }


    return (
        <form className="review-form" onSubmit={submitHandler}>
            <h2 className="form-title">Leave a Review</h2>

            <div className="form-group">
                <label htmlFor="review-title" className="form-label">
                    Title
                </label>
                <input
                    type="text"
                    id="review-title"
                    name="title"
                    className="form-input"
                    placeholder="Enter review title"
                    value={formData.title}
                    onChange={formChangeHandler}
                />
            </div>

            <div className="form-group">
                <label className="form-label">Rating</label>
                <div className="rating">
                    {[...Array(10)].map((_, index) => {
                        const value = index + 1;
                        return (
                            <input
                                key={value}
                                type="radio"
                                name="rating"
                                value={value}
                                className="mask mask-star-2 bg-orange-400"
                                aria-label={`${value} star`}
                                checked={formData.rating === value}
                                onChange={ratingChangeHandler}
                            />
                        );
                    })}
                </div>
            </div>

            <div className="form-group">
                <label htmlFor="review-text" className="form-label">
                    Review
                </label>
                <textarea
                    id="review-text"
                    name="review"
                    className="form-textarea"
                    placeholder="Write your review here..."
                    rows="5"
                    value={formData.review}
                    onChange={formChangeHandler}
                ></textarea>
            </div>

            <div className="button-container">
                <button type="submit" className="submit-button">Submit Review</button>
            </div>
        </form>
    );
};
