import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router";

import NewStories from "./components/NewStories";
import Questions from "./components/Ask";
import Presentations from "./components/Show";
import Jobs from "./components/Jobs";

import "./App.css";
import { Layout } from "./App.jsx";

const queryClient = new QueryClient();

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<NewStories />} />
            <Route path="ask" element={<Questions />} />
            <Route path="show" element={<Presentations />} />
            <Route path="job" element={<Jobs />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  </StrictMode>,
);
