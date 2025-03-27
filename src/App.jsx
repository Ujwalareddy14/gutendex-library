import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import BookList from "./pages/BookList";
import Navbar from "./component/Navbar";
import Footer from "./component/Footer";
import "./App.css";

function App() {
  return (
    <>
      <Navbar />
      <div className="content">
      <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/category/:category" element={<BookList />} />
            </Routes>
      </div>
      <Footer />
    </>
  );
}

export default App;
