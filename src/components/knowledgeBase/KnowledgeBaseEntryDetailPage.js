import * as syncActions from '../../actions/syncActions';

import Dialog, {
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
} from 'material-ui/Dialog';
import React, { Component } from 'react';
import Tabs, { Tab } from 'material-ui/Tabs';

import AppBar from 'material-ui/AppBar';
import Badge from 'material-ui/Badge';
import Button from 'material-ui/Button';
import ImageListEditor from '../shared/ImageListEditor';
import JSONPretty from 'react-json-pretty';
import KnowledgeBaseEntryEditForm from './KnowledgeBaseEntryEditForm';
import LinkListEditor from '../shared/LinkListEditor';
import PageBase from '../layout/PageBase';
import Paper from 'material-ui/Paper';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { withStyles } from 'material-ui/styles';

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

const styles = theme => ({

    badgePadding: {
        padding: `0 ${theme.spacing.unit * 2}px`,
    },
});

class KnowledgeBaseEntryDetailPage extends Component {

    constructor(props) {
        super(props);
    }

    state = {
        isLoaded: false,
        isModified: false,
        isNew: false,
        wantsToDelete: false,
        entity: { Links: [], ImageIds: [] },
        group: {},
        selectedTab: 0
    }

    componentWillMount() {
        this.props.actions.ensureSync()
            .then(() => {
                let id = this.props.match.params.entryId;
                let groupId = this.props.match.params.groupId;

                if (id == null) {
                    this.setState({
                        isLoaded: true,
                        isModified: true,
                        isNew: true,
                        entity: {
                            Order: 999,
                            Links: [],
                            ImageIds: [],
                            KnowledgeGroupId: groupId
                        }
                    });
                    return;
                }

                this.setState({
                    id,
                    entity: this.getEntryFromStore(id),
                    isLoaded: true,
                    isModified: false
                });

            });
    }

    submit = (entity) => {

        this.setState({ isLoaded: false });

        if (this.state.isNew) {
            this.props.actions.createKnowledgeEntry(entity)
                .then((id) => {
                    this.props.history.replace("/knowledgeBase/entry/" + id);
                });
            return;
        }

        this.props.actions.updateKnowledgeEntry(entity)
            .then(() => {
                this.setState({
                    entity: this.getEntryFromStore(entity.Id),
                    isLoaded: true,
                    isModified: false
                });
            });
    }

    delete = (entity) => {
        if (!this.state.wantsToDelete) {
            this.setState({ wantsToDelete: true });
            return;
        }

        this.setState({ isLoaded: false });
        this.props.actions.deleteKnowledgeEntry(entity)
            .then(() => {
                this.props.history.replace("/knowledgeBase/group/" + entity.KnowledgeGroupId);
            });
    }

    getGroupFromStore(id) {
        return this.props.knowledgeBase.knowledgeGroups.filter(item => item.Id == id)[0];
    }

    getEntryFromStore(id) {
        return this.props.knowledgeBase.knowledgeEntries.filter(item => item.Id == id)[0];
    }

    handleChange = (diff) => {
        let entity = Object.assign({}, this.state.entity, diff);
        this.setState({ entity, isModified: true });
    };

    editImage = (imageId) => {
        if (this.state.isModified) {
            alert("You must save your changes first.");
            return;
        }
        this.props.history.push("/images/edit/" + imageId);
    }

    render() {
        const { classes } = this.props;
        return (
            <PageBase
                title={this.state.isLoaded ? this.state.entity.Title : ""}
                navigation="Knowledge Base"
                isBusy={!this.state.isLoaded}
            >
                <AppBar position="static" color="default">
                    <Tabs value={this.state.selectedTab}
                        fullWidth textColor="primary" indicatorColor="primary"
                        onChange={(e, v) => this.setState({ selectedTab: v })}
                    >
                        <Tab label="Text" />
                        <Tab label={
                            <Badge
                                className={classes.badgePadding}
                                color="primary" badgeContent={this.state.entity.Links.length}>
                                Links
                            </Badge>
                        } />
                        <Tab label={
                            <Badge
                                className={classes.badgePadding}
                                color="primary" badgeContent={this.state.entity.ImageIds.length}>
                                Images
                            </Badge>
                        } />
                        <Tab label="Raw" />
                    </Tabs>
                </AppBar>

                <Paper style={{ padding: 20, marginBottom: 20 }}>



                    {this.state.selectedTab == 0 ?
                        <KnowledgeBaseEntryEditForm
                            Order={this.state.entity.Order}
                            Title={this.state.entity.Title}
                            Text={this.state.entity.Text}
                            KnowledgeGroupId={this.state.entity.KnowledgeGroupId}
                            knowledgeGroups={this.props.knowledgeBase.knowledgeGroups}
                            onChange={(diff) => this.handleChange(diff)}
                        /> : null}
                    {this.state.selectedTab == 1 ?
                        <LinkListEditor items={this.state.entity.Links}
                            onChange={(Links) => this.handleChange({ Links })}
                        /> : null}


                    {this.state.selectedTab == 2 ?
                        <ImageListEditor items={this.state.entity.ImageIds}
                            onEdit={(ImageId) => this.editImage(ImageId)}
                            onChange={(ImageIds) => this.handleChange({ ImageIds })}
                        /> : null}
                        
                    {this.state.selectedTab == 3 ? <JSONPretty
                        style={{ whiteSpace: 'pre-wrap' }}
                        id="json-pretty" json={this.state.entity} /> : null}
                </Paper>

                <Button variant="raised" disabled={!this.state.isModified}
                    color="primary"
                    onClick={() => this.submit(this.state.entity)}
                >
                    Save
                </Button>
                <Button variant="flat" disabled={this.state.isNew}
                    color="primary"
                    onClick={() => this.delete(this.state.entity)}
                >
                    Delete
                </Button>

                <Dialog
                    open={this.state.wantsToDelete}
                    onClose={() => this.setState({ wantsToDelete: false })}
                >
                    <DialogTitle>Delete Entry?</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            Are you sure? This can't be undone.
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button variant="raised" onClick={() => this.delete(this.state.entity)} color="primary">
                            Delete Permanently
                        </Button>
                        <Button onClick={() => this.setState({ wantsToDelete: false })} color="primary" autoFocus>
                            Cancel
                        </Button>
                    </DialogActions>
                </Dialog>

            </PageBase>
        );
    }
}

KnowledgeBaseEntryDetailPage.propTypes = {
    actions: PropTypes.object.isRequired,
    isLoaded: PropTypes.bool.isRequired,
    knowledgeBase: PropTypes.object.isRequired,
    match: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired,
    classes: PropTypes.object.isRequired
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(withStyles(styles)(KnowledgeBaseEntryDetailPage));