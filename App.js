import React,{useState,useEffect} from "react";
import './App.css';
import axios from "axios";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Bollywood from "./Components/Bollywood";
import Hollywood from "./Components/Hollywood";
import Webseries from "./Components/Webseries";
import Home from "./Components/Home";

const App = () => {
 
  const [moviesinput, setMoviesInput] = useState("");
  const [movies_data, setMovies_Data] = useState([]);
  const moviesdata = async (search) => {
    const url = `http://www.omdbapi.com/?i=tt3896198&apikey=51e8c335&s=${search};`;
    await axios
      .get(url)
      .then((response) => {
        console.log(response.data.Search);
        setMovies_Data(response.data.Search);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const searchbtn = () => {
    moviesdata(moviesinput);
  };
  const searchinpt = (e) => {
    setMoviesInput(e.target.value);
  };
  useEffect(() => {
    moviesdata();
  }, []);
  return (
    <Router className="router">
      <div className="nav">
        <Link className="link" to="/Home">Home</Link>
        <Link className="link" to="/Hollywood">Hollywood</Link>
        <Link className="link" to="/Bollywood">Bollywood</Link>
        <Link className="link" to="/Webseries">Webseries</Link>
        <div className="searching">
          <button className="btn" onClick={searchbtn}>
            search
          </button>
          <input type="search" className="inpt" onChange={searchinpt} />
        </div>
      </div>
      <div className="MoviesDeatials">
        <div className="heading">
          {movies_data
            ? movies_data.map((items) => (    
                <div className="innerbox">
                  <img src={items?.Poster} alt="" />
                  <div className="subdtl">
                  <h5>{items?.Title}</h5>
                  <h6>Id: {items?.imdbID}</h6>
                  </div>
                </div>    
              ))
            : "loading"}
        </div>
      </div>
      <Routes>
        <Route path="/home" element={<Home/>}/>
        <Route path="/hollywood" element={<Hollywood />} />
        <Route path="/bollywood" element={<Bollywood />} />
        <Route path="/webseries" element={<Webseries />} />
      </Routes>
    </Router>
  );
};
  

export default App;
