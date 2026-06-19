import { useState, useContext } from "react";

import { Link } from "react-router-dom";

import { ThemeContext } from "./ThemeContext";

import { FaMoon, FaSun } from "react-icons/fa";

function Navbar() {

  const [open, setOpen] = useState(false);

  const { dark, setDark } =
    useContext(ThemeContext);

  return (
    <nav>

      <h2>SkillHub</h2>

      <ul>

        <li>
          <Link to="/">
            Home
          </Link>
        </li>

        <li
          onClick={() => setOpen(!open)}
          className="menu-item"
        >

          Courses ▼

          {
            open && (

              <div className="dropdown">

                <Link to="/courses">
                  All Courses
                </Link>

                <Link to="/add-course">
                  Add Course
                </Link>

              </div>

            )
          }

        </li>

        <li>
          <Link to="/contact">
            Contact
          </Link>
        </li>

      </ul>

      <button
        className="theme-btn"
        onClick={() => setDark(!dark)}
      >

        {
          dark
            ? <FaSun />
            : <FaMoon />
        }

      </button>

    </nav>
  );
}

export default Navbar;
