import {Component} from 'react'

import {format} from 'date-fns'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import Header from '../Header'
import Footer from '../Footer'
import SimilarMovie from '../SimilarMovie'
import './index.css'

const GenreList = props => {
  const {details} = props
  const {name} = details
  return (
    <li className="info-items list-item">
      <p>{name}</p>
    </li>
  )
}

const Languages = props => {
  const {details} = props
  const {englishName} = details
  return (
    <li className="info-items list-item">
      <p>{englishName}</p>
    </li>
  )
}

const appConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  inProgress: 'INPROGRESS',
  failure: 'FAILURE',
}

class MovieItemDetails extends Component {
  state = {appStatus: appConstants.initial, movieItemDetailsList: []}

  componentDidMount() {
    this.getMovieItemDetails()
  }

  getMovieItemDetails = async () => {
    this.setState({appStatus: appConstants.inProgress})
    const jwtToken = Cookies.get('jwt_token')
    const {match} = this.props
    const {params} = match
    const {id} = params
    const url = `https://apis.ccbp.in/movies-app/movies/${id}`
    const options = {
      method: 'GET',
      headers: {Authorization: `Bearer ${jwtToken}`},
    }
    const response = await fetch(url, options)
    const data = await response.json()
    if (response.ok) {
      const fetchedGenresList = data.movie_details.genres.map(eachGenre => ({
        id: eachGenre.id,
        name: eachGenre.name,
      }))
      const fetchedSimilarMovies = data.movie_details.similar_movies.map(
        eachMovie => ({
          backdropPath: eachMovie.backdrop_path,
          id: eachMovie.id,
          posterPath: eachMovie.poster_path,
          title: eachMovie.title,
        }),
      )
      const fetchedSpokenLanguages = data.movie_details.spoken_languages.map(
        eachLanguage => ({
          id: eachLanguage.id,
          englishName: eachLanguage.english_name,
        }),
      )
      const fetchedData = {
        adult: data.movie_details.adult,
        backdropPath: data.movie_details.backdrop_path,
        budget: data.movie_details.budget,
        genres: fetchedGenresList,
        id: data.movie_details.id,
        overview: data.movie_details.overview,
        posterPath: data.movie_details.poster_path,
        releaseDate: data.movie_details.release_date,
        runtime: data.movie_details.runtime,
        similarMovies: fetchedSimilarMovies,
        spokenLanguages: fetchedSpokenLanguages,
        title: data.movie_details.title,
        voteAverage: data.movie_details.vote_average,
        voteCount: data.movie_details.vote_count,
      }
      this.setState({
        appStatus: appConstants.success,
        movieItemDetailsList: fetchedData,
      })
    } else {
      this.setState({appStatus: appConstants.failure})
    }
  }

  tryAgainForMovieItemDetails = () => {
    this.getMovieItemDetails()
  }

  successMovieItemDetailsView = () => {
    const {movieItemDetailsList} = this.state
    const {
      adult,
      backdropPath,
      budget,
      genres,
      overview,
      releaseDate,
      runtime,
      similarMovies,
      spokenLanguages,
      title,
      voteAverage,
      voteCount,
    } = movieItemDetailsList
    const runtimeInHours = Math.floor(runtime / 60)
    const runtimeInMin = runtime % 60
    const runtimeInHoursAndMinutes = `${runtimeInHours}h ${runtimeInMin}m`
    const certificateName = adult ? 'A' : 'U/A'
    const releasedYear = format(new Date(releaseDate), 'yyyy')
    const releasedDate = format(new Date(releaseDate), 'do MMMM yyyy')
    return (
      <>
        <div
          style={{backgroundImage: `url(${backdropPath})`}}
          className="movie-item-details-page"
        >
          <Header />
          <div className="movie-item-poster-details">
            <h1 className="mid-title">{title}</h1>
            <div className="more-details">
              <p className="time">{runtimeInHoursAndMinutes}</p>
              <p className="certificate">{certificateName}</p>
              <p className="year">{releasedYear}</p>
            </div>
            <p className="overview">{overview}</p>
            <button type="button" className="play-btn">
              Play
            </button>
          </div>
        </div>
        <div className="additional-information">
          <div className="movie-details">
            <div className="info">
              <h1 className="info-heading">Genres</h1>
              <ul className="list-items">
                {genres.map(eachItem => (
                  <GenreList details={eachItem} key={eachItem.id} />
                ))}
              </ul>
            </div>
            <div className="info">
              <h1 className="info-heading">Audio Available</h1>
              <ul className="list-items">
                {spokenLanguages.map(eachItem => (
                  <Languages details={eachItem} key={eachItem.id} />
                ))}
              </ul>
            </div>
            <div className="info">
              <h1 className="info-heading">Rating Count</h1>
              <p className="info-items info-name">{voteCount}</p>
              <h1 className="info-heading">Rating Average</h1>
              <p className="info-items info-name">{voteAverage}</p>
            </div>
            <div className="info info1">
              <h1 className="info-heading">Budget</h1>
              <p className="info-items info-name">{budget}</p>
              <h1 className="info-heading">Release Date</h1>
              <p className="info-items info-name">{releasedDate}</p>
            </div>
          </div>
          <div className="similar-movies-cont">
            <h1 className="similar-movies-head">More like this</h1>
            <ul className="similar-movies-list">
              {similarMovies.map(eachMovie => (
                <SimilarMovie details={eachMovie} key={eachMovie.id} />
              ))}
            </ul>
          </div>
          <Footer />
        </div>
      </>
    )
  }

  inProgressMovieItemDetailsView = () => (
    <>
      <Header />
      <div className="loader-container" testid="loader">
        <Loader type="TailSpin" color="#D81F26" height={50} width={50} />
      </div>
    </>
  )

  failureMovieItemDetailsView = () => (
    <>
      <Header />
      <div className="failure-view">
        <img
          className="failure-img"
          alt="failure view"
          src="https://res.cloudinary.com/dkbxi5qts/image/upload/v1660153718/movies%20prime%20app/failure_img_vggqi4.svg"
        />
        <p className="failure-view-desc">
          Something went wrong, Please try again.
        </p>
        <button
          onClick={this.tryAgainForMovieItemDetails}
          className="retry-btn"
          type="button"
        >
          Try Again
        </button>
      </div>
    </>
  )

  renderMovieItemDetailsView = () => {
    const {appStatus} = this.state
    switch (appStatus) {
      case appConstants.success:
        return this.successMovieItemDetailsView()
      case appConstants.inProgress:
        return this.inProgressMovieItemDetailsView()
      case appConstants.failure:
        return this.failureMovieItemDetailsView()
      default:
        return null
    }
  }

  render() {
    return (
      <div className="movie-item-details-main-page">
        {this.renderMovieItemDetailsView()}
      </div>
    )
  }
}
export default MovieItemDetails
