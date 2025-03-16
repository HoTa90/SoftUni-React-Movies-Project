import { useEffect, useState } from "react";
import Video from "./Video.jsx";
import Spinner from "../../loading/Spinner.jsx";

export default function VideoGallery({ video, videos, loading }) {
  const [selectedVideoKey, setSelectedVideoKey] = useState(video?.key);

  
  
  const changeSelectedVideo = (key) => {
    setSelectedVideoKey(key);
  };



  if (loading) {
    return <Spinner />;
  }


  return (
    <div>
      <h2 className="text-md uppercase mt-10 mb-5">Videos</h2>

  
      { selectedVideoKey ? (
        <Video id={selectedVideoKey} />
      ) : (
        <p className="text-l text-gray-300 mt-3">No trailer available</p>
      )}

   
      {videos?.length > 0 ? (
        <div className="flex mt-5 mb-10 overflow-x-scroll gap-5">
          {videos.map((v) => (
            <div
              key={v?.id}
              className="min-w-[290px] cursor-pointer"
              onClick={() => changeSelectedVideo(v?.key)}
            >
              <Video id={v?.key} small />
              <p className="text-sm font-bold mt-2 line-clamp-2">{v?.name}</p>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-l text-gray-300 mt-3">No more available videos</p>
      )}
    </div>
  );
}