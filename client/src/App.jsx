import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";
import DashBoard from "./pages/DashBoard";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Home from "./pages/Home";
import { useAuth } from "./context/AuthContext";

const App = () => {
  const { user } = useAuth();
  const [selectedPost, setSelectedPost] = useState(null);
  const [refresh, setRefresh] = useState(false);

  return (
    <Routes>
      <Route
        path="/"
        element={
          <Home/>
        }
      />
      <Route
        path="/dashboard"
        element={
          <DashBoard
            selectedPost={selectedPost}
            setSelectedPost={setSelectedPost}
            user={user} 
            refresh={refresh}
            setRefresh={setRefresh}
          />
        }
      />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
    </Routes>
  );
};

export default App;
