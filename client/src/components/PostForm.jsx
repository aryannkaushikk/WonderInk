import { useState } from "react";
const API = import.meta.env.VITE_API;

export default function PostForm({ user, post, onSaved }) {
  const [title, setTitle] = useState(post?.title || "");
  const [content, setContent] = useState(post?.content || "");

  async function handleSubmit(e) {
    e.preventDefault();
    const url = post ? `${API}/posts/${post._id}` : `${API}/posts/create`;
    const method = post ? "PATCH" : "POST";
    const res = await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, content, author: user._id }),
    });
    const data = await res.json();
    if (data.success) {
      alert(post ? "Post updated!" : "Post created!");
      setTitle("");
      setContent("");
      if (onSaved) onSaved();
    } else alert(data.message);
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="p-4 bg-white rounded-lg shadow space-y-3 border"
    >
      <h2 className="text-lg font-bold text-purple-700">
        {post ? "Edit Post" : "Create Post"}
      </h2>
      <input
        className="border border-gray-300 rounded p-2 w-full focus:ring-2 focus:ring-purple-400 outline-none"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <textarea
        className="border border-gray-300 rounded p-2 w-full focus:ring-2 focus:ring-purple-400 outline-none"
        placeholder="Content"
        rows={4}
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />
      <button className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded w-full transition">
        {post ? "Update" : "Create"}
      </button>
    </form>
  );
}
