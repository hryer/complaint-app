import React from 'react';
import RN from 'react-native';
// import userStore from 'src/store/user';
import PropTypes from 'prop-types';
import * as NB from 'native-base';

class Loading extends React.Component {
  render() {
    return (
      <NB.Container>
        <NB.Header />
        <NB.Content>
          <NB.Spinner color='green' />
        </NB.Content>
      </NB.Container>
    );
  }
}

export default Loading;