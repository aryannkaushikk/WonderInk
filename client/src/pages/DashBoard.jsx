import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import PostDetails from "../components/PostDetails";
import PostForm from "../components/PostForm";
import PostList from "../components/PostList";

export default function DashBoard({
  selectedPost,
  setSelectedPost,
  refresh,
  setRefresh,
}) {
  const { user, logout, loading } = useAuth();

  if (loading) {
    return (
      <div className="flex flex-col gap-2 w-64 mx-auto mt-20">
        {[1, 2, 3, 4].map((i) => (
          <div
            key={i}
            className="h-4 rounded bg-purple-200 animate-pulse"
            style={{ width: `${80 - i * 10}%` }}
          ></div>
        ))}
        <p className="text-center text-purple-500 mt-4 animate-pulse">
          Crafting your blog post...
        </p>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div className="max-w-2xl mx-auto p-4 space-y-4">
      <div className="flex justify-between items-center border-b pb-2">
        <h1 className="text-2xl font-bold text-purple-700">
          Welcome, {user.name}
        </h1>
        <button
          onClick={logout}
          className="text-sm bg-purple-100 hover:bg-purple-200 text-purple-600 px-3 py-1 rounded transition"
        >
          Logout
        </button>
      </div>

      {selectedPost ? (
        <PostDetails
          post={selectedPost}
          user={user}
          setSelectedPost={setSelectedPost}
          onPostUpdated={() => setRefresh(!refresh)}
        />
      ) : (
        <>
          <PostForm user={user} onSaved={() => setRefresh(!refresh)} />
          <PostList
            setSelectedPost={setSelectedPost}
            user={user}
            refresh={refresh}
          />
        </>
      )}
    </div>
  );
}
