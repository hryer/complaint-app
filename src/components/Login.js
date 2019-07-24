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

  componentWillMount() {
    const { isLoggedIn, data, resetRequestAuth } = this.props;

    if (isLoggedIn === true) {
      const today = moment();
      if (today.diff(data.lastLogin, 'hours') > 20) {
        this.setInput('isExpired', true);
      } else {
        this.setInput('isExpired', false);
      }
    } else {
      this.setInput('isExpired', true);
    }

    if (data === null || data === undefined) {
      resetRequestAuth();
      this.setState({
        email: '',
        password: ''
      });
    }
  }
  render() {
    const { message } = this.props;
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
                  onPress={this.onSubmit}
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

  onSubmit = () => {
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
  resetRequestAuth: PropTypes.func.isRequired,
  requestLogin: PropTypes.func.isRequired,
};

export default Login;