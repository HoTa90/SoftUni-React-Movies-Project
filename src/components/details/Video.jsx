export default function Video({ id, small }) {

    return (
        <iframe
            className={`w-full ${small ? "h-[150px]" : "h-[700px]"}`}
            src={`https://www.youtube.com/embed/${id}`}
            title="YouTube video player"
            allowFullScreen
        ></iframe>
    );
};
