import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

function CreatePost() {

  const navigate = useNavigate();
const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    content: ""
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

      const user = JSON.parse(
        localStorage.getItem("user")
      );

      await axios.post(
        "http://localhost:5000/api/posts",
        {
          ...formData,
          author: user.name,
          userId: user._id
        }
      );

      toast.success("Post Created Successfully");
setFormData({
        title: "",
        content: ""
      });
setLoading(false);
      navigate("/");

    } catch (error) {
setLoading(false);
      console.log(error);

      toast.error("Failed to create post");

    }

  };

  return (

    <div className="min-h-screen bg-gray-100 flex justify-center items-center p-6">

      <div className="bg-white shadow-2xl rounded-3xl w-full max-w-2xl p-8">

        <div className="text-center mb-8">

          <h1 className="text-4xl font-bold text-gray-800 mb-2">
            Create Your Story ✍️
          </h1>

          <p className="text-gray-500">
            Share your thoughts, ideas and experiences with the world
          </p>

        </div>

        <form onSubmit={handleSubmit}>

          <div className="mb-5">

            <label className="block mb-2 font-semibold text-gray-700">
              Blog Title
            </label>

            <input
              type="text"
              name="title"
              placeholder="Enter blog title"
              value={formData.title}
              onChange={handleChange}
              className="w-full border border-gray-300 p-4 rounded-xl focus:outline-none focus:ring-2 focus:ring-black"
            />

          </div>

          <div className="mb-5">

            <label className="block mb-2 font-semibold text-gray-700">
              Blog Content
            </label>

            <textarea
              name="content"
              placeholder="Write your blog here..."
              value={formData.content}
              onChange={handleChange}
              rows="8"
              className="w-full border border-gray-300 p-4 rounded-xl focus:outline-none focus:ring-2 focus:ring-black"
            />

          </div>

          <button
            type="submit"
            className="w-full bg-black hover:bg-gray-800 text-white py-4 rounded-xl text-lg font-semibold transition duration-300"
          >
            {loading ? "Publishing..." : "Publish Blog 🚀"}
          </button>

        </form>

      </div>

    </div>
  );
}

export default CreatePost;