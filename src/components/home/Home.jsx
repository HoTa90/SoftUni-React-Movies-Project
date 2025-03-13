import { useEffect, useState } from "react";
import HeaderSection from "./HeaderSection.jsx";
import PopularSection from "./PopularSection.jsx";
import { fetchDetails, fetchTrending } from "../../api/movieService.js";
import Skeleton from "../loading/Skeleton.jsx";


export default function Home() {
   const [headerMovie, setHeaderMovie] = useState({})
   const [errorMessage, setErrorMessage] = useState('');
   const [movieList, setMovielist] = useState([]);
   const [seriesList, setSeriesList] = useState([]);
   const [peopleList, setPeopleList] = useState([]);
   const [isLoading, setIsloading] = useState(false);;




   useEffect(() => {
      setIsloading(true);
  
      Promise.all([
          fetchTrending("movie"),
          fetchTrending("tv"),
          fetchTrending("person")
      ])
      .then(([movies, series, people]) => {
          setMovielist(movies);
          setSeriesList(series);
          setPeopleList(people);
      })
      .catch(error => setErrorMessage(error.message))
      .finally(() => setIsloading(false));
  }, []);

  
  useEffect(() => {
   if(movieList.length > 0){
      fetchDetails('movie',`${movieList[0]?.id}`)
      .then(setHeaderMovie)
      .catch(setErrorMessage)

   }
}, [movieList])
   
   
    return (
    <>
    {isLoading && <Skeleton/>}
    <HeaderSection movie={headerMovie}/>
    <PopularSection movieList={movieList} errorMessage={errorMessage} isLoading={isLoading} people={peopleList} series={seriesList} />
    </>
   );
}