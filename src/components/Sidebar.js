import { Link } from 'react-router-dom'; // Import Link from react-router-dom

function Sidebar() {
  return (
    <div className="w-64  bg-blue-600 text-white shadow-lg">
      <div className="p-6">
        <h2 className="text-2xl font-bold mb-6">Menu</h2>
        <ul className="space-y-4">
          <li>
            <Link to="/profile" className="block py-2 px-4 text-lg hover:bg-blue-700 rounded transition duration-300 ease-in-out">
              Profile
            </Link>
          </li>
          <li>
            <Link to="/create" className="block py-2 px-4 text-lg hover:bg-blue-700 rounded transition duration-300 ease-in-out">
              Create
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Sidebar;
