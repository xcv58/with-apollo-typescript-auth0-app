import React from 'react'
import Link from 'next/link'
import Auth from '../libs/Auth'

const auth = new Auth()

export default class App extends React.Component {
  componentDidMount() {
    auth.login()
  }

  render() {
    return (
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
    )
  }
}
