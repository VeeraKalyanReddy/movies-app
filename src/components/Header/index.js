import {Component} from 'react'
import {Link} from 'react-router-dom'
import {HiOutlineSearch} from 'react-icons/hi'
import {MdMenuOpen} from 'react-icons/md'
import {AiFillCloseCircle} from 'react-icons/ai'
import './index.css'

class Header extends Component {
  state = {menuDisplay: false, searchValue: ''}

  getSearchInput = event => {
    this.setState({searchValue: event.target.value})
  }

  showMenu = () => {
    this.setState({menuDisplay: true})
  }

  hideMenu = () => {
    this.setState({menuDisplay: false})
  }

  searchOff = () => {
    const {getSearchResultData} = this.props
    const {searchValue} = this.state
    if (searchValue !== '') {
      getSearchResultData(searchValue)
    }
  }

  searchResultsOff = event => {
    const {getSearchResultData} = this.props
    const {searchValue} = this.state
    if (event.key === 'Enter') {
      getSearchResultData(searchValue)
    }
  }

  render() {
    const {menuDisplay, searchValue} = this.state
    const {searchRoute, isHome, isPopular, isAccount} = this.props

    const searchContainer = searchRoute
      ? 'search-input-route-container search-input-container'
      : 'search-input-container'
    const searchBtn = searchRoute
      ? 'search-route-btn search-button'
      : 'search-button'
    const searchIcon = searchRoute ? 'icons search-route-icon' : 'icons'

    const homeRoute = isHome ? 'menu-items highlight' : 'menu-items'
    const popularRoute = isPopular ? 'menu-items highlight' : 'menu-items'
    const accountRoute = isAccount ? 'menu-items highlight' : 'menu-items'

    return (
      <nav className="navbar">
        <div className="header">
          <Link to="/" className="img-link">
            <img
              className="header-logo"
              alt="website logo"
              src="https://res.cloudinary.com/dkbxi5qts/image/upload/v1660479354/Group_7399_nn7x3u.png"
            />
          </Link>
          <ul className="menu-options show1">
            <Link to="/" className={homeRoute}>
              <li>Home</li>
            </Link>
            <Link to="/popular" className={popularRoute}>
              <li>Popular</li>
            </Link>
          </ul>
          <div className="icons-cont">
            <div className={searchContainer}>
              {searchRoute && (
                <input
                  value={searchValue}
                  onChange={this.getSearchInput}
                  onKeyDown={this.searchResultsOff}
                  placeholder="Search"
                  type="search"
                  className="search-input"
                />
              )}
              <Link to="/search">
                <button
                  type="button"
                  onClick={this.searchOff}
                  testid="searchButton"
                  className={searchBtn}
                >
                  <HiOutlineSearch className={searchIcon} />
                </button>
              </Link>
            </div>
            <Link to="/account">
              <img
                className="account-avatar show1"
                alt="profile"
                src="https://res.cloudinary.com/dkbxi5qts/image/upload/v1660573232/Avatar_giy0y5.png"
              />
            </Link>
            <button
              onClick={this.showMenu}
              type="button"
              className="show close-btn"
            >
              <MdMenuOpen className="hamburger icons" />
            </button>
          </div>
        </div>
        <nav className="show">
          {menuDisplay && (
            <ul className="menu-options">
              <Link to="/" className={homeRoute}>
                <li>Home</li>
              </Link>
              <Link to="/popular" className={popularRoute}>
                <li>Popular</li>
              </Link>
              <Link to="/account" className={accountRoute}>
                <li>Account</li>
              </Link>
              <li>
                <button
                  onClick={this.hideMenu}
                  className="close-btn"
                  type="button"
                >
                  <AiFillCloseCircle className="close icons" />
                </button>
              </li>
            </ul>
          )}
        </nav>
      </nav>
    )
  }
}
export default Header
