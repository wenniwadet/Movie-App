import './MovieVoteAverage.css'

function MovieVoteAverage({ voteAverage }) {
  let circleColor = '#66E900'

  if (voteAverage < 3) {
    circleColor = '#E90000'
  }

  if (voteAverage >= 3 && voteAverage < 5) {
    circleColor = '#E97E00'
  }

  if (voteAverage >= 5 && voteAverage < 7) {
    circleColor = '#E9D100'
  }

  return (
    <div className="movie-card__vote-average" style={{ border: `2px solid ${circleColor}` }}>
      <span>{voteAverage.toFixed(1)}</span>
    </div>
  )
}

export default MovieVoteAverage
