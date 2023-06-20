import './index.css'

const RepositoryItem = props => {
  const {cardDetails} = props
  const {name, avatarUrl, issuesCount, forksCount, starsCount} = cardDetails

  return (
    <li className="eachCard-item">
      <img className="eachCard-img" src={avatarUrl} alt={name} />
      <h1 className="eachCard-name">{name}</h1>
      <div>
        <div className="text-con">
          <img
            className="logo-sty"
            src="https://assets.ccbp.in/frontend/react-js/stars-count-img.png"
            alt="stars"
          />
          <p className="logo-title">{starsCount} stars</p>
        </div>

        <div className="text-con">
          <img
            className="logo-sty"
            src="https://assets.ccbp.in/frontend/react-js/forks-count-img.png"
            alt="forks"
          />
          <p className="logo-title">{forksCount} forks</p>
        </div>

        <div className="text-con">
          <img
            className="logo-sty"
            src="https://assets.ccbp.in/frontend/react-js/issues-count-img.png"
            alt="open issues"
          />
          <p className="logo-title">{issuesCount} open issues</p>
        </div>
      </div>
    </li>
  )
}

export default RepositoryItem
