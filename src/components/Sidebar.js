function Sidebar() {
    return (
        <div className="w-64 bg-blue-600 text-white shadow-lg">
        <div className="p-6">
          <h2 className="text-2xl font-bold mb-6">Menu</h2>
          <ul className="space-y-4">
            <li>
              <a href="#" className="block py-2 px-4 text-lg hover:bg-blue-700 rounded transition duration-300 ease-in-out">Profile</a>
            </li>
            <li>
              <a href="#" className="block py-2 px-4 text-lg hover:bg-blue-700 rounded transition duration-300 ease-in-out">Create</a>
            </li>
          </ul>
        </div>
      </div>
    );
  }
  
  export default Sidebar;