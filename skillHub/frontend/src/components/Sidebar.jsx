import { Link } from "react-router-dom";

function Sidebar() {

  return (
    <aside>

      <h3>Categories</h3>

      <p>
        <Link to="/courses">
          Frontend
        </Link>
      </p>

      <p>
        <Link to="/courses">
          Backend
        </Link>
      </p>

      <p>
        <Link to="/courses">
          Database
        </Link>
      </p>

      <p>
        <Link to="/courses">
          Cloud
        </Link>
      </p>

      <hr />

      <h3>Quick Menu</h3>

      <p>
        <Link to="/">
          Dashboard
        </Link>
      </p>

      <p>
        <Link to="/add-course">
          Add Course
        </Link>
      </p>

      <p>
        <Link to="/contact">
          Contact
        </Link>
      </p>

    </aside>
  );
}

export default Sidebar;
