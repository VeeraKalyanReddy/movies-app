import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import Header from '../Header'
import MovieItems from '../MovieItems'
import FailurePage from '../FailurePage'
import './index.css'

const appConstants = {
  initial: 'INITIAL',
  inProgress: 'INPROGRESS',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

const searchRoute = true

class Search extends Component {
  state = {appStatus: appConstants.initial, searchValue: '', searchResults: []}

  getSearchResultData = async searchValue => {
    this.setState({appStatus: appConstants.inProgress})
    const jwtToken = Cookies.get('jwt_token')
    const url = `https://apis.ccbp.in/movies-app/movies-search?search=${searchValue}`
    const options = {
      method: 'GET',
      headers: {Authorization: `Bearer ${jwtToken}`},
    }
    const response = await fetch(url, options)
    const data = await response.json()
    if (response.ok) {
      const fetchedSearchResults = data.results.map(eachMovie => ({
        backdropPath: eachMovie.backdrop_path,
        id: eachMovie.id,
        posterPath: eachMovie.poster_path,
        title: eachMovie.title,
      }))
      this.setState({
        appStatus: appConstants.success,
        searchResults: fetchedSearchResults,
        searchValue,
      })
    } else {
      this.setState({
        appStatus: appConstants.failure,
        searchResults: [],
        searchValue: '',
      })
    }
  }

  successSearchResultsView = () => {
    const {searchResults} = this.state
    return searchResults.length > 0 ? (
      <ul className="search-items">
        {searchResults.map(eachItem => (
          <MovieItems details={eachItem} key={eachItem.id} />
        ))}
      </ul>
    ) : (
      this.renderNoSearchResultsView()
    )
  }

  renderNoSearchResultsView = () => {
    const {searchValue} = this.state
    return (
      <div className="no-results-view">
        <img
          className="no-results-img"
          alt="no movies"
          src="https://res.cloudinary.com/dkbxi5qts/image/upload/v1660153718/movies%20prime%20app/No_Views_awtv8d.svg"
        />
        <p className="no-results-text">
          Your search for {searchValue} did not find any matches.
        </p>
      </div>
    )
  }

  inProgressSearchResultsView = () => (
    <div className="loader-container" testid="loader">
      <Loader type="TailSpin" color="#D81F26" height={50} width={50} />
    </div>
  )

  tryAgainForSearchResultsData = searchValue => {
    this.getSearchResultData(searchValue)
  }

  failureSearchResultsView = () => {
    const {searchValue} = this.state
    return (
      <FailurePage
        searchValue={searchValue}
        tryAgain={this.tryAgainForSearchResultsData}
      />
    )
  }

  renderSearchView = () => {
    const {appStatus} = this.state
    switch (appStatus) {
      case appConstants.success:
        return this.successSearchResultsView()
      case appConstants.inProgress:
        return this.inProgressSearchResultsView()
      case appConstants.failure:
        return this.failureSearchResultsView()
      default:
        return null
    }
  }

  render() {
    return (
      <div className="search-main-cont">
        <Header
          getSearchResultData={this.getSearchResultData}
          searchRoute={searchRoute}
        />
        <div className="search-cont">{this.renderSearchView()}</div>
      </div>
    )
  }
}
export default Search
