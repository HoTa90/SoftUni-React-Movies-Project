export default function Pagination({ currentPage, onPageChange, hasNextPage }) {
    
    console.log(hasNextPage)
   
    return (
        <div className="join">
            <button className="join-item btn"
                onClick={() => onPageChange(currentPage - 1)}
                disabled={currentPage === 1}
            >
                Previous
            </button>
            <button className="join-item btn">{currentPage}</button>
            <button
                className="join-item btn"
                onClick={() => onPageChange(currentPage + 1)}
                disabled={!hasNextPage}
            >
                Next
            </button>

        </div>
    );
}