import { useState } from "react";
import './ReviewForm.css'

export default function ReviewForm({ onSubmit, initialData = { title: "", rating: 5, review: "" }, buttonText = "Submit Review" }) {
    const [formData, setFormData] = useState(initialData);

    const formChangeHandler = (e) => {
        setFormData((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));
    };

    const ratingChangeHandler = (e) => {
        setFormData((prev) => ({
            ...prev,
            rating: Number(e.target.value),
        }));
    };

    const submitHandler = (e) => {
        e.preventDefault();
        onSubmit(formData);
    };

    return (
        <form className="review-form" onSubmit={submitHandler}>
            <h2 className="form-title">{buttonText === "Submit Review" ? "Leave a Review" : "Edit Review"}</h2>

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
                <button type="submit" className="submit-button">
                    {buttonText}
                </button>
            </div>
        </form>
    );
}