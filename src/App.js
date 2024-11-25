import { useEffect, useState } from "react";
import "./App.css";
import { getMovieList, searchMovie } from "./api";

const App = () => {
  const [popularMovies, setPopularMovies] = useState([]);

  useEffect(() => {
    getMovieList().then((result) => {
   setPopularMovies(result)
    })
  }, []);

  const PopularMovieList = () => {
    return popularMovies.map((movie, i) => {
      return (
        <div className="Movie-wrapper" key={i}>
          <div className="Movie-title">{movie.title}</div>
          <img
            className="Movie-image"
            src={`${process.env.REACT_APP_BASEIMGURL}/${movie.poster_path}`}
            alt="list-popular-movie"
          />
          <div className="Movie-date"> {movie.release_date} </div>
          <div className="Movie-rate">{movie.vote_average}</div>
        </div>
      );
    })
  }

const search = async (q) => {
  if (q.length > 3) {
    const query = await searchMovie(q);
    setPopularMovies(query.results);
  }
};


  return (
    <div className="App">
      <header className="App-header px-5 overflow-hidden max-w-3/4 lg:min-h-screen flex flex-col items-center justify-center text-white bg-slate-800">
        <h1 className="text-center text-3xl lg:text-4xl m-5 font-semibold ">Movie search React Js</h1>
        <input
          placeholder="Cari film kesukaan anda"
          className="Movie-search w-[280px] text-xl p-5 lg:w-[500px]"
          onChange={({ target }) => search(target.value)}
        />
        <div className="Movie-container">
          <PopularMovieList />
        </div>
      </header>
    </div>
  );
};

export default App;
