export default function DeleteModal({ isOpen, onConfirm, onCancel, reviewTitle }) {
    if (!isOpen){
        
        return null;
    } 

    return (
        <dialog onClick={onCancel} open className="modal">
            <div className="modal-box">
                <form method="dialog" className="absolute top-2 right-2">
                    <button onClick={onCancel} className="btn btn-sm btn-circle">
                        ✕
                    </button>
                </form>

                <p className="py-4">Are you sure you want to delete "{reviewTitle}" review?</p>

                <div className="modal-action">
                    <form method="dialog" className="flex gap-2">
                        <button onClick={onConfirm} className="btn btn-error">
                            Delete
                        </button>
                        <button onClick={onCancel} className="btn">
                            Cancel
                        </button>
                    </form>
                </div>
            </div>
        </dialog>
    );
}