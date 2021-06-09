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

  renderAuthButton() {
    if ( this.state.isSignedIn === null ) {
      return(
        <div>
          I don't know if we are signed in
        </div>
      )
    } else if (this.state.isSignedIn) {
      return(
        <div>I am signed in</div>
      )
    } else {
      return (
        <div>
          I am not singed in 
        </div>
      );
    }
  };

  render(){
    return <div>{ this.renderAuthButton() }</div>
  };
};

export default GoogleAuth;