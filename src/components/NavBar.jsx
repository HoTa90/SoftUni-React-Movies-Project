import { useState } from "react";
import { FilmIcon, HomeIcon, TvIcon, UserIcon, Bars3Icon, XMarkIcon } from "@heroicons/react/16/solid";
import { Link } from "react-router";
import { useAuth } from "../context/AuthContext.jsx";

export default function NavBar() {
  const { user, logout } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <div className="navbar shadow-sm bg-[#2c2c2c]">
      {/* Mobile menu button */}
      <div className="navbar-start lg:hidden">
        <button 
          onClick={toggleMenu}
          className="btn btn-ghost btn-square ml-2"
          aria-label="Toggle menu"
        >
          {isMenuOpen ? (
            <XMarkIcon className="w-6 h-6 text-gray-300" />
          ) : (
            <Bars3Icon className="w-6 h-6 text-gray-300" />
          )}
        </button>
      </div>

      <div className="navbar-start hidden lg:flex">
        <Link to="/" className="btn btn-ghost text-xl ml-5">
          <HomeIcon className="w-5 h-5 text-gray-300" />
          <span>Simple Movies</span>
        </Link>
      </div>

      {/* Desktop Navigation */}
      <div className="navbar-center hidden lg:flex">
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

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="absolute top-16 left-0 w-full bg-[#1a1919] lg:hidden z-50 shadow-lg">
          <ul className="menu p-4">
            <li>
              <Link to="/" className="text-lg" onClick={() => setIsMenuOpen(false)}>
                <HomeIcon className="w-5 h-5 text-gray-300" />
                <span>Home</span>
              </Link>
            </li>
            <li>
              <Link to="/movies" className="text-lg" onClick={() => setIsMenuOpen(false)}>
                <FilmIcon className="w-5 h-5 text-gray-300" />
                <span>Movies</span>
              </Link>
            </li>
            <li>
              <Link to="/series" className="text-lg" onClick={() => setIsMenuOpen(false)}>
                <TvIcon className="w-5 h-5 text-gray-300" />
                <span>TV Series</span>
              </Link>
            </li>
            {!user ? (
              <>
                <li>
                  <Link to="/login" className="text-lg" onClick={() => setIsMenuOpen(false)}>
                    Login
                  </Link>
                </li>
                <li>
                  <Link to="/register" className="text-lg" onClick={() => setIsMenuOpen(false)}>
                    Register
                  </Link>
                </li>
              </>
            ) : (
              <>
                <li>
                  <Link to={`/${user.username}/watchlist`} className="text-lg" onClick={() => setIsMenuOpen(false)}>
                    My Watchlist
                  </Link>
                </li>
                <li>
                  <Link to={`/${user.username}/reviews`} className="text-lg" onClick={() => setIsMenuOpen(false)}>
                    My Reviews
                  </Link>
                </li>
                <li>
                  <Link to="/" onClick={() => { logout(); setIsMenuOpen(false); }} className="text-lg">
                    Logout
                  </Link>
                </li>
              </>
            )}
          </ul>
        </div>
      )}

      {/* User Profile (Desktop) */}
      {!isMenuOpen && (
            <div className="navbar-end">
        <div className="dropdown dropdown-end">
          <div tabIndex={0} role="button" className="btn btn-ghost mr-5">
            <UserIcon className="w-6 h-6 text-gray-300" />
            <span className="text-xl hidden sm:inline">
              {user ? `${user.username}` : 'Profile'}
            </span>
          </div>
          <ul tabIndex={0} className="dropdown-content menu bg-[#1d1d1d] rounded-box z-1 w-52 p-2 shadow-sm">
            {!user ? (
              <>
                <li><Link to="/login">Login</Link></li>
                <li><Link to="/register">Register</Link></li>
              </>
            ) : (
              <>
                <li><Link to={`/${user.username}/watchlist`}>My Watchlist</Link></li>
                <li><Link to={`/${user.username}/reviews`}>My Reviews</Link></li>
                <li><Link to="/" onClick={logout}>Logout</Link></li>
              </>
            )}
          </ul>
        </div>
      </div>
      )}
    </div>
  );
}