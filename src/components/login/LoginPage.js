import * as actions from '../../actions/loginActions';

import React, { Component } from 'react';

import Button from 'material-ui/Button';
import LoginForm from './LoginForm';
import Paper from 'material-ui/Paper';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import grey from 'material-ui/colors/grey';
import queryString from 'query-string';
import { withRouter } from 'react-router-dom';

// import { grey200 } from 'material-ui/styles/colors';
// import Help from 'material-ui/svg-icons/action/help';




function mapStateToProps(state) {
    return {
        loginStatus: state.loginStatus
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(actions, dispatch)
    };
}

class LoginPage extends Component {
    constructor(props) {
        super(props);
        this.onSubmit = this.onSubmit.bind(this);
        let query = queryString.parse(this.props.location.search);
        this.state = { accessToken: query.accessToken };
    }

    onSubmit = (values) => {
        this.props.actions.attemptLogin(
            values.regNo,
            values.username,
            values.password,
            values.isPersistent,
            values.accessToken
        );
    }

    render() {
        let styles = {
            loginContainer: {
                minWidth: 320,
                maxWidth: 400,
                height: 'auto',
                position: 'absolute',
                top: '20%',
                left: 0,
                right: 0,
                margin: 'auto',
                fontFamily: 'Roboto',
            },
            title: {
                textAlign: 'center',
                color: 'black',
                fontWeight: 1,
                fontSize: 18,
                marginBottom: '20px'
            },
            subTitle: {
                textAlign: 'center',
                fontSize: '0.7em',
                marginBottom: '20px',
                color: 'gray'
            },
            paper: {
                padding: 20,
                overflow: 'auto',
                background: 'rgba(255,255,255, 0.9)'
            },
            flatButton: {
                color: grey[200],
                backgroundColor: 'rgba(0, 0, 0, 0.1)'
            },
            buttonsDiv: {
                textAlign: 'center',
                padding: 10
            },
            background: {
                position: 'absolute',
                left: 0,
                right: 0,
                top: 0,
                bottom: 0,
                backgroundImage: 'url("https://www.eurofurence.org/EF24/design/teaser.jpg")',
                backgroundSize: 'cover',
                backgroundPosition: 'center center'
            }
        };

        return (
                <div>
                    <div style={styles.background} />

                    <div style={styles.loginContainer}>
                        <Paper style={styles.paper} depth={5}>
                        <div style={styles.title}>
                                Eurofurence Mobile Apps - Backoffice
                            </div>
                            <div style={styles.subTitle}>
                                Your login credentials are the same as the ones used for the Eurofurence Registration System.
                            </div>
                            <LoginForm 
                                onSubmit={this.onSubmit}
                                canSubmit={!this.props.loginStatus.isBusy}
                                errorMessage={this.props.loginStatus.errorMessage}
                                accessToken={this.state.accessToken}
                                />
                        </Paper>
                        <div style={styles.buttonsDiv}>

                            <Button
                                href="https://reg.eurofurence.org/regsys/lost_password.jsp"
                                style={styles.flatButton}
                                target="_blank"
                            >
                            Forgot Password?
                            </Button>
                        </div>
                    </div>
                </div>
        );
    }
}


LoginPage.propTypes = {
    actions: PropTypes.object.isRequired,
    loginStatus: PropTypes.object.isRequired,
    location: PropTypes.object.isRequired,
};

export default withRouter(connect(
    mapStateToProps,
    mapDispatchToProps
)(LoginPage));