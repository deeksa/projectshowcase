import {Component} from 'react'
import Loader from 'react-loader-spinner'
import DisplayListItem from '../DisplayListItem'
import './index.css'

const apiConstants = {
  inprogress: 'INPROGRESS',
  success: 'SUCCESS',
  failure: 'FAILURE',
}
const categoriesList = [
  {id: 'ALL', displayText: 'All'},
  {id: 'STATIC', displayText: 'Static'},
  {id: 'RESPONSIVE', displayText: 'Responsive'},
  {id: 'DYNAMIC', displayText: 'Dynamic'},
  {id: 'REACT', displayText: 'React'},
]

class ProjectsShowcase extends Component {
  state = {
    selectedOption: 'ALL',
    selectedCategoryList: [],
    apiStatus: '',
  }

  componentDidMount() {
    this.getSelectedList()
  }

  onChangeOption = event => {
    this.setState({selectedOption: event.target.value}, this.getSelectedList())
  }

  getUpdatedObject = e => ({
    id: e.id,
    name: e.name,
    imageUrl: e.image_url,
  })

  renderLoader = () => (
    <div data-testid="loader">
      <Loader type="ThreeDots" color="#0b69ff" height="50" width="50" />
    </div>
  )

  getSelectedList = async () => {
    this.setState({
      apiStatus: apiConstants.inprogress,
    })

    const {selectedOption} = this.state
    const url = `https://apis.ccbp.in/ps/projects?category=${selectedOption}`
    const response = await fetch(url)
    if (response.ok === true) {
      const data = await response.json()
      const projectObject = {projects: data.projects, total: data.total}
      const updatedListObject = projectObject.projects.map(e =>
        this.getUpdatedObject(e),
      )
      this.setState({
        selectedCategoryList: updatedListObject,
        apiStatus: apiConstants.success,
      })
    } else {
      this.setState({
        apiStatus: apiConstants.failure,
      })
    }
  }

  renderList = () => {
    const {selectedCategoryList, selectedOption} = this.state
    return (
      <div>
        <div className="container5">
          <img
            src="https://assets.ccbp.in/frontend/react-js/projects-showcase/website-logo-img.png"
            alt="website logo"
            className="image1"
          />
        </div>
        <div>
          <select onChange={this.onChangeOption} value={selectedOption}>
            {categoriesList.map(e => (
              <option value={e.id}>{e.displayText}</option>
            ))}
          </select>
          <div>
            <ul className="list2">
              {selectedCategoryList.map(e => (
                <DisplayListItem each={e} key={e.id} />
              ))}
            </ul>
          </div>
        </div>
      </div>
    )
  }

  onTapRetry = () => {
    this.getSelectedList()
  }

  renderFailurePage = () => (
    <div>
      <img
        src="https://assets.ccbp.in/frontend/react-js/projects-showcase/failure-img.png"
        alt="failure view"
      />
      <h1>Oops! Something Went Wrong</h1>
      <p>We cannot seem to find the page you are looking for</p>
      <button type="button" onClick={this.onTapRetry}>
        Retry
      </button>
    </div>
  )

  render() {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiConstants.inprogress:
        return this.renderLoader()
      case apiConstants.success:
        return this.renderList()
      case apiConstants.failure:
        return this.renderFailurePage()

      default:
        return null
    }
  }
}
export default ProjectsShowcase
