"use client";

import { useEffect, useState } from "react";

export default function ApiService() {
  const [movies, setMovies] = useState<any>([]);

  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxYmVjNmE0OGY2ZWZjOWQyODYyNjhkMjZiZWJkN2EzYiIsInN1YiI6IjY1Y2RmNTdiNmMwYjM2MDE2MjhkZDUxNCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.oR0of0Pf6oADdC1TP68LShwHWH_azo6Letea8oXHRCg",
    },
  };

  useEffect(() => {
    fetch(
      "https://api.themoviedb.org/3/movie/popular?language=en-US&page=1",
      options
    )
      .then((response) => response.json())
      .then((response) => setMovies(response.results))
      .catch((err) => console.error(err));
  }, []);

  function handleClick() {
    console.log(
      movies.map((movie: any) => {
        return movie.title;
      })
    );
  }

  return (
    <div className="mt-10 mx-auto flex flex-col">
      <h1 className="text-2xl">Consumo de APIs</h1>
      <div className="grid grid-cols-5 gap-4 ">
        {movies.map((movie: any, index: any) => {
          return (
            <div key={index} className="w-52">
              <img
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt={movie.title}
              />
              <h2>{movie.title}</h2>
            </div>
          );
        })}
      </div>
      <button onClick={handleClick}>Click me</button>
    </div>
  );
}
