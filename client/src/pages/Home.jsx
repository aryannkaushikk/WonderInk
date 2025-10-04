import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-purple-50 to-purple-100 px-4">
      <div className="max-w-2xl text-center space-y-6">
        {/* Title */}
        <h1 className="text-4xl md:text-5xl font-bold text-purple-700">
          Welcome to WonderInk
        </h1>
        <p className="text-lg text-gray-600">
          Share your thoughts, write stories, and connect with others.  
          Create posts, comment, and join the conversation — all in one place.
        </p>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mt-6">
          <button
            onClick={() => navigate("/register")}
            className="px-6 py-3 rounded-lg bg-purple-600 text-white font-medium hover:bg-purple-700 transition"
          >
            Get Started
          </button>
          <button
            onClick={() => navigate("/login")}
            className="px-6 py-3 rounded-lg border border-purple-600 text-purple-600 font-medium hover:bg-purple-50 transition"
          >
            Login
          </button>
        </div>
      </div>

      {/* Hero illustration or placeholder */}
      <div className="mt-12">
        <div className="w-72 h-72 bg-purple-200 rounded-2xl shadow-inner flex items-center justify-center">
          <span className="text-purple-600 font-semibold text-lg">📝 Your Blog</span>
        </div>
      </div>
    </div>
  );
}
