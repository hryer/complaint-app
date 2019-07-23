import React from 'react';
import RN from 'react-native';
import PropTypes from 'prop-types';
import * as NB from 'native-base';
import * as NavigationService from 'libs/navigation/NavigationServices.js';
import moment from 'moment';

class Login extends React.Component {
  constructor() {
    super();
    this.state = this.getInitialState();
  }

  componentDidMount() {
    const { isConnected, isLoggedIn, data } = this.props;
    const { isExpired } = this.state;

    if( isLoggedIn === true ) {
      const today = moment();
      if(today.diff(data.lastLogin, 'hours') > 20){
        this.setInput('isExpired', true);
      }else {
        this.setInput('isExpired', false);
      }
    }
    // check if user from list scene and reset the state login
    if (this.props.data === null || this.props.data === undefined || this.props.data === isExpired) {
      this.props.resetRequestAuth();
      this.setState({
        email: '',
        password: ''
      });
    }
  }

  render() {
    const { message, isError, data, isLoggedIn } = this.props;
    const { isExpired } = this.state;

    return (
      <NB.Container>
        <NB.Header noLeft>
          <NB.Left />
          <NB.Body>
            <NB.Title>Login</NB.Title>
          </NB.Body>
          <NB.Right />
        </NB.Header>
        <NB.Content>
          {!isExpired ?
            (
              <NB.Button
                block
                onPress={this.autoLogin}
                style={{ margin: 15 }}
              >
                <NB.Text>Re-Connect</NB.Text>
              </NB.Button>
            ) : (
              <NB.Form>
                <NB.Item floatingLabel>
                  <NB.Label>Email eFishery :</NB.Label>
                  <NB.Input
                    value={this.state.email}
                    onChangeText={value => this.setInput('email', value)}
                  />
                </NB.Item>
                <NB.Item floatingLabel last>
                  <NB.Label>Password :</NB.Label>
                  <NB.Input
                    value={this.state.password}
                    onChangeText={value => this.setInput('password', value)}
                  />
                </NB.Item>

                <NB.Text>{message}</NB.Text>
                <NB.Button
                  block
                  onPress={this.submit}
                  style={{ margin: 15 }}
                >
                  <NB.Text>Submit</NB.Text>
                </NB.Button>
              </NB.Form>
            )
          }
        </NB.Content>
      </NB.Container>
    );
  }

  setInput = (name, value) => {
    this.setState({
      ...this.state,
      [name]: value,
    });
  }

  getInitialState = () => {
    return {
      email: '',
      password: '',
      isExpired: true
    };
  }

  submit = () => {
    const { requestLogin } = this.props;
    const { email, password } = this.state;
    requestLogin({ email, password });
  }

  autoLogin = () => {
    NavigationService.navigate('Complaints');
  }
}


Login.propTypes = {
  isError: PropTypes.bool.isRequired,
  isConnected: PropTypes.bool.isRequired,
  resetRequestAuth: PropTypes.func.isRequired,
  requestLogin: PropTypes.func.isRequired,
};

export default Login;