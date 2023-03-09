import './index.css'
import {Link} from 'react-router-dom'

const HomeMovieSliderItems = props => {
  const {details} = props
  const {title, posterPath, id} = details

  return (
    <Link to={`/movies/${id}`}>
      <li>
        <img className="slider-img" alt={title} src={posterPath} />
      </li>
    </Link>
  )
}
export default HomeMovieSliderItems
