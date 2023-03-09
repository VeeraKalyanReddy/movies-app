import './index.css'

const SimilarMovie = props => {
  const {details} = props
  const {posterPath, title} = details
  return (
    <li>
      <img className="similar-movie-img" alt={title} src={posterPath} />
    </li>
  )
}

export default SimilarMovie
