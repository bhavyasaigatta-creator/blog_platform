import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function Home() {

  const [posts, setPosts] = useState([]);

  const currentUser = JSON.parse(
    localStorage.getItem("user")
  );

  const [editingPost, setEditingPost] = useState(null);

  const [updatedData, setUpdatedData] = useState({
    title: "",
    content: ""
  });

  const [commentText, setCommentText] = useState({});

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {

    try {

      const res = await axios.get(
        "https://blog-platform-backend-wc9b.onrender.com/api/posts"
      );

      setPosts(res.data);
localStorage.setItem(
  "allPosts",
  JSON.stringify(res.data)
);
    } catch (error) {

      console.log(error);

    }

  };

  const deletePost = async (id) => {

    try {

      await axios.delete(
        `https://blog-platform-backend-wc9b.onrender.com/api/posts/${id}`
      );

      fetchPosts();

    } catch (error) {

      console.log(error);

    }

  };

  const handleEdit = (post) => {

    setEditingPost(post._id);

    setUpdatedData({
      title: post.title,
      content: post.content
    });

  };

  const updatePost = async (id) => {

    try {

      await axios.put(
        `https://blog-platform-backend-wc9b.onrender.com/api/posts/${id}`,
        updatedData
      );

      setEditingPost(null);

      fetchPosts();

    } catch (error) {

      console.log(error);

    }

  };

  const addComment = async (postId) => {

    try {

      const user = JSON.parse(
        localStorage.getItem("user")
      );

      await axios.post(
        `https://blog-platform-backend-wc9b.onrender.com/api/posts/${postId}/comment`,
        {
          user: user.name,
          text: commentText[postId]
        }
      );

      setCommentText({
        ...commentText,
        [postId]: ""
      });

      fetchPosts();

    } catch (error) {

      console.log(error);

    }

  };
const likePost = async (id) => {

  try {

    await axios.put(
      `https://blog-platform-backend-wc9b.onrender.com/api/posts/${id}/like`
    );

    fetchPosts();

  } catch (error) {

    console.log(error);

  }

};

  return (

    <div className="min-h-screen bg-gray-100">

      {/* HERO SECTION */}

      <div className="mt-8 mx-4 md:mx-6 bg-gradient-to-r from-gray-900 via-black to-gray-800 text-white rounded-[40px] md:rounded-[50px] shadow-2xl flex flex-col justify-center items-center text-center px-6 pt-20 md:pt-24 pb-14 md:pb-16 border border-gray-700">

        <h1 className="text-4xl md:text-6xl font-extrabold mb-5 leading-tight">
          Write. Read. Inspire. ✍️
        </h1>

        <p className="text-base md:text-xl text-gray-300 max-w-2xl mb-8">
          Share your thoughts, ideas and stories with the world through beautiful blogs.
        </p>

        <Link
          to="/create"
          className="bg-white text-black px-8 py-4 rounded-2xl font-semibold text-base md:text-lg hover:bg-gray-200 hover:scale-105 transition duration-300 shadow-lg"
        >
          Start Writing 🚀
        </Link>

      </div>

      {/* BLOG POSTS */}

      <div className="p-4 md:p-8">

        <h2 className="text-3xl md:text-4xl font-bold text-center mb-10 text-gray-800">
          Latest Blog Posts
        </h2>

        {
          posts.length === 0 ? (

            <div className="flex flex-col items-center justify-center bg-white rounded-3xl shadow-xl p-8 md:p-12 max-w-xl mx-auto">

              <div className="text-6xl md:text-7xl mb-6">
                ✍️
              </div>

              <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4 text-center">
                No Blogs Yet
              </h2>

              <p className="text-gray-500 text-base md:text-lg text-center mb-8">
                Start sharing your thoughts, ideas and stories with the world.
              </p>

              <Link
                to="/create"
                className="bg-black text-white px-8 py-4 rounded-2xl hover:bg-gray-800 hover:scale-105 transition duration-300"
              >
                Create Your First Blog 🚀
              </Link>

            </div>

          ) : (

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">

              {
                posts.map((post) => (

                  <div
                    key={post._id}
                    className="bg-white/90 backdrop-blur-lg rounded-3xl shadow-xl hover:shadow-2xl hover:-translate-y-3 hover:scale-[1.02] transition duration-300 overflow-hidden border border-gray-200"
                  >

                    {/* TOP GRADIENT */}

                    <div className="h-3 bg-gradient-to-r from-purple-500 via-pink-500 to-red-500"></div>

                    <div className="p-5 md:p-6">

                      {/* DATE */}

                      <p className="text-sm text-gray-400 mb-3">
                        {new Date(post.createdAt).toLocaleDateString()}
                      </p>

                      {/* TITLE + CONTENT */}

                      {
                        editingPost === post._id ? (

                          <>

                            <input
                              type="text"
                              value={updatedData.title}
                              onChange={(e) =>
                                setUpdatedData({
                                  ...updatedData,
                                  title: e.target.value
                                })
                              }
                              className="w-full border p-3 rounded-lg mb-4"
                            />

                            <textarea
                              value={updatedData.content}
                              onChange={(e) =>
                                setUpdatedData({
                                  ...updatedData,
                                  content: e.target.value
                                })
                              }
                              className="w-full border p-3 rounded-lg mb-4"
                            />

                          </>

                        ) : (

                          <>

                            <h2 className="text-2xl font-bold text-gray-800 mb-4 break-words">
                              {post.title}
                            </h2>

                            <p className="text-gray-600 mb-6 leading-relaxed break-words">
                              {post.content}
                            </p>

                          </>

                        )
                      }

                      {/* COMMENTS */}

                      <div className="mb-6">

                        <h3 className="font-bold text-lg mb-3">
                          Comments
                        </h3>

                        <div className="space-y-3 mb-4 max-h-52 overflow-y-auto pr-1">

                          {
                            post.comments?.map((comment, index) => (

                              <div
                                key={index}
                                className="bg-gray-100 p-3 rounded-xl"
                              >

                                <p className="font-semibold text-sm break-words">
                                  {comment.user}
                                </p>

                                <p className="text-gray-700 break-words">
                                  {comment.text}
                                </p>

                              </div>

                            ))
                          }

                        </div>

                        {
                          currentUser && (

                            <div className="flex flex-col sm:flex-row gap-2">

                              <input
                                type="text"
                                placeholder="Write a comment..."
                                value={commentText[post._id] || ""}
                                onChange={(e) =>
                                  setCommentText({
                                    ...commentText,
                                    [post._id]: e.target.value
                                  })
                                }
                                className="flex-1 border p-3 rounded-xl"
                              />

                              <button
                                onClick={() => addComment(post._id)}
                                className="bg-black text-white px-4 py-3 rounded-xl hover:scale-105 transition duration-300"
                              >
                                Post
                              </button>

                            </div>

                          )
                        }

                      </div>
{/* LIKE BUTTON */}

<div className="flex items-center justify-between mb-6">

  <button
    onClick={() => likePost(post._id)}
    className="flex items-center gap-2 bg-pink-100 text-pink-600 px-4 py-2 rounded-xl hover:scale-105 transition duration-300"
  >

    ❤️ Like

  </button>

  <p className="font-semibold text-gray-600">
    {post.likes || 0} Likes
  </p>

</div>

                      {/* FOOTER */}

                      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">

                        <div className="flex items-center gap-2">

                          <div className="w-10 h-10 rounded-full bg-black text-white flex items-center justify-center font-bold">
                            {post.author.charAt(0)}
                          </div>

                          <span className="text-gray-700 font-medium break-words">
                            {post.author}
                          </span>

                        </div>

                        {
                          currentUser?._id === post.userId && (

                            <div className="flex flex-wrap gap-3">

                              {
                                editingPost === post._id ? (

                                  <button
                                    onClick={() => updatePost(post._id)}
                                    className="bg-green-500 hover:bg-green-600 hover:scale-105 text-white px-4 py-2 rounded-xl transition duration-300"
                                  >
                                    Save
                                  </button>

                                ) : (

                                  <button
                                    onClick={() => handleEdit(post)}
                                    className="bg-blue-500 hover:bg-blue-600 hover:scale-105 text-white px-4 py-2 rounded-xl transition duration-300"
                                  >
                                    Edit
                                  </button>

                                )
                              }

                              <button
                                onClick={() => deletePost(post._id)}
                                className="bg-red-500 hover:bg-red-600 hover:scale-105 text-white px-4 py-2 rounded-xl transition duration-300"
                              >
                                Delete
                              </button>

                            </div>

                          )
                        }

                      </div>

                    </div>

                  </div>

                ))
              }

            </div>

          )
        }

      </div>

    </div>
  );
}

export default Home;