import "./App.css";
import "./styles/responsive.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { NavBar } from "./components/NavBar/NavBar";
import Portfolio from "./pages/Portfolio";
import Blog from "./pages/Blog";
import BlogPost from "./pages/BlogPost";
import { useState } from "react";

function App() {
  const [splashEffect, setSplashEffect] = useState(true);

  const toggleEffect = () => {
    setSplashEffect(!splashEffect);
  };

  return (
    <Router>
      <div className="App">
        <NavBar />
        <Routes>
          <Route
            path="/"
            element={
              <Portfolio
                splashEffect={splashEffect}
                toggleEffect={toggleEffect}
              />
            }
          />
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/:id" element={<BlogPost />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
