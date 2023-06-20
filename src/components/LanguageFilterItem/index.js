import './index.css'

const languageFilterItem = props => {
  const {languageDetails, onChangeTabId, isActive} = props
  const {id, language} = languageDetails

  const tabShift = () => {
    onChangeTabId(id)
  }

  const activeClass = isActive ? 'active' : ''

  return (
    <li className="eachTabItem-sty">
      <button
        className={`btn-sty ${activeClass}`}
        type="button"
        onClick={tabShift}
      >
        {language}
      </button>
    </li>
  )
}
export default languageFilterItem
