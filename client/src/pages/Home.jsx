import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import HealthCheckDialog from "../components/HealthCheckDialog"; // your dialog component
const API = import.meta.env.VITE_API;

export default function Home() {
  const navigate = useNavigate();
  const [backendStatus, setBackendStatus] = useState("checking"); // "checking" | "ready" | "error"
  const [showDialog, setShowDialog] = useState(false);

  // Ping backend on mount
  useEffect(() => {
    fetch(`${API}/`)
      .then((res) => {
        if (res.ok) setBackendStatus("ready");
        else setBackendStatus("error");
      })
      .catch(() => setBackendStatus("error"));
  }, []);

  async function handleProceed(path) {
    if (backendStatus === "ready") {
      navigate(path);
      return;
    }

    setShowDialog(true); // show the checking dialog
    try {
      const res = await fetch(`${API}/`);
      if (res.ok) {
        setBackendStatus("ready");
        setShowDialog(true); // show ready dialog
      } else {
        setBackendStatus("error");
        setShowDialog(true);
      }
    } catch {
      setBackendStatus("error");
      setShowDialog(true);
    }
  }

  function handleDialogClose() {
    setShowDialog(false);
    if (backendStatus === "ready") {
      // User pressed OK after backend woke up, navigate to intended page
      // Optionally, store intended path in state if needed
    }
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-purple-50 to-purple-100 px-4">
      {showDialog && (
        <HealthCheckDialog status={backendStatus} onClose={handleDialogClose} />
      )}

      <div className="max-w-2xl text-center space-y-6">
        <h1 className="text-4xl md:text-5xl font-bold text-purple-700">
          Welcome to WonderInk
        </h1>
        <p className="text-lg text-gray-600">
          Share your thoughts, write stories, and connect with others. Create posts, comment, and join the conversation — all in one place.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center mt-6">
          <button
            onClick={() => handleProceed("/register")}
            className="px-6 py-3 rounded-lg bg-purple-600 text-white font-medium hover:bg-purple-700 transition"
          >
            Get Started
          </button>
          <button
            onClick={() => handleProceed("/login")}
            className="px-6 py-3 rounded-lg border border-purple-600 text-purple-600 font-medium hover:bg-purple-50 transition"
          >
            Login
          </button>
        </div>
      </div>

      <div className="mt-12">
        <div className="w-72 h-72 bg-purple-200 rounded-2xl shadow-inner flex items-center justify-center">
          <span className="text-purple-600 font-semibold text-lg">📝 Your Blog</span>
        </div>
      </div>
    </div>
  );
}
