import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./App";
import "./about.css";
import "./projects.css";
import "./contact.css";
import "./work.css";
import WorkGrid from "./data/WorkGrid";  

createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter basename={import.meta.env.BASE_URL}>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/work/:slug" element={<WorkGrid />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);

