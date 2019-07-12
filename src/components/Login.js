import React from 'react';
import RN from 'react-native';
// import userStore from 'src/store/user';

import PropTypes from 'prop-types';
import * as NB from 'native-base';
import * as NavigationService from 'libs/navigation/NavigationServices.js'

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      email: '',
      password: ''
    };
  }

  componentDidMount() { console.log('did mount'); console.log(this.props);
    if (this.props.data === null && this.props.data === undefined) {
      this.props.resetAuthRequest();
      this.setState({
        email: '',
        password: '',
      });
    }
  }

  setInput = (name, value) => {
    this.setState({
      ...this.state.input,
      [name]: value,
    });
  }

  submit = () => {
    const { requestLogin } = this.props;
    const { email, password } = this.state;
    requestLogin({ email, password });
  }

  autoLogin = () => {
    NavigationService.navigate('Complaints');
  }

  render() {
    const { message, isError, data, isLoggedIn } = this.props;

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
          {isLoggedIn ?
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
                <NB.Item stackedLabel>
                  <NB.Label>Email eFishery :</NB.Label>
                  <NB.Input
                    value={this.state.email}
                    onChangeText={value => this.setInput('email', value)}
                  />
                </NB.Item>
                <NB.Item stackedLabel>
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
}

Login.propTypes = {
  isError: PropTypes.bool.isRequired,
  // message: PropTypes.string.isRequired,
  // resetAuthRequest: PropTypes.func.isRequired,
  requestLogin: PropTypes.func.isRequired,
};

export default Login;