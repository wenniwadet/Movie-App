import React from 'react'

import './MovieOverview.css'

export default class MovieOverview extends React.Component {
  static truncate(str, maxLength) {
    if (str.length <= maxLength) {
      return str
    }

    const index = str.lastIndexOf(' ', maxLength)
    return `${str.slice(0, index)} …`
  }

  state = {
    text: this.props.overview,
    paragraphHeight: null,
  }

  paragraph = React.createRef()

  componentDidMount() {
    const { current } = this.paragraph

    this.setState({ paragraphHeight: current.clientHeight })
  }

  componentDidUpdate(prevProps, prevState) {
    const { paragraphHeight } = this.state
    const { windowWidth } = this.props
    const { current } = this.paragraph

    if (prevProps.windowWidth !== windowWidth) {
      this.setState({ paragraphHeight: current.clientHeight })
    }

    if (prevState.paragraphHeight !== paragraphHeight) {
      this.updateTruncate()
    }
  }

  updateTruncate = () => {
    const { paragraphHeight } = this.state
    const { overview, windowWidth } = this.props

    const line = Math.floor(paragraphHeight / 22)
    let truncateText = MovieOverview.truncate(overview, line * 34)

    if (windowWidth <= 960) truncateText = MovieOverview.truncate(overview, line * 55)
    if (windowWidth <= 768) truncateText = MovieOverview.truncate(overview, line * 70)
    if (windowWidth <= 570) truncateText = MovieOverview.truncate(overview, line * 40)
    if (windowWidth <= 500) truncateText = MovieOverview.truncate(overview, line * 47)

    this.setState({ text: truncateText })
  }

  render() {
    const { text } = this.state

    const notFoundOverview = 'Описание фильма отсуствует'

    return (
      <p className="movie-card__overview" ref={this.paragraph}>
        {text || notFoundOverview}
      </p>
    )
  }
}
