import auth0 from 'auth0-js';

export default class Auth {
  auth0 = new auth0.WebAuth({
    domain: 'xcv58.auth0.com',
    clientID: 'WLbItnzWfincjGWEcDamyHFoqnF3vYyI',
    redirectUri: 'http://localhost:3000/callback',
    audience: 'https://xcv58.auth0.com/userinfo',
    responseType: 'token id_token',
    scope: 'openid'
  });

  login() {
    this.auth0.authorize();
  }
}
