import './index.css'

const FailurePage = props => {
  const {tryAgain} = props

  const tryAgainForData = () => {
    tryAgain()
  }

  return (
    <>
      <div className="failure-view">
        <img
          className="failure-img"
          alt="failure view"
          src="https://res.cloudinary.com/dkbxi5qts/image/upload/v1660153718/movies%20prime%20app/failure_img_vggqi4.svg"
        />
        <p className="failure-view-desc">
          Something went wrong, Please try again.
        </p>
        <button type="button" onClick={tryAgainForData} className="retry-btn">
          Try Again
        </button>
      </div>
    </>
  )
}
export default FailurePage
