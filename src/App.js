import React, { useCallback, useEffect, useState } from 'react';

import MoviesList from './components/MoviesList';
import './App.css';
import MovieForm from './components/MovieForm';



function App() {


  const [movies, setMovies] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)

  const fetchMoviesHandler = useCallback(async () => {
    setIsLoading(true)
    setError(null)
    try {


      const response = await fetch('https://react-movie-2787c-default-rtdb.firebaseio.com/movies.json')
      const data = await response.json();

      if (!response.ok) {
        throw new Error("Something Went Wrong")


      }

      const loadedMovies = []


      for (const item in data) {
        loadedMovies.push({
          id: data,
          title: data[item].title,
          openingText: data[item].text,
          date: data[item].date
        })

      }

      setMovies(loadedMovies)



    } catch (error) {

      setError(error)

    }

    setIsLoading(false)




  }, [])

  useEffect(() => {
    fetchMoviesHandler()


  }, [fetchMoviesHandler])

  async function movieAddHandler(movie) {
    const resp = await fetch("https://react-movie-2787c-default-rtdb.firebaseio.com/movies.json", {
      method: "POST",
      body: JSON.stringify(movie)
    })
    fetchMoviesHandler()
  }


  return (
    <React.Fragment>
      <MovieForm onAddMovie={movieAddHandler} />
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
