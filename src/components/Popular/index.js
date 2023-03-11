import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import Footer from '../Footer'
import Header from '../Header'
import MovieItems from '../MovieItems'
import './index.css'
import FailurePage from '../FailurePage'

const appConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  inProgress: 'INPROGRESS',
  failure: 'FAILURE',
}

const isPopular = true

class Popular extends Component {
  state = {appStatus: appConstants.initial, popularMoviesData: []}

  componentDidMount() {
    this.getPopularMoviesData()
  }

  getPopularMoviesData = async () => {
    this.setState({appStatus: appConstants.inProgress})
    const jwtToken = Cookies.get('jwt_token')
    const url = 'https://apis.ccbp.in/movies-app/popular-movies'
    const options = {
      method: 'GET',
      headers: {Authorization: `Bearer ${jwtToken}`},
    }
    const response = await fetch(url, options)
    const data = await response.json()
    if (response.ok) {
      const fetchedPopularMoviesData = data.results.map(eachMovie => ({
        backdropPath: eachMovie.backdrop_path,
        overview: eachMovie.overview,
        id: eachMovie.id,
        posterPath: eachMovie.poster_path,
        title: eachMovie.title,
      }))
      this.setState({
        appStatus: appConstants.success,
        popularMoviesData: fetchedPopularMoviesData,
      })
    } else {
      this.setState({appStatus: appConstants.failure})
    }
  }

  tryAgainForPopularMoviesData = () => {
    this.getPopularMoviesData()
  }

  successPopularMoviesView = () => {
    const {popularMoviesData} = this.state

    return (
      <>
        <ul className="popular-items">
          {popularMoviesData.map(each => (
            <MovieItems details={each} key={each.id} />
          ))}
        </ul>
      </>
    )
  }

  inProgressPopularMoviesView = () => (
    <>
      <div className="loader-container" testid="loader">
        <Loader type="TailSpin" color="#D81F26" height={50} width={50} />
      </div>
    </>
  )

  failurePopularMoviesView = () => (
    <FailurePage tryAgain={this.tryAgainForPopularMoviesData} />
  )

  renderPopularSwitchView = () => {
    const {appStatus} = this.state
    switch (appStatus) {
      case appConstants.success:
        return this.successPopularMoviesView()
      case appConstants.inProgress:
        return this.inProgressPopularMoviesView()
      case appConstants.failure:
        return this.failurePopularMoviesView()
      default:
        return null
    }
  }

  render() {
    return (
      <div className="popular-page">
        <Header isPopular={isPopular} />
        {this.renderPopularSwitchView()}
        <Footer />
      </div>
    )
  }
}
export default Popular
