import toast from "react-hot-toast";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Login() {

  const navigate = useNavigate();
const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });

  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });

  };

  const handleSubmit = async (e) => {

    e.preventDefault();
setLoading(true);
    try {

      const res = await axios.post(
        "https://blog-platform-backend-wc9b.onrender.com/api/auth/login",
        formData
      );

      localStorage.setItem(
        "token",
        res.data.token
      );
localStorage.setItem(
  "user",
  JSON.stringify(res.data.user)
);

      toast.success("Login Successful");
setLoading(false);
      navigate("/create");

    } catch (error) {
setLoading(false);
      toast.error(error.response.data.message);

    }

  };

  return (

    <div className="flex justify-center items-center h-[80vh] bg-gray-100">

      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-2xl shadow-xl w-[350px]"
      >

        <h2 className="text-3xl font-bold mb-6 text-center">
         {loading ? "Logging in..." : "Login"}
        </h2>

        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          className="w-full border p-3 mb-4 rounded-lg"
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          className="w-full border p-3 mb-4 rounded-lg"
        />

        <button
          type="submit"
          className="w-full bg-black text-white py-3 rounded-lg hover:bg-gray-800"
        >
          Login
        </button>

      </form>

    </div>
  );
}

export default Login;