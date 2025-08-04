import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const userId = localStorage.getItem("userId");

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    console.log('Token after logout:', localStorage.getItem("token")); // should be null
    navigate('/login');
  };

  return (
    <nav className="bg-[#1a1a2e] text-white px-6 py-4 flex justify-between items-center">
      <Link to="/" className="text-orange-500 font-bold text-xl">
        MyBlog
      </Link>

      <div className="space-x-4 flex items-center">
        <Link to="/posts" className="hover:underline">
          Posts
        </Link>

        {/* Show AI Generator link only if logged in */}
        {token && (
          <Link
            to="/ai-generator"
            className="hover:underline text-orange-400 font-semibold"
          >
            AI Post Generator
          </Link>
        )}

        {token ? (
          <>
            <Link to={`/profile/${userId}`} className="hover:underline">
              Profile
            </Link>
            <button
              onClick={handleLogout}
              className="bg-orange-500 px-4 py-1 rounded hover:bg-orange-600"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login" className="hover:underline">
              Login
            </Link>
            <Link to="/register" className="hover:underline">
              Register
            </Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
