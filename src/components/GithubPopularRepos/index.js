import {Component} from 'react'

import Loader from 'react-loader-spinner'

import LanguageFilterItem from '../LanguageFilterItem'
import RepositoryItem from '../RepositoryItem'

import './index.css'

const languageFiltersData = [
  {id: 'ALL', language: 'All'},
  {id: 'JAVASCRIPT', language: 'Javascript'},
  {id: 'RUBY', language: 'Ruby'},
  {id: 'JAVA', language: 'Java'},
  {id: 'CSS', language: 'CSS'},
]

const statusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  loading: 'LOADING',
}

class GithubPopularRepos extends Component {
  state = {
    activeTabId: languageFiltersData[0].id,
    gitReposList: [],
    status: statusConstants.initial,
  }

  componentDidMount() {
    this.setState({status: statusConstants.loading})
    this.getRepoData()
  }

  getRepoData = async () => {
    const {activeTabId} = this.state
    const githubReposApiUrl = `https://apis.ccbp.in/popular-repos?language=${activeTabId}`

    const response = await fetch(githubReposApiUrl)
    if (response.ok === true) {
      const data = await response.json()
      console.log(data)
      const updatedData = data.popular_repos.map(each => ({
        id: each.id,
        name: each.name,
        avatarUrl: each.avatar_url,
        issuesCount: each.issues_count,
        forksCount: each.forks_count,
        starsCount: each.stars_count,
      }))

      this.setState({
        gitReposList: updatedData,
        status: statusConstants.success,
      })
    } else {
      this.setState({
        status: statusConstants.failure,
      })
    }
  }

  getSuccessView = () => {
    const {gitReposList} = this.state
    return (
      <ul className="card-con">
        {gitReposList.map(eachItem => (
          <RepositoryItem cardDetails={eachItem} key={eachItem.id} />
        ))}
      </ul>
    )
  }

  getLoaderView = () => (
    <div data-testid="loader">
      <Loader type="ThreeDots" color="#0284c7" height={80} width={80} />
    </div>
  )

  getFailureView = () => (
    <div className="failure-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/api-failure-view.png"
        alt="failure view"
        className="failure-image"
      />
      <h1 className="failure-text">Something Went Wrong</h1>
    </div>
  )

  onChangeTabId = id => {
    this.setState(
      {activeTabId: id, status: statusConstants.loading},
      this.getRepoData,
    )
  }

  render() {
    const {status, activeTabId} = this.state

    let content
    switch (status) {
      case statusConstants.loading:
        content = this.getLoaderView()
        break
      case statusConstants.success:
        content = this.getSuccessView()
        break
      case statusConstants.failure:
        content = this.getFailureView()
        break
      default:
        content = null
        break
    }

    return (
      <div className="main-con">
        <h1 className="title">Popular</h1>

        <ul className="language-tabs-container">
          {languageFiltersData.map(each => (
            <LanguageFilterItem
              isActive={activeTabId === each.id}
              onChangeTabId={this.onChangeTabId}
              languageDetails={each}
              key={each.id}
            />
          ))}
        </ul>

        {content}
      </div>
    )
  }
}

export default GithubPopularRepos
