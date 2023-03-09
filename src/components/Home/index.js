import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import Slider from 'react-slick'
import HomeMovieSliderItems from '../HomeMovieSliderItems'
import Footer from '../Footer'
import './index.css'
import Header from '../Header'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'

const settings = {
  dots: false,
  infinite: false,
  speed: 500,
  slidesToShow: 4,
  slidesToScroll: 3,

  responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 4,
        slidesToScroll: 3,
      },
    },
    {
      breakpoint: 400,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 2,
      },
    },
  ],
}

const appOriginalConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  inProgress: 'INPROGRESS',
  failure: 'FAILURE',
}

const appTrendingConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  inProgress: 'INPROGRESS',
  failure: 'FAILURE',
}
const appTopRatedConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  inProgress: 'INPROGRESS',
  failure: 'FAILURE',
}

const isHome = true

class Home extends Component {
  state = {
    appTrendingStatus: appTrendingConstants.initial,
    appOriginalsStatus: appOriginalConstants.initial,
    appTopRatedStatus: appTopRatedConstants.initial,
    trendingMovies: [],
    topRatedMovies: [],
    originalsMovies: [],
    randomMovies: [],
  }

  componentDidMount() {
    this.getTrendingMovies()
    this.getTopRatedMovies()
    this.getOriginalsMovies()
  }

  getTrendingMovies = async () => {
    this.setState({appTrendingStatus: appTrendingConstants.inProgress})
    const jwtToken = Cookies.get('jwt_token')
    const trendingUrl = 'https://apis.ccbp.in/movies-app/trending-movies'
    const options = {
      method: 'GET',
      headers: {Authorization: `Bearer ${jwtToken}`},
    }
    const response = await fetch(trendingUrl, options)
    const data = await response.json()
    if (response.ok) {
      const fetchedTrendingData = data.results.map(eachMovie => ({
        backdropPath: eachMovie.backdrop_path,
        overview: eachMovie.overview,
        id: eachMovie.id,
        posterPath: eachMovie.poster_path,
        title: eachMovie.title,
      }))
      this.setState({
        appTrendingStatus: appTrendingConstants.success,
        trendingMovies: fetchedTrendingData,
      })
    } else {
      this.setState({appTrendingStatus: appTrendingConstants.failure})
    }
  }

  getTopRatedMovies = async () => {
    this.setState({appTopRatedStatus: appTopRatedConstants.inProgress})
    const jwtToken = Cookies.get('jwt_token')
    const topRatedUrl = 'https://apis.ccbp.in/movies-app/top-rated-movies'
    const options = {
      method: 'GET',
      headers: {Authorization: `Bearer ${jwtToken}`},
    }
    const response = await fetch(topRatedUrl, options)
    const data = await response.json()
    if (response.ok) {
      const fetchedTopRatedData = data.results.map(eachMovie => ({
        backdropPath: eachMovie.backdrop_path,
        overview: eachMovie.overview,
        id: eachMovie.id,
        posterPath: eachMovie.poster_path,
        title: eachMovie.title,
      }))
      this.setState({
        appTopRatedStatus: appTopRatedConstants.success,
        topRatedMovies: fetchedTopRatedData,
      })
    } else {
      this.setState({appTopRatedStatus: appTopRatedConstants.failure})
    }
  }

  getOriginalsMovies = async () => {
    this.setState({appOriginalsStatus: appOriginalConstants.inProgress})
    const jwtToken = Cookies.get('jwt_token')
    const OriginalsUrl = 'https://apis.ccbp.in/movies-app/originals'
    const options = {
      method: 'GET',
      headers: {Authorization: `Bearer ${jwtToken}`},
    }
    const response = await fetch(OriginalsUrl, options)
    const data = await response.json()
    if (response.ok) {
      const fetchedOriginalsData = data.results.map(eachMovie => ({
        backdropPath: eachMovie.backdrop_path,
        overview: eachMovie.overview,
        id: eachMovie.id,
        posterPath: eachMovie.poster_path,
        title: eachMovie.title,
      }))
      const randomNum = Math.floor(Math.random() * fetchedOriginalsData.length)
      const randomMovie = fetchedOriginalsData[randomNum]
      this.setState({
        appOriginalsStatus: appOriginalConstants.success,
        originalsMovies: fetchedOriginalsData,
        randomMovies: randomMovie,
      })
    } else {
      this.setState({appOriginalsStatus: appOriginalConstants.failure})
    }
  }

  retryTrendingMoviesData = () => {
    this.getTrendingMovies()
  }

  retryTopRatedMoviesData = () => {
    this.getTopRatedMovies()
  }

  retryOriginalsMoviesData = () => {
    this.getOriginalsMovies()
  }

  successHomePosterView = () => {
    const {randomMovies} = this.state
    const {title, overview, backdropPath} = randomMovies

    return (
      <div
        style={{backgroundImage: `url(${backdropPath})`}}
        className="home-page"
      >
        <Header isHome={isHome} />
        <div className="home-poster">
          <h1 className="title">{title}</h1>
          <h1 className="over-view">{overview}</h1>
          <button type="button" className="play-btn">
            Play
          </button>
        </div>
      </div>
    )
  }

  successTrendingView = () => {
    const {trendingMovies} = this.state

    return (
      <>
        <div className="movie-slider-cont">
          <Slider className="slick" {...settings}>
            {trendingMovies.map(eachMovie => (
              <HomeMovieSliderItems details={eachMovie} key={eachMovie.id} />
            ))}
          </Slider>
        </div>
      </>
    )
  }

