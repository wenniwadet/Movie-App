export default class MovieService {
  static transformMovie(movie) {
    return {
      id: movie.id,
      title: movie.title.toLowerCase(),
      overview: movie.overview,
      poster: movie.poster_path,
      voteAverage: movie.vote_average,
      releaseDate: movie.release_date,
      rating: movie.rating,
      genreIds: movie.genre_ids,
    }
  }

  apiBase = 'https://api.themoviedb.org/3'

  apiKey = 'api_key=b356fc84828216ef45f9e81370d479a3'

  sessionId = localStorage.getItem('sessionId')

  async getResource(resource, parameters = '') {
    const url = `${this.apiBase}/${resource}?${this.apiKey}${parameters}`

    const res = await fetch(url)

    if (!res.ok) {
      throw new Error('Запрос не удалось отправить')
    }

    return res.json()
  }

  async getMovies(page, query) {
    const parameters = `&include_adult=false&page=${page}&query=${query}`

    const res = await this.getResource('search/movie', parameters)

    return [res.total_results, res.results.map(MovieService.transformMovie)]
  }

  async createGuestSession() {
    const res = await this.getResource('authentication/guest_session/new')

    localStorage.setItem('sessionId', res.guest_session_id)
  }

  async rateMovie(id, rating) {
    const resource = `movie/${id}/rating`
    const parameters = `&guest_session_id=${this.sessionId}`
    const url = `${this.apiBase}/${resource}?${this.apiKey}${parameters}`
    const res = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
      },
      body: JSON.stringify({ value: rating }),
    })

    if (!res.ok) {
      throw new Error('Запрос не удалось отправить')
    }
  }

  async getRateMovies(page) {
    const parameters = `&page=${page}&language=en-US&sort_by=created_at.asc`
    const resource = `guest_session/${this.sessionId}/rated/movies`

    const res = await this.getResource(resource, parameters)

    return [res.total_results, res.results.map(MovieService.transformMovie)]
  }

  async getGenresMovies() {
    const parameters = '&language=en-US'
    const resource = 'genre/movie/list'

    const { genres } = await this.getResource(resource, parameters)

    return genres
  }
}
