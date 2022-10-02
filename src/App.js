import React, { useState } from 'react';

import MoviesList from './components/MoviesList';
import './App.css';



function App() {


  const [movies, setMovies] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)

  async function fetchMoviesHandler() {
    setIsLoading(true)
    setError(null)
    try {


      const response = await fetch('https://swapi.dev/api/films')
      const data = await response.json();

      if (!response.ok) {
        throw new Error("Something Went Wrong")


      }



      const moviesData = data.results.map((item) => {


        return {
          id: item.episode_id,
          title: item.title,
          openingText: item.opening_crawl,
          releaseDate: item.release_date
        }
      })
      setMovies(moviesData)



    } catch (error) {

      setError(error)

    }

    setIsLoading(false)




  }


  return (
    <React.Fragment>
      <section>
        <button onClick={fetchMoviesHandler}>Fetch Movies</button>
      </section>
      <section>
        {!isLoading && movies.length > 0 && <MoviesList movies={movies} />}

        {!isLoading && movies.length === 0 && <p>NO movies found ;(</p>}

        {isLoading && <p>Loading....</p>}

        {!isLoading && error && <p>{error}</p>}
      </section>
    </React.Fragment>
  );
}

export default App;
