import { useState, useEffect } from "react";
import PostForm from "./PostForm";
const API = import.meta.env.VITE_API;

export default function PostDetails({
  post,
  user,
  setSelectedPost,
  onPostUpdated,
}) {
  const [comments, setComments] = useState([]);
  const [text, setText] = useState("");
  const [editingComment, setEditingComment] = useState(null);
  const [editMode, setEditMode] = useState(false);

  const fetchComments = () => {
    fetch(`${API}/comments/post/${post._id}`)
      .then((res) => res.json())
      .then((data) => setComments(data.data || []));
  };

  useEffect(() => fetchComments(), [post]);

  async function handleAddOrEditComment(e) {
    e.preventDefault();
    const url = editingComment
      ? `${API}/comments/${editingComment._id}`
      : `${API}/comments`;
    const method = editingComment ? "PATCH" : "POST";
    const res = await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ content: text, author: user._id, post: post._id }),
    });
    const data = await res.json();
    if (data.success) {
      setText("");
      setEditingComment(null);
      fetchComments();
    } else alert(data.message);
  }

  async function handleDeleteComment(id) {
    if (!window.confirm("Delete this comment?")) return;
    const res = await fetch(`${API}/comments/${id}`, { method: "DELETE" });
    const data = await res.json();
    if (data.success) fetchComments();
    else alert(data.message);
  }

  async function handleDeletePost() {
    if (!window.confirm("Delete this post?")) return;
    const res = await fetch(`${API}/posts/${post._id}`, { method: "DELETE" });
    const data = await res.json();
    if (data.success) {
      onPostUpdated();
      setSelectedPost(null);
    } else alert(data.message);
  }

  if (editMode) {
    return (
      <div className="p-4 bg-white rounded-lg shadow border">
        <div className="flex gap-4 mb-4">
          <button
            onClick={() => setEditMode(false)}
            className="text-purple-600 hover:underline"
          >
            ← Back
          </button>
        </div>
        <PostForm user={user} post={post} onSaved={onPostUpdated} />
      </div>
    );
  }

  return (
    <div className="p-4 bg-white rounded-lg shadow border space-y-4">
      <div className="flex justify-between items-center">
        <button
          onClick={() => setSelectedPost(null)}
          className="text-purple-600 hover:underline"
        >
          ← Back
        </button>
        {user._id === post.author?._id && (
          <div className="flex gap-3">
            <button
              onClick={() => setEditMode(true)}
              className="text-purple-600 hover:underline"
            >
              Edit
            </button>
            <button
              onClick={handleDeletePost}
              className="text-red-500 hover:underline"
            >
              Delete
            </button>
          </div>
        )}
      </div>

      <h2 className="text-xl font-bold text-gray-800">{post.title}</h2>
      <p className="text-xs text-gray-500">
        {new Date(post.createdAt).toLocaleString()}
      </p>
      <p className="text-gray-700">{post.content}</p>

      <h3 className="font-semibold text-purple-700">Comments</h3>
      <form onSubmit={handleAddOrEditComment} className="flex gap-2 my-2">
        <input
          className="border border-gray-300 rounded p-2 flex-1 focus:ring-2 focus:ring-purple-400 outline-none"
          placeholder="Add a comment"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <button className="bg-purple-600 hover:bg-purple-700 text-white px-4 rounded transition">
          {editingComment ? "Update" : "Post"}
        </button>
      </form>

      <div className="space-y-2">
        {comments.map((c) => (
          <div
            key={c._id}
            className="p-2 border rounded-lg flex justify-between items-start bg-gray-50"
          >
            <div>
              <p>{c.content}</p>
              <p className="text-xs text-gray-500">
                By {c.author?.name || "Anonymous"} •{" "}
                {new Date(c.createdAt).toLocaleString()}
              </p>
            </div>
            {user._id === c.author?._id && (
              <div className="flex gap-2">
                <button
                  onClick={() => {
                    setText(c.content);
                    setEditingComment(c);
                  }}
                  className="text-purple-600 text-sm hover:underline"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDeleteComment(c._id)}
                  className="text-red-500 text-sm hover:underline"
                >
                  Delete
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
