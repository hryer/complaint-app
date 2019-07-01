import React from 'react';
import RN from 'react-native';
// import userStore from 'src/store/user';

import PropTypes from 'prop-types';
import * as NB from 'native-base';

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      username: '',
      password: ''
    };
  }

  componentDidMount() {
    this.props.refreshLoginView();
    this.setState({
      username: '',
      password: '',
    });
  }

  componentWillReceiveProps(nextProps) {
    if (this.state.username !== '' && nextProps.username === '') {
      this.setState({
        username: '',
        password: '',
      })
    }
  }

  setInput = (name, value) => {
    this.setState({
      ...this.state.input,
      [name]: value,
    });
  }

  submit = () => {
    const { login } = this.props;
    const { username, password } = this.state;
    login(username, password);
  }
  
  render() {
    const { message, isError } = this.props;
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
          <NB.Form>
            <NB.Item stackedLabel>
              <NB.Label>Email eFishery :</NB.Label>
              <NB.Input
                value={this.state.username}
                onChangeText={value => this.setInput('username', value)}
              />
            </NB.Item>
            <NB.Item stackedLabel>
              <NB.Label>Password :</NB.Label>
              <NB.Input
                value={this.state.password}
                onChangeText={value => this.setInput('password', value)}
              />
            </NB.Item>
          </NB.Form>
          <NB.Text>{message}</NB.Text>
          <NB.Button
            block
            onPress={this.submit}
            style={{ margin: 15 }}
          >
            <NB.Text>Submit</NB.Text>
          </NB.Button>
        </NB.Content>
      </NB.Container>
    );
  }
}

Login.propTypes = {
  isError: PropTypes.bool.isRequired,
  message: PropTypes.string.isRequired,
  username: PropTypes.string.isRequired,
  refreshLoginView: PropTypes.func.isRequired,
  login: PropTypes.func.isRequired,
};

export default Login;