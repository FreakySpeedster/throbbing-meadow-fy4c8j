import "./SearchBar.css";
import React, { useEffect, useState } from "react";

const SearchBar = () => {
  const [input, setInput] = useState("");
  const [results, setResults] = useState([]);
  const [showResults, setShowResults] = useState(false);
  const [cache, setCache] = useState({});
  const fetchData = async () => {
    if (cache[input]) {
      setResults(cache[input]);
      return;
    }
    let res = await fetch(`https://dummyjson.com/products/search?q=${input}`);
    const data = await res.json();
    setResults(data.products);
    setCache((prev) => ({
      ...prev,
      [input]: data.products,
    }));
  };
  useEffect(() => {
    const delay = setTimeout(() => {
      fetchData();
    }, 400);
    return () => clearTimeout(delay);
  }, [input]);

  return (
    <div className="App">
      <h1>Freaky Search</h1>
      <input
        className="search-bar"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onFocus={() => setShowResults(true)}
        onBlur={() => setShowResults(false)}
      />
      {showResults && (
        <div className="results-container">
          {results?.map((r) => (
            <span key={r.id} className="result">
              {r.title}
            </span>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchBar;
