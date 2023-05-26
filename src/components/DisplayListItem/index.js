import './index.css'

const DisplayListItem = props => {
  const {each} = props
  return (
    <li>
      <div className="container7">
        <img src={each.imageUrl} alt={each.name} className="image2" />
        <p>{each.name}</p>
      </div>
    </li>
  )
}
export default DisplayListItem
