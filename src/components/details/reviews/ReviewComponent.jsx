
import { UserIcon, TrashIcon, PencilSquareIcon } from "@heroicons/react/16/solid";
import { formattedDate } from "../../../utils/helper.js";

export default function ReviewComponent({ review, onEdit, onDelete }) {
    const { ownerId, title, review: reviewText, rating, createdOn } = review;



    return (
        <div className="flex gap-5 p-5 rounded-2xl bg-gray-800 shadow-lg text-white mb-5">
            <div className="flex flex-col items-center gap-3">
                <div className="flex flex-col items-center gap-2">
                    <UserIcon className="text-4xl text-gray-400" />
                    <span className="text-sm font-medium text-gray-300">{ownerId}</span>
                </div>
                <div className="flex gap-1">
                    {[...Array(10)].map((_, index) => (
                        <span
                            key={index}
                            className={`text-lg ${index < rating ? "text-yellow-400" : "text-gray-600"}`}
                        >
                            ★
                        </span>
                    ))}
                </div>
            </div>

            <div className="flex-1">
                <div className="flex justify-between items-center mb-2">
                    <h3 className="text-xl font-semibold text-white">{title}</h3>
                    <span className="text-sm text-gray-400">{formattedDate(createdOn)}</span>
                </div>
                <p className="text-gray-300 mb-4 leading-relaxed">{reviewText}</p>


                <div className="flex justify-end gap-3">
                    <button
                        className="flex items-center gap-2 px-3 py-2 text-sm font-medium rounded-md bg-purple-600 hover:bg-purple-700 transition"
                        onClick={onEdit}
                    >
                        <PencilSquareIcon /> Edit
                    </button>
                    <button
                        className="flex items-center gap-2 px-3 py-2 text-sm font-medium rounded-md bg-red-600 hover:bg-red-700 transition"
                        onClick={onDelete}
                    >
                        <TrashIcon /> Delete
                    </button>
                </div>
            </div>
        </div>
    );
}
