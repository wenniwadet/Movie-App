import React from 'react'
import { debounce } from 'lodash'
import { Online } from 'react-detect-offline'

import MovieService from '../../services/MovieService'
import MoviePagination from '../MoviePagination'
import PageContent from '../PageContent'
import GenresContext from '../GenresContext'

import './App.css'

export default class App extends React.Component {
  movieService = new MovieService()

  state = {
    activeTab: 'Search',
    loading: true,
    error: false,
    queryMovie: '',
    currentPage: 1,
    movies: [],
    totalMovies: null,
    genres: this.updateGenres(),
    windowWidth: window.innerWidth,
  }

  componentDidMount() {
    this.updateMovies()

    if (!localStorage.getItem('sessionId')) {
      this.movieService.createGuestSession()
    }

    window.addEventListener('resize', () => {
      this.setState({ windowWidth: window.innerWidth })
    })
  }

  componentDidUpdate(prevProps, prevState) {
    const { queryMovie, currentPage } = this.state

    if (prevState.queryMovie !== queryMovie) {
      this.setState({ currentPage: 1 })
      this.updateMovies(currentPage, queryMovie)
    }
  }

  changePage = (currentPage) => {
    const { activeTab, queryMovie } = this.state

    this.setState({ currentPage })

    if (activeTab === 'Search') {
      this.updateMovies(currentPage, queryMovie)
    } else {
      this.updateRatedMovies(currentPage)
    }

    window.scrollTo(0, 0)
  }

  changeQueryMovie = ({ target }) => {
    this.setState({ queryMovie: target.value })
  }

  changeTab = (key) => {
    const { queryMovie } = this.state
    if (key === 2) {
      this.setState({ activeTab: 'Rated', currentPage: 1 })
      this.updateRatedMovies()
    } else {
      this.setState({ activeTab: 'Search', currentPage: 1 })
      this.updateMovies(1, queryMovie)
    }
  }

  async updateRatedMovies(page = 1) {
    this.setState({ loading: true })

    try {
      const [totalMovies, movies] = await this.movieService.getRateMovies(page)

      this.setState({ movies, totalMovies, loading: false })
    } catch (error) {
      this.setState({ loading: false, error: true })
    }
  }

  async updateMovies(page = 1, query = '') {
    this.setState({ loading: true })

    try {
      const [totalMovies, movies] = await this.movieService.getMovies(page, query || 'a')
      this.setState({ movies, totalMovies, loading: false })
    } catch (error) {
      this.setState({ loading: false, error: true })
    }
  }

  async updateGenres() {
    try {
      const res = await this.movieService.getGenresMovies()
      this.setState({ genres: res })
    } catch (error) {
      this.setState({ error: true })
    }
  }

  render() {
    const { movies, loading, error, activeTab, currentPage, queryMovie, totalMovies, genres, windowWidth } = this.state

    const pagination = (
      <Online polling={{ enabled: false }}>
        <MoviePagination totalMovies={totalMovies} onChangePage={this.changePage} currentPage={currentPage} />
      </Online>
    )

    return (
      <section className="movies">
        <GenresContext.Provider value={genres}>
          <PageContent
            movies={movies}
            loading={loading}
            error={error}
            activeTab={activeTab}
            query={queryMovie}
            onChangeTab={this.changeTab}
            onChangeQuery={debounce(this.changeQueryMovie, 700)}
            windowWidth={windowWidth}
          />
        </GenresContext.Provider>
        {!(loading || error) ? pagination : null}
      </section>
    )
  }
}
