import { FilmIcon, TvIcon } from "@heroicons/react/16/solid";
import { Link } from "react-router";

export default function NavBar() {
  return (
    <div className="navbar shadow-sm bg-[#2c2c2c]">
      <div className="navbar-start">
        <Link to="/" className="btn btn-ghost text-xl">
          Simple Movies
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
        <a className="btn">Button</a>
      </div>
    </div>
  );
}