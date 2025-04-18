import { TrashIcon, PencilSquareIcon } from "@heroicons/react/16/solid";
import { Link } from "react-router";
import { formattedDate } from "../../../utils/helper.js";
import { useAuth } from "../../../context/AuthContext.jsx";
import DeleteModal from "./DeleteModal.jsx";
import { useState } from "react";

export default function ReviewComponent({ review, onDelete, isUserReviews }) {
    const { user } = useAuth();
    const [isOpen, setIsOpen] = useState(false);

    const handleDeleteClick = () => {
        setIsOpen(true);
    };

    const handleConfirmDelete = async () => {
        try {
            await onDelete(review.id);
        } catch (err) {
            console.log("Error deleting this review", err);
        }
        setIsOpen(false);
    };

    const handleCancelClick = () => {
        setIsOpen(false);
    };

    const isOwner = user?.uid === review.ownerId;

    return (
        <div
            className={`p-5 rounded-2xl bg-[#2c2c2c] shadow-lg text-white ${
                isUserReviews ? "w-97 h-97 flex flex-col" : "max-w-[600px] mx-auto"
            }`} 
        >
            <div className="flex justify-between items-center mb-4">
                <div className="flex items-center gap-1">
                    <span className="text-yellow-400">{review.rating}/10</span>
                    <span className="text-lg text-yellow-400">★</span>
                </div>
                <div className="text-sm text-gray-300">
                    {review.editedOn ? (
                        <span>Edited on: {formattedDate(review.editedOn)}</span>
                    ) : (
                        <span>Created on: {formattedDate(review.createdOn)}</span>
                    )}
                </div>
            </div>

            <div className="text-sm text-gray-300 mb-4">
                From: <span className="font-medium text-gray-200">{review.username}</span>
            </div>

            <div className="text-lg text-gray-300 mb-4">
                Title: <span className="font-semibold text-gray-200">{review.title}</span>
            </div>

            <div
                className={`border border-gray-600 rounded-lg p-4 mb-4 ${
                    isUserReviews ? "overflow-y-auto flex-grow" : ""
                }`} // Conditional scrollable area
            >
                <p className="text-gray-300 whitespace-normal break-words">
                    {review.review}
                </p>
            </div>

            {isOwner && (
                <div className="flex justify-end">
                    <Link to={`/${review.detailsData.type}/${review.detailsData.id}/edit/${review.id}`}>
                        <button className="text-gray-400 hover:text-yellow-400 transition cursor-pointer px-5 py-2">
                            <PencilSquareIcon className="h-5 w-5" />
                        </button>
                    </Link>
                    <button
                        onClick={handleDeleteClick}
                        className="text-gray-400 hover:text-red-500 transition cursor-pointer"
                    >
                        <TrashIcon className="h-5 w-5" />
                    </button>
                </div>
            )}

            <DeleteModal
                isOpen={isOpen}
                onConfirm={handleConfirmDelete}
                onCancel={handleCancelClick}
                reviewTitle={review.title}
            />
        </div>
    );
}