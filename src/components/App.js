/* eslint-disable import/no-named-as-default */
import React from 'react';
import { connect } from 'react-redux';

import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

import LoginPage from './login/LoginPage';
import LayoutPage from './layout/LayoutPage';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import theme from '../theme-default';


// This is a class-based component because the current
// version of hot reloading won't hot reload a stateless
// component at the top-level.

class App extends React.Component {
  render() {
    return (
      <div>
        <MuiThemeProvider theme={theme}>
          {this.props.loginStatus.isLoggedOn ? <LayoutPage /> : <LoginPage />}
        </MuiThemeProvider>
      </div>
    );
  }
}

App.propTypes = {
  children: PropTypes.element,
  loginStatus: PropTypes.object.isRequired
};


function mapStateToProps(store) {
  return {
    loginStatus: store.loginStatus
  };
}

export default withRouter(connect(mapStateToProps)(App));