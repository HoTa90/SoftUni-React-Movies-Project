import { FilmIcon, HomeIcon, TvIcon, UserIcon } from "@heroicons/react/16/solid";
import { Link } from "react-router";
import { useAuth } from "../context/AuthContext.jsx";

export default function NavBar() {

  const { user, logout } = useAuth();


  return (
    <div className="navbar shadow-sm bg-[#2c2c2c]">
      <div className="navbar-start">
        <Link to="/" className="btn btn-ghost text-xl ml-5">
          <HomeIcon className="w-5 h-5 text-gray-300" />
          <span >Simple Movies</span>
        </Link>
      </div>
      <div className="navbar-center flex">
        <ul className="menu menu-horizontal px-1 m-auto">
          <li>
            <Link to="/movies" className="flex items-center gap-2 text-lg">
              <FilmIcon className="w-5 h-5 text-gray-300" />
              <span>Movies</span>
            </Link>
          </li>
          <li>
            <Link to="/series" className="text-lg">
              <TvIcon className="w-5 h-5 text-gray-300" />
              <span>TV Series</span>
            </Link>
          </li>
        </ul>
      </div>
      <div className="navbar-end">
        <div className="dropdown dropdown-end">
          <div tabIndex={0} role="button" className="btn btn-ghost mr-5">

            <UserIcon className="w-6 h-6 text-gray-300" />
            <span className="text-xl">{user ? `${user.username}` : 'Profile'}</span>
          </div>
          <ul tabIndex={0} className="dropdown-content menu bg-base-100 rounded-box z-1 w-52 p-2 shadow-sm">
            {!user ?
              <>
                <li><Link to={'/login'}>Login</Link></li>
                <li><Link to={'/register'}>Register</Link></li>
              </>
              :
              <>
                <li><Link to={`/${user.username}/watchlist`}>My Watchlist</Link></li>
                <li><Link to={`/${user.username}/reviews`}>My Reviews</Link></li>
                <li><Link to={'/'} onClick={logout} >Logout</Link></li>
              </>
            }
          </ul>
        </div>
      </div>
    </div>
  );
}