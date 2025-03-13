export default function Video({ id, small, onClick }) {
    return (
      <div
        onClick={onClick}
        className={`relative ${small ? "cursor-pointer rounded-lg overflow-hidden" : ""}`}
      >
        <iframe
          className={`w-full ${small ? "h-[150px] pointer-events-none" : "h-[700px] rounded-lg"}`}
          src={`https://www.youtube.com/embed/${id}`}
          title="YouTube video player"
          allowFullScreen
        ></iframe>
        {/* Disable clicking on the small videos */}
        {small && (
          <div className="absolute inset-0 bg-transparent"></div>
        )}
      </div>
    );
  }