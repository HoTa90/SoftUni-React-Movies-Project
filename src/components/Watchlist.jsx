import { useEffect, useState } from "react";
import useFirestore from "../services/firestore.js";
import { useAuth } from "../context/AuthContext.jsx";
import HeroCard from "./HeroCard.jsx";
import Spinner from "./loading/Spinner.jsx";

export default function WatchList() {
    const { user } = useAuth()
    const [watchlist, setWatchlist] = useState([])
    const { getWatchlist } = useFirestore()
    const [isPending, setIsPending] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
        if (user) {
            setError(null)
            setIsPending(true)
            getWatchlist(user.uid)
                .then(setWatchlist)
                .catch((err) => setError(err.message))
                .finally(() => setIsPending(false))
        }
    }, [user])


    return (
        <section className="px-28 py-15">

            <h2 className="text-white text-2xl font-bold mb-8">My Watchlist</h2>
            {isPending ? (
                <Spinner />
            ) : error ? (
                <p className="text-red-500">{error}</p>
            ) : watchlist.length > 0 ? (

                <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 mb-12">
                    {watchlist.map(item => (
                        <li key={item.id} className="p-0">
                            <HeroCard data={item} type={item.type} />
                        </li>
                    ))}
                </ul>)
                :
                
            <h3 className="text-gray-400 text-lg font-bold mb-8">You haven't added any Movies or TV shows to your Watchlist yet!</h3>
            }
        </section>
    );
}