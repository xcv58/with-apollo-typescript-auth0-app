import React from 'react'
import Link from 'next/link'
import auth0 from '../libs/Auth'

export default class App extends React.Component {
  componentDidMount() {
    if (!auth0.isAuthenticated()) {
      auth0.login()
    }
  }

  componentDidUpdate() {
    if (!auth0.isAuthenticated()) {
      auth0.login()
    }
  }

  render() {
    const name = localStorage.getItem('name')
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
          Hello {name}!
          <button onClick={auth0.logout}>Logout</button>
        </div>
      </>
    )
  }
}
