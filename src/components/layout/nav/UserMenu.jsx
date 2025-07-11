import { NavLink } from "react-router-dom";

export default function UserMenu() {
  return (
    <>
      <div className="p-3 mt-2 mb-2 h4 bg-light">User Links</div>

      <ul className="list-group list-unstyled">
        <li>
          <NavLink className="list-group-item" to="/list">
            Event List
          </NavLink>
        </li>
        <li>
          <NavLink className="list-group-item" to="/list">
            Create Event
          </NavLink>
        </li>
        <li>
          <NavLink className="list-group-item" to="/list">
            Market Place
          </NavLink>
        </li>
        
        {/* <li>
        <NavLink className="list-group-item" to="#">
            Clans
          </NavLink>
        </li>

        <li>
          <NavLink className="list-group-item" to="#">
            Market place
          </NavLink>
        </li> */}
      </ul>
    </>
  );
}
