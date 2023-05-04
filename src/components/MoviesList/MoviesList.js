import { Online } from 'react-detect-offline'

import MovieCard from '../MovieCard'
import Spinner from '../Spinner'
import DisconnectMessage from '../DisconnectMessage'
import ErrorMessage from '../ErrorMessage'

import './MoviesList.css'

function MoviesList({ movies, loading, activeTab, error, windowWidth }) {
  function renderMovies(arr) {
    return arr.map((movie) => {
      const { id, title, overview, poster, voteAverage, releaseDate, rating, genreIds } = movie
      return (
        <MovieCard
          key={id}
          id={id}
          title={title}
          overview={overview}
          poster={poster}
          voteAverage={voteAverage}
          releaseDate={releaseDate}
          rating={activeTab === 'Rated' ? rating : null}
          genreIds={genreIds}
          windowWidth={windowWidth}
        />
      )
    })
  }

  let notFoundMessage = null

  if (activeTab === 'Search') {
    notFoundMessage = <span className="movies__not-found">К сожалению, по вашему запросу ничего не найдено...</span>
  } else {
    notFoundMessage = <span className="movies__not-found">У вас пока нет оценнёных фильмов</span>
  }

  const errorMessage = error ? <ErrorMessage /> : null
  const notFound = movies.length === 0 && !(loading || error) ? notFoundMessage : null
  const movieList = !loading ? renderMovies(movies) : null
  const content = movies.length !== 0 && !(loading || error) ? movieList : notFound

  return (
    <>
      <DisconnectMessage />
      <Online polling={{ enabled: false }}>
        <div className="movie-list">
          <Spinner loading={loading} />
          {errorMessage}
          {content}
        </div>
      </Online>
    </>
  )
}

export default MoviesList
