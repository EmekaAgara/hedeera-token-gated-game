import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Game from "./pages/Game";
import Claim from "./pages/Claim";
import Marketplace from "./pages/Marketplace";
import NotFound from "./pages/NotFound";
import Jackpot from "./pages/Jackpot";
import { AppKitProvider } from "./contexts/AppKitProvider";

import "./App.css";

export default function App() {
  return (
    <AppKitProvider>
      <Router>
        <div className="min-h-screen bg-black text-white">
          <Navbar />
          <main>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/game" element={<Game />} />
              <Route path="/claim" element={<Claim />} />
              <Route path="/marketplace" element={<Marketplace />} />
              <Route path="/jackpot" element={<Jackpot />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </main>
        </div>
      </Router>
    </AppKitProvider>
  );
}
