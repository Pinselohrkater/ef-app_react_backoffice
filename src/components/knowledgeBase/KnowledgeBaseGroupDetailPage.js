import * as syncActions from '../../actions/syncActions';

import List, { ListItem, ListItemText } from 'material-ui/List';
import React, { Component } from 'react';

import Icon from 'material-ui/Icon';
import KnowledgeBaseGroupEditForm from './KnowledgeBaseGroupEditForm';
import { Link } from 'react-router-dom';
import { ListItemIcon } from 'material-ui';
import PageBase from '../layout/PageBase';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

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


class KnowledgeBaseGroupDetailPage extends Component {

    constructor(props) {
        super(props);
    }

    state = {
        isLoaded: false,
        entity: {},
        knowledgeEntries: []
    }

    componentWillMount() {
        this.props.actions.ensureSync()
            .then(() => {
                let id = this.props.match.params.groupId;


                this.setState({
                    id,
                    entity: this.getGroupFromStore(id),
                    knowledgeEntries: this.getKnowledgeEntriesFromStore(id),
                    isLoaded: true,
                });

            });
    }

    submit = (a) => {
        let entity = Object.assign({}, this.state.entity, a);

        this.setState({ isLoaded: false });

        this.props.actions.updateKnowledgeGroup(entity)
            .then(() => {
                this.setState({
                    entity: this.getGroupFromStore(entity.Id),
                    isLoaded: true
                });
            });
    }

    getGroupFromStore(id) {
        return this.props.knowledgeBase.knowledgeGroups.filter(item => item.Id == id)[0];
    }

    getKnowledgeEntriesFromStore(id) {
        return this.props.knowledgeBase.knowledgeEntries
            .filter(item => item.KnowledgeGroupId == id)
            .sort((a, b) => a.Order - b.Order);
    }



    render() {
        return (
            <PageBase
                title={this.state.isLoaded ? this.state.entity.Name : ""}
                navigation="Knowledge Base"
                isBusy={!this.state.isLoaded}
            >

                <KnowledgeBaseGroupEditForm
                    Name={this.state.entity.Name}
                    Description={this.state.entity.Description}
                    Order={this.state.entity.Order}
                    FontAwesomeIconCharacterUnicodeAddress={this.state.entity.FontAwesomeIconCharacterUnicodeAddress}
                    onSubmit={(a) => this.submit(a)}
                    canSubmit={true}
                />

                <List dense={true}>
                    {this.state.knowledgeEntries.map((item) => (
                        <ListItem button component={Link} to={"/knowledgeBase/entry/" + item.Id}
                            key={item.Id}
                        >
                            <ListItemText primary={item.Title} />
                        </ListItem>
                    ))}

                    <ListItem button component={Link} to={"/knowledgeBase/entry/new/" + this.state.entity.Id}
                        key={"new"}
                    >
                        <ListItemIcon>
                            <Icon className="fa fa-plus" />
                        </ListItemIcon>
                        <ListItemText primary="Create new entry" />
                    </ListItem>
                </List>


            </PageBase>
        );
    }
}

KnowledgeBaseGroupDetailPage.propTypes = {
    actions: PropTypes.object.isRequired,
    isLoaded: PropTypes.bool.isRequired,
    knowledgeBase: PropTypes.object.isRequired,
    match: PropTypes.object.isRequired
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(KnowledgeBaseGroupDetailPage);