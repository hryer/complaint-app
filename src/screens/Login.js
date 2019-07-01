import React from 'react';
import RN from 'react-native';
import * as NB from 'native-base';
import * as colors from 'styles/color'
// import userStore from 'src/store/user';

export default class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      input: {
        email: '',
        password: ''
      },
    };
  }

  render() {
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
                value={this.state.input.email}
                onChangeText={value => this.setInput('email', value)}
              />
            </NB.Item>
            <NB.Item stackedLabel>
              <NB.Label>Password :</NB.Label>
              <NB.Input
                value={this.state.input.password}
                onChangeText={value => this.setInput('password', value)}
              />
            </NB.Item>
          </NB.Form>

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

  setInput = (name, value) => {
    this.setState({
      input: {
        ...this.state.input,
        [name]: value,
      },
    });
  }

  submit = () => {
    if (!this.state.input.email.endsWith('@efishery.com')) {
      alert('Harus pakai email efishery');
      return;
    }
    
    // userStore.setUser({
    //   email: this.state.input.email,
    //   password: this.state.input.email
    // });
  }
}
