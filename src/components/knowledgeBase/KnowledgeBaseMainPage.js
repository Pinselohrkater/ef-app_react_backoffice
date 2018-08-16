import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router-dom';
import * as syncActions from '../../actions/syncActions';

import List, { ListItem, ListItemIcon, ListItemText } from 'material-ui/List';
import Icon from 'material-ui/Icon';
import PageBase from '../layout/PageBase';

function mapStateToProps(state) {
    return {
        knowledgeBase: state.knowledgeBase,
        isLoaded: state.syncStatus.isLoaded
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(syncActions, dispatch)
    };
}


class KnowledgeBaseMainPage extends Component {

    constructor(props) {
        super(props);
        this.props.actions.ensureSync();
    }

    render() {
        return (
            <PageBase
                title="Index"
                navigation="Knowledge Base"
                isBusy={!this.props.isLoaded}
            >
                <List component="nav">
                    {this.props.knowledgeBase.knowledgeGroups.sort((a, b) => a.Order - b.Order).map((item) => (
                        <ListItem button component={Link} to={"/knowledgeBase/group/" + item.Id}
                            key={item.Id}
                        >
                            <ListItemIcon>
                            <Icon className="fa">{String.fromCharCode(parseInt(item.FontAwesomeIconCharacterUnicodeAddress, 16))}</Icon>
                            </ListItemIcon>                        
                            <ListItemText primary={item.Name} secondary={item.Description} />
                        </ListItem>
                    ))}
                </List>
            </PageBase>
        );
    }
}

KnowledgeBaseMainPage.propTypes = {
    actions: PropTypes.object.isRequired,
    isLoaded: PropTypes.bool.isRequired,
    knowledgeBase: PropTypes.object.isRequired
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(KnowledgeBaseMainPage);