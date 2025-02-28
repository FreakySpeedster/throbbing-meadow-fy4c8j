import "./styles.css";
import { useEffect, useState } from 'react';

export default function App() {
  const [input, setInput] = useState("");
  const [results, setResults] = useState([]);
  const fetchData = async() => {
    await fetch('https://dummyjson.com/products/search?q=')
    .then(res => {
      let data = res.json();
      setResults(data);
    })
  }
  useEffect(() => {
    fetchData();
  }, [input]);

  return (
    <div className="App">
      <h1>Hello CodeSandbox</h1>
      <input className="search-bar" value={input} onChange={(e) => setInput(e.target.value)}/>
      <div className="results-container">
        {results?.map((r) => {
          <span key={r.id} className="result">{r.name}</span>
        })}
      </div>
    </div>
  );
}
