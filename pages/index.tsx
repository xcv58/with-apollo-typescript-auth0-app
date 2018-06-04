import React from 'react'
import Link from 'next/link'
import auth0 from '../libs/Auth'

export default class App extends React.Component {
  state = { name: '' }

  componentDidMount() {
    if (!auth0.isAuthenticated()) {
      auth0.login()
    } else {
      const name = localStorage.getItem('name')
      this.setState({ name })
    }
  }

  componentDidUpdate() {
    if (!auth0.isAuthenticated()) {
      auth0.login()
    }
  }

  render() {
    return (
      <>
        <ul>
          <li>
            <Link href="/a" as="/a">
              <a>a</a>
            </Link>
          </li>
          <li>
            <Link href="/b" as="/b">
              <a>b</a>
            </Link>
          </li>
        </ul>
        <div>
          Hello {this.state.name}!
          <button onClick={auth0.logout}>Logout</button>
        </div>
      </>
    )
  }
}
