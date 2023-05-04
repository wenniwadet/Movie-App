import React from 'react'
import { format } from 'date-fns'
import { Typography, Tag, Rate } from 'antd'

import MoviePoster from '../MoviePoster'
import MovieService from '../../services/MovieService'
import MovieVoteAverage from '../MovieVoteAverage'
import GenresContext from '../GenresContext'
import MovieOverview from '../MovieOverview'

import './MovieCard.css'

export default class MovieCard extends React.Component {
  movieService = new MovieService()

  state = {
    isRated: false,
  }

  rateMovie = (value) => {
    const { id } = this.props

    this.movieService.rateMovie(id, value)
    this.setState({ isRated: true })
  }

  renderTags = (genres) => {
    const { genreIds } = this.props
    const notFoundTag = <Tag style={{ fontFamily: 'Inter' }}>Жанры не найдены</Tag>
    const tags = genreIds.map((id, idx) => {
      if (idx > 2) return
      const { name } = genres.find((el) => el.id === id)
      return (
        <Tag key={id} style={{ fontFamily: 'Inter' }}>
          {name}
        </Tag>
      )
    })

    return <div className="movie-card__tags">{genreIds.length !== 0 ? tags : notFoundTag}</div>
  }

  render() {
    const { isRated } = this.state
    const { title, overview, poster, voteAverage, releaseDate, rating, windowWidth } = this.props

    const convertDate = releaseDate ? format(new Date(releaseDate), ' MMMM d, yyyy') : 'Нет информации о дате релиза'

    return (
      <div className="movie-card">
        <MoviePoster poster={poster} />

        <div className="movie-card__header">
          <Typography.Title className="movie-card__title" level={3} ellipsis={{ rows: 2 }}>
            {title}
          </Typography.Title>
          <MovieVoteAverage voteAverage={voteAverage} />
        </div>

        <div className="movie-card__subheader">
          <span className="movie-card__release">{convertDate}</span>
          <GenresContext.Consumer>{(genres) => this.renderTags(genres)}</GenresContext.Consumer>
        </div>

        <MovieOverview overview={overview} windowWidth={windowWidth} />

        <Rate
          className="movie-card__rating"
          count={10}
          onChange={this.rateMovie}
          disabled={!!rating || isRated}
          defaultValue={rating}
        />
      </div>
    )
  }
}
