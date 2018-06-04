import React from 'react'
import auth0 from '../libs/Auth'

export default class Callback extends React.Component {
  componentDidMount() {
    auth0.handleAuthentication()
  }

  render() {
    return <div>Loading...</div>
  }
}
