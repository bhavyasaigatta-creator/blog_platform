import { useState } from "react";
import toast from "react-hot-toast";
import {
  Routes,
  Route,
  Link,
  useNavigate
} from "react-router-dom";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import CreatePost from "./pages/CreatePost";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {

  const navigate = useNavigate();

  const token = localStorage.getItem("token");

  const user = JSON.parse(
    localStorage.getItem("user")
  );

  const allPosts = JSON.parse(
  localStorage.getItem("allPosts")
) || [];

const userPosts = allPosts.filter(
  (post) => post.userId === user?._id
).length;

  const [showProfile, setShowProfile] = useState(false);

  const handleLogout = () => {

    localStorage.removeItem("token");
    localStorage.removeItem("user");

    toast.success("Logged out successfully");

    navigate("/login");

  };

  return (

    <div className="min-h-screen bg-gradient-to-br from-gray-100 via-white to-gray-200 flex flex-col">

      {/* NAVBAR */}

      <nav className="flex justify-center pt-6">

        <div className="bg-black/90 backdrop-blur-lg text-white px-6 py-4 rounded-2xl shadow-2xl flex flex-wrap justify-center items-center gap-5 text-sm md:text-lg font-semibold border border-gray-700 relative mx-4">

          <Link
            to="/"
            className="hover:text-gray-300 hover:scale-105 transition duration-300"
          >
            Home
          </Link>

          {
            !token && (
              <>
                <Link
                  to="/register"
                  className="hover:text-gray-300 hover:scale-105 transition duration-300"
                >
                  Register
                </Link>

                <Link
                  to="/login"
                  className="hover:text-gray-300 hover:scale-105 transition duration-300"
                >
                  Login
                </Link>
              </>
            )
          }

          {
            token && (
              <>
                <Link
                  to="/create"
                  className="hover:text-gray-300 hover:scale-105 transition duration-300"
                >
                  Create Post
                </Link>

                {/* PROFILE CIRCLE */}

                <div className="relative">

                  <button
                    onClick={() =>
                      setShowProfile(!showProfile)
                    }
                    className="w-10 h-10 rounded-full bg-white text-black flex items-center justify-center font-bold hover:scale-110 hover:rotate-6 transition duration-300"
                  >

                    {user?.name?.charAt(0).toUpperCase()}

                  </button>

                  {/* DROPDOWN */}

                  {
                    showProfile && (

                      <div className="absolute right-0 mt-3 w-64 bg-white text-black rounded-2xl shadow-2xl p-5 z-50">

                        <div className="text-center mb-4">

                          <div className="w-16 h-16 mx-auto rounded-full bg-black text-white flex items-center justify-center text-2xl font-bold mb-3">

                            {user?.name?.charAt(0).toUpperCase()}

                          </div>

                          <h2 className="font-bold text-lg">
                            {user?.name}
                          </h2>

                          <p className="text-gray-500 text-sm break-words">
                            {user?.email}
                          </p>

                          <p className="text-gray-600 text-sm mt-2">
                            Blogs Published: {userPosts}
                          </p>

                        </div>

                        <button
                          onClick={handleLogout}
                          className="w-full bg-red-500 hover:bg-red-600 hover:scale-105 text-white py-3 rounded-xl transition duration-300"
                        >
                          Logout
                        </button>

                      </div>

                    )
                  }

                </div>

              </>
            )
          }

        </div>

      </nav>

      {/* MAIN CONTENT */}

      <div className="flex-grow">

        <Routes>

          <Route path="/" element={<Home />} />

          <Route
            path="/register"
            element={<Register />}
          />

          <Route
            path="/login"
            element={<Login />}
          />

          <Route
            path="/create"
            element={
              <ProtectedRoute>
                <CreatePost />
              </ProtectedRoute>
            }
          />

        </Routes>

      </div>

      {/* FOOTER */}

      <footer className="bg-black text-white mt-12 py-6 text-center px-4">

        <h2 className="text-lg md:text-xl font-semibold mb-2">
          Write. Read. Inspire. ✍️
        </h2>

        <p className="text-gray-400 text-sm md:text-base">
          Made with ❤️ using MERN Stack
        </p>

        <p className="text-gray-500 text-xs md:text-sm mt-2">
          © 2026 Blog Platform. All rights reserved.
        </p>

      </footer>

    </div>

  );
}

export default App;