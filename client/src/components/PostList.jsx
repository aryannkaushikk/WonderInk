import { useState, useEffect, useRef } from "react";
const API = import.meta.env.VITE_API;

export default function PostList({ setSelectedPost, user, refresh }) {
  const [posts, setPosts] = useState([]);
  const prevPostsRef = useRef([]);

  const fetchPosts = async () => {
    try {
      const res = await fetch(`${API}/posts`);
      const data = await res.json();
      const newPosts = data.data || [];

      const addedPosts = newPosts.filter(
        (p) => !prevPostsRef.current.some((old) => old._id === p._id)
      );

      const updatedPosts = newPosts.map((p) => ({
        ...p,
        isNew:
          addedPosts.some((a) => a._id === p._id) ||
          prevPostsRef.current.length === 0,
      }));

      setPosts(updatedPosts);
      prevPostsRef.current = newPosts;

      setTimeout(() => {
        setPosts((prev) => prev.map((p) => ({ ...p, isNew: false })));
      }, 1500);
    } catch (err) {
      console.error("Failed to fetch posts:", err);
    }
  };

  useEffect(() => {
    fetchPosts();
    const interval = setInterval(fetchPosts, 5000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (refresh) fetchPosts();
  }, [refresh]);

  return (
    <div className="space-y-3">
      <h2 className="text-xl font-bold text-purple-700">Posts</h2>
      {posts.map((p) => (
        <div
          key={p._id}
          onClick={() => setSelectedPost(p)}
          className={`p-4 rounded-lg shadow cursor-pointer bg-white border hover:bg-purple-50 transition-all duration-500 
            ${
              p.isNew
                ? "opacity-0 translate-y-[-10px] animate-fade-slide"
                : "opacity-100 translate-y-0"
            }`}
        >
          <h3 className="font-semibold text-gray-800">{p.title}</h3>
          <p className="text-xs text-gray-500">
            By {p.author?.name || "Unknown"} •{" "}
            {new Date(p.createdAt).toLocaleString()}
          </p>
        </div>
      ))}

      <style>{`
        @keyframes fade-slide {
          0% { opacity: 0; transform: translateY(-10px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-slide {
          animation: fade-slide 1.5s ease forwards;
        }
      `}</style>
    </div>
  );
}
