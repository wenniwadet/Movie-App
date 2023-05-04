import { Image, Empty } from 'antd'

import defaultImg from './default-image.png'
import './MoviePoster.css'

function MoviePoster({ poster }) {
  const posterImage = (
    <Image alt="movie poster" src={`https://image.tmdb.org/t/p/w500${poster}`} className="movie-card__img" />
  )

  const defaultImage = (
    <Empty style={{ margin: 0 }} image={defaultImg} description={false} className="movie-card__img" />
  )

  return <div className="movie-card__poster">{poster ? posterImage : defaultImage}</div>
}

export default MoviePoster
