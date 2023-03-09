import './index.css'
import {Link} from 'react-router-dom'

const NotFound = () => (
  <div className="not-found-main-cont">
    <div className="not-found-desc">
      <h1 className="not-found-head">Lost Your Way?</h1>
      <p className="not-found-para">
        we are sorry, the page you requested could not be found
        <br /> Please go back to the homepage.
      </p>
      <Link to="/">
        <button className="not-found-btn" type="button">
          Go to Home
        </button>
      </Link>
    </div>
  </div>
)
export default NotFound
