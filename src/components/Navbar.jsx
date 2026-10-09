import { NavLink } from "react-router-dom";

function Navbar() {
  return (
    <nav className="navbar">

      <div className="navbar-brand">
        <h2>Student Management System</h2>
      </div>

      <div className="navbar-links">

        <NavLink to="/dashboard">
          Dashboard
        </NavLink>

        <NavLink to="/students">
          Students
        </NavLink>

        <NavLink to="/courses">
          Courses
        </NavLink>

      </div>

    </nav>
  );
}

export default Navbar;