import {Link} from 'react-router-dom'
import './index.css'

const PopularMovieItems = props => {
  const {details} = props
  const {title, posterPath, id} = details

  return (
    <Link to={`/movies/${id}`}>
      <li>
        <img className="popular-img" alt={title} src={posterPath} />
      </li>
    </Link>
  )
}
export default PopularMovieItems
