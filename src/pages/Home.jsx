import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Home.css";

const categories = [
  "Fiction", "Fantasy", "Science", "History",
  "Philosophy", "Biography", "Mystery", "Adventure",
  "Poetry", "Drama"
];

const Home = () => {
  const navigate = useNavigate();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  return (
    <div className="home-container">
      <h1 className="home-title">Gutendex Library</h1>

      {/* Dropdown Menu */}
      <div className="dropdown">
        <button className="dropdown-toggle" onClick={() => setIsDropdownOpen(!isDropdownOpen)}>
          📚 Select Category
        </button>
        {isDropdownOpen && (
          <div className="dropdown-menu">
            {categories.map((category) => (
              <div
                key={category}
                className="dropdown-item"
                onClick={() => {
                  navigate(`/category/${category.toLowerCase()}`);
                  setIsDropdownOpen(false);
                }}
              >
                {category}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
