import React from 'react';
import oAuthKey from '../private/keys';


class GoogleAuth extends React.Component {
  state = { isSignedIn: null };
  //Initialising OAuth Service
  keys = oAuthKey
  componentDidMount(keys) {
    window.gapi.load('client: auth2', () => {
      window.gapi.client.init({
        clientId: '758471532240-i8pa8qdsffn6ejkdsq09jaeb374s25i5.apps.googleusercontent.com',
        scope: 'email'
      }).then (() => {
        this.auth = window.gapi.auth2.getAuthInstance();
        this.setState({ isSignedIn: this.auth.isSignedIn.get() });
        this.auth.isSignedIn.listen(this.onAuthChange);
      });
    });
  };

  onAuthChange = () => {
    this.setState({ isSignedIn: this.auth.isSignedIn.get() })
  };

  onSignInClick = () => {
    this.auth.signIn();
  };

  onSignOutClick = () => {
    this.auth.signOut();
  };

  renderAuthButton() {
    if ( this.state.isSignedIn === null ) {
      return(
        null
      )
    } else if (this.state.isSignedIn) {
      return(
        <button onClick={this.onSignOutClick} className="ui red google button">
          <i className="google icon"/>
          Sign Out
        </button>
      )
    } else {
      return (
        <button onClick={this.onSignInClick} className="ui red google button">
          <i className="google icon"/>
          Sign In with Google
        </button>
      );
    }
  };

  render(){
    return <div>{ this.renderAuthButton() }</div>
  };
};

export default GoogleAuth;