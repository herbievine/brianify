import type React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Download from "../pages/Download";
import Home from "../pages/Home";

interface INavigatorProps {}

const Navigator: React.FC<INavigatorProps> = ({}) => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/:id" element={<Download />} />
      </Routes>
    </Router>
  );
};

export default Navigator;
