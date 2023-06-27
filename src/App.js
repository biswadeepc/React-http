import React,{ useState, useCallback, useEffect } from 'react';

import AddMovie from './components/AddMovie';
import MoviesList from './components/MoviesList';
import './App.css';

function App() {
  const [movies, setMovies] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchMoviesAsyncAwaitHandler = useCallback(async () => {
    setLoading(true);
    setError(null);
    try{
        const response = await fetch('https://react-demo-1775-default-rtdb.asia-southeast1.firebasedatabase.app/movies.json');
        if(!response.ok){
          throw new Error('Something went wrong!');
        }
        const data = await response.json();
        console.log(data);
        const loadedMovies = []
        for(let key in data){
          loadedMovies.push({
            id: key,
            title : data[key].title,
            openingText: data[key].openingText,
            releaseDate: data[key].releaseDate
          })
        }
        // const transformedMoviesWithAsyncAwait = data.results.map((movieData) => {
        //   return {
        //     id : movieData.episode_id,
        //     title : movieData.title,
        //     openingText : movieData.opening_crawl,
        //     releaseDate : movieData.release_date,
        //   }
        // })
        setMovies(loadedMovies);
      }
      catch(error){
        setError(error.message);
      }
    setLoading(false);
  }, [])


  useEffect(()=> { fetchMoviesAsyncAwaitHandler();
      }, [fetchMoviesAsyncAwaitHandler]);

  async function AddMovieHandler(movie){
    const response = await fetch('https://react-demo-1775-default-rtdb.asia-southeast1.firebasedatabase.app/movies.json', {
      method: 'POST',
      body: JSON.stringify(movie),
      headers: {
        'Content-Type': 'application/json'
      }
    })

    const data = await response.json();
    console.log(data);
  }
  // const fetchMoviesPromiseHandler = () => {
  //   fetch('https://swapi.dev/api/films')
  //   .then(response=> {
  //     return response.json();
  //   })
  //   .then(data => {
  //     const transformedMovies = data.results.map((movieData) => {
  //       return {
  //         id : movieData.episode_id,
  //         title : movieData.title,
  //         openingText : movieData.opening_crawl,
  //         releaseDate : movieData.release_date,
  //       }
  //     })
  //     setMovies(transformedMovies);
  //   })
  // }
  
  // const dummyMovies = [
  //   {
  //     id: 1,
  //     title: 'Some Dummy Movie',
  //     openingText: 'This is the opening text of the movieData',
  //     releaseDate: '2021-05-18',
  //   },
  //   {
  //     id: 2,
  //     title: 'Some Dummy Movie 2',
  //     openingText: 'This is the second opening text of the movieData',
  //     releaseDate: '2021-05-19',
  //   },
  // ];

  return (
    <React.Fragment>
      <section>
        <AddMovie onAddMovie={AddMovieHandler} />
      </section>
      <section>
        <button onClick={fetchMoviesAsyncAwaitHandler}>Fetch Movies</button>
      </section>
      <section>
        {error && <p>{error}</p>}
        {!isLoading && movies.length === 0 && !error && <p>Click to fetch movies..</p>}
        {!isLoading && movies.length > 0 && !error && <MoviesList movies={movies} />}
        {isLoading && !error && <p>Loading movies....</p>}
      </section>
    </React.Fragment>
  );
}

export default App;