  successTopRatedView = () => {
    const {topRatedMovies} = this.state

    return (
      <>
        <div className="movie-slider-cont">
          <Slider className="slick" {...settings}>
            {topRatedMovies.map(eachMovie => (
              <HomeMovieSliderItems details={eachMovie} key={eachMovie.id} />
            ))}
          </Slider>
        </div>
      </>
    )
  }

  successOriginalsView = () => {
    const {originalsMovies} = this.state

    return (
      <>
        <div className="movie-slider-cont">
          <Slider className="slick" {...settings}>
            {originalsMovies.map(eachMovie => (
              <HomeMovieSliderItems details={eachMovie} key={eachMovie.id} />
            ))}
          </Slider>
        </div>
      </>
    )
  }

  inProgressView = () => (
    <div className="error-cont">
      <div className="error-page">
        <div className="loader-container" testid="loader">
          <Loader type="TailSpin" color="#D81F26" height={50} width={50} />
        </div>
      </div>
    </div>
  )

  failureTrendingView = () => (
    <div className="error-cont">
      <div className="error-page">
        <img
          className="thumbnail-warning-icon"
          alt="failure view"
          src="https://res.cloudinary.com/dkbxi5qts/image/upload/v1660451047/movies%20prime%20app/alert-triangle_najaul.png"
        />
        <p className="thumbnail-error-msg">
          Something went wrong. Please try again
        </p>
        <button
          onClick={this.retryTrendingMoviesData}
          className="thumbnail-try-again-btn"
          type="button"
        >
          Try Again
        </button>
      </div>
    </div>
  )

  failureTopRatedView = () => (
    <div className="error-cont">
      <div className="error-page">
        <img
          className="thumbnail-warning-icon"
          alt="failure view"
          src="https://res.cloudinary.com/dkbxi5qts/image/upload/v1660451047/movies%20prime%20app/alert-triangle_najaul.png"
        />
        <p className="thumbnail-error-msg">
          Something went wrong. Please try again
        </p>
        <button
          onClick={this.retryTopRatedMoviesData}
          className="thumbnail-try-again-btn"
          type="button"
        >
          Try Again
        </button>
      </div>
    </div>
  )

  failureOriginalsView = () => (
    <div className="error-cont">
      <div className="error-page">
        <img
          className="thumbnail-warning-icon"
          alt="failure view"
          src="https://res.cloudinary.com/dkbxi5qts/image/upload/v1660451047/movies%20prime%20app/alert-triangle_najaul.png"
        />
        <p className="thumbnail-error-msg">
          Something went wrong. Please try again
        </p>
        <button
          onClick={this.retryOriginalsMoviesData}
          className="thumbnail-try-again-btn"
          type="button"
        >
          Try Again
        </button>
      </div>
    </div>
  )

  inProgressHomePosterView = () => (
    <>
      <Header />
      <div className="error-cont">
        <div className="home-poster-error-page">
          <div className="loader-container" testid="loader">
            <Loader type="TailSpin" color="#D81F26" height={50} width={50} />
          </div>
        </div>
      </div>
    </>
  )

  failureHomePosterView = () => (
    <>
      <Header />
      <div className="error-cont">
        <div className="home-poster-error-page">
          <img
            className="warning-icon"
            alt="failure view"
            src="https://res.cloudinary.com/dkbxi5qts/image/upload/v1660451047/movies%20prime%20app/alert-triangle_najaul.png"
          />
          <p className="home-poster-error-desc">
            Something went wrong. Please try again
          </p>
          <button
            className="home-poster-error-btn"
            type="button"
            onClick={this.retryOriginalsMoviesData}
          >
            Try Again
          </button>
        </div>
      </div>
    </>
  )

  renderOriginalsSlider = () => {
    const {appOriginalsStatus} = this.state
    switch (appOriginalsStatus) {
      case appOriginalConstants.success:
        return this.successOriginalsView()
      case appOriginalConstants.inProgress:
        return this.inProgressView()
      case appOriginalConstants.failure:
        return this.failureOriginalsView()
      default:
        return null
    }
  }

  renderTopRatedSlider = () => {
    const {appTopRatedStatus} = this.state
    switch (appTopRatedStatus) {
      case appTrendingConstants.success:
        return this.successTopRatedView()
      case appTopRatedConstants.inProgress:
        return this.inProgressView()
      case appTopRatedConstants.failure:
        return this.failureTopRatedView()
      default:
        return null
    }
  }

  renderTrendingSlider = () => {
    const {appTrendingStatus} = this.state
    switch (appTrendingStatus) {
      case appTrendingConstants.success:
        return this.successTrendingView()
      case appTrendingConstants.inProgress:
        return this.inProgressView()
      case appTrendingConstants.failure:
        return this.failureTrendingView()
      default:
        return null
    }
  }

  renderHomePosterView = () => {
    const {appOriginalsStatus} = this.state
    switch (appOriginalsStatus) {
      case appOriginalConstants.success:
        return this.successHomePosterView()
      case appOriginalConstants.inProgress:
        return this.inProgressHomePosterView()
      case appOriginalConstants.failure:
        return this.failureHomePosterView()
      default:
        return null
    }
  }

  render() {
    return (
      <div className="home-bg-cont">
        {this.renderHomePosterView()}
        <h1 className="home-section-wise-name">Trending Now</h1>
        {this.renderTrendingSlider()}
        <h1 className="home-section-wise-name">Top Rated</h1>
        {this.renderTopRatedSlider()}
        <h1 className="home-section-wise-name">Originals</h1>
        {this.renderOriginalsSlider()}
        <Footer />
      </div>
    )
  }
}
export default Home
