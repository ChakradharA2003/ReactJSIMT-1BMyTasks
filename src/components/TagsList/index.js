import './index.css'

const TagsList = props => {
  const {details, isActive, onTagChanged} = props
  const {optionId, displayText} = details
  const buttonStyle = isActive ? 'active-tag-btn' : 'tag-btn'
  const tagClicked = () => {
    onTagChanged(optionId)
  }
  return (
    <li>
      <button type="button" className={buttonStyle} onClick={tagClicked}>
        {displayText}
      </button>
    </li>
  )
}
export default TagsList
