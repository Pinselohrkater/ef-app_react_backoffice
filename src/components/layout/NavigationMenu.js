import * as loginActions from '../../actions/loginActions';

import List, { ListItem, ListItemIcon, ListItemText } from 'material-ui/List';
import React, { Component } from 'react';

import Api from '../../api/EurofurenceAppApi';
import Divider from 'material-ui/Divider';
import Icon from 'material-ui/Icon';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

function mapStateToProps(state) {
    return {
        loginStatus: state.loginStatus
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(loginActions, dispatch)
    };
}

class NavigationMenu extends Component {
    render() {
        return (
            <div>
                <List component="nav" dense={true}>
                    <ListItem button component={Link} to="/knowledgeBase/">
                        <ListItemIcon>
                            <Icon className="fa fa-book" />
                        </ListItemIcon>
                        <ListItemText primary="Knowledge Base" />
                    </ListItem>
                    <ListItem button component={Link} to="/images/">
                        <ListItemIcon>
                            <Icon className="fa fa-image" />
                        </ListItemIcon>
                        <ListItemText primary="Images" />
                    </ListItem>
                    <ListItem button component={Link} to="/fursuitBadges/">
                        <ListItemIcon>
                            <Icon className="fa fa-id-card-o" />
                        </ListItemIcon>
                        <ListItemText primary="Fursuit Badges" />
                    </ListItem>
                </List>
                <Divider />
                <List dense={true}>
                    <ListItem>
                        <ListItemText primary="Backend URL" secondary={<small>{Api.URL}</small>} />
                    </ListItem>
                    <ListItem button onClick={() => this.props.actions.abandonLogin()}>
                        <ListItemIcon>
                            <Icon className="fa fa-sign-out" />
                        </ListItemIcon>
                        <ListItemText primary="Logout" secondary={this.props.loginStatus.username} />
                    </ListItem>

                </List>
            </div>
        );
    }
}

NavigationMenu.propTypes = {
    actions: PropTypes.object.isRequired,
    loginStatus: PropTypes.object.isRequired
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(NavigationMenu);
