import './index.css'
import Cookies from 'js-cookie'
import Header from '../Header'
import Footer from '../Footer'

const isAccount = true

const Account = props => {
  const letLogout = () => {
    Cookies.remove('jwt_token')
    const {history} = props
    history.replace('/login')
  }

  return (
    <div className="account-main-cont">
      <Header isAccount={isAccount} />
      <div className="account-cont">
        <h1 className="account-head">Account</h1>
        <hr className="hori-line" />
        <div className="membership-cont">
          <p className="member-ship">Member Ship</p>
          <div>
            <p className="gmail">rahul@gmail.com</p>
            <p className="password">Password : ************</p>
          </div>
        </div>
        <hr className="hori-line" />
        <div className="membership-cont">
          <p className="member-ship">Plan details</p>
          <p className="premium">Premium</p>
          <p className="plan-feature">Ultra HD</p>
        </div>
        <hr className="hori-line" />
        <div className="btn-cont">
          <button className="logout-btn" type="button" onClick={letLogout}>
            Logout
          </button>
        </div>
      </div>
      <Footer />
    </div>
  )
}
export default Account
