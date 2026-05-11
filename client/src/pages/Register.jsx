import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

function Register() {

  const navigate = useNavigate();
const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
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
        "https://blog-platform-backend-wc9b.onrender.com/api/auth/register",
        formData
      );

      toast.success("Registration Successful");
setLoading(false);
      navigate("/login");

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
          Register
        </h2>

        <input
          type="text"
          name="name"
          placeholder="Name"
          value={formData.name}
          onChange={handleChange}
          className="w-full border p-3 mb-4 rounded-lg"
        />

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
          {loading ? "Registering..." : "Register"}
        </button>

      </form>

    </div>
  );
}

export default Register;