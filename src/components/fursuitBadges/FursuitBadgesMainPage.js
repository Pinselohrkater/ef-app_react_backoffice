import * as fursuitBadgeActions from '../../actions/fursuitBadgeActions';

import Card, { CardHeader, CardMedia } from 'material-ui/Card';
import React, { Component } from 'react';

import Button from 'material-ui/Button';
import Grid from 'material-ui/Grid';
import Icon from 'material-ui/Icon';
import PageBase from '../layout/PageBase';
import Paper from 'material-ui/Paper';
import PropTypes from 'prop-types';
import TextField from 'material-ui/TextField';
import { bindActionCreators } from 'redux';
import classNames from 'classnames';
import { connect } from 'react-redux';
import { withStyles } from 'material-ui/styles';

// eslint-disable-next-line no-undef
const API_URL = __API_URL__;


function mapStateToProps(state) {
    return {
        fursuitBadges: state.fursuitBadges,
        isLoaded: state.fursuitBadges.isLoaded
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(fursuitBadgeActions, dispatch)
    };
}


const styles = () => ({
    card: {
        height: 160,
    },
    media: {
        height: 160,
        float: "left",
        width: 120
    },
    icon: {
        fontSize: '1em'
    },
    title: {
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        maxHeight: '30px',
        whiteSpace: 'nowrap',
        maxWidth: '75%'
    },
    subheader: {
        fontSize: '0.9em',
    },
    recordCountPaper: {
        padding: 16
    },
    showAllButton: {
        float: 'right'
    }
});

class FursuitBadgesMainPage extends Component {

    constructor(props) {
        super(props);
        this.props.actions.ensureLoaded()
            .then(() => this.updateSearchResults());
    }

    state = {
        filters: {
            name: "",
            species: "",
            gender: "",
            wornBy: "",
            badgeNo: "",
            regNo: ""
        },
        searchResults: [],
        resultCount: 0,
        tooManyResults: false
    }



    updateSearchResults = () => {
        let filters = this.state.filters;
        let searchResults =
            this.props.fursuitBadges.fursuitBadges
                .filter(item => filters.name == "" || item.Name.toLowerCase().indexOf(filters.name.toLowerCase()) > -1)
                .filter(item => filters.species == "" || item.Species.toLowerCase().indexOf(filters.species.toLowerCase()) > -1)
                .filter(item => filters.gender == "" || item.Gender.toLowerCase().indexOf(filters.gender.toLowerCase()) > -1)
                .filter(item => filters.wornBy == "" || item.WornBy.toLowerCase().indexOf(filters.wornBy.toLowerCase()) > -1)
                .filter(item => filters.badgeNo == "" || item.ExternalReference.indexOf(filters.badgeNo) > -1)
                .filter(item => filters.regNo == "" || item.OwnerUid.indexOf(filters.regNo) > -1)
                .sort((a, b) => ((a.Name < b.Name) ? -1 : ((a.Name > b.Name) ? 1 : 0)));

        this.setState({
            searchResults, resultCount: searchResults.length,
            tooManyResults: searchResults.length > 100
        });
    }

    setFilterState = (event, property) => {
        let value = event.target.value;
        this.setState(
            (prevState) => ({ filters: { ...prevState.filters, [property]: value } }),
            () => this.updateSearchResults()
        );
    }

    render() {
        const { classes } = this.props;
        return (
            <PageBase
                title="Search"
                navigation="Fursuit Badges"
                isBusy={!this.props.isLoaded}
                showPaper={false}
            >
                <Grid container spacing={24} alignItems="flex-end" style={{ paddingBottom: '24px' }}>
                    <Grid item xs={6} md={3}>
                        <TextField
                            label="Name"
                            inputProps={{ min: 0 }}
                            value={this.state.filters.name}
                            fullWidth
                            onChange={(e) => this.setFilterState(e, 'name')}
                        />
                    </Grid>
                    <Grid item xs={6} md={2}>
                        <TextField
                            label="Species"
                            inputProps={{ min: 0 }}
                            value={this.state.filters.species}
                            fullWidth
                            onChange={(e) => this.setFilterState(e, 'species')}
                        />
                    </Grid>
                    <Grid item xs={6} md={2}>
                        <TextField
                            label="Gender"
                            inputProps={{ min: 0 }}
                            value={this.state.filters.gender}
                            fullWidth
                            onChange={(e) => this.setFilterState(e, 'gender')}
                        />
                    </Grid>
                    <Grid item xs={6} md={3}>
                        <TextField
                            label="Worn By"
                            inputProps={{ min: 0 }}
                            value={this.state.filters.wornBy}
                            fullWidth
                            onChange={(e) => this.setFilterState(e, 'wornBy')}
                        />
                    </Grid>
                    <Grid item xs={6} md={1}>
                        <TextField
                            label="Badge#"
                            inputProps={{ min: 0 }}
                            value={this.state.filters.badgeNo}
                            fullWidth
                            onChange={(e) => this.setFilterState(e, 'badgeNo')}
                        />
                    </Grid>
                    <Grid item xs={6} md={1}>
                        <TextField
                            label="Reg#"
                            inputProps={{ min: 0 }}
                            value={this.state.filters.regNo}
                            fullWidth
                            onChange={(e) => this.setFilterState(e, 'regNo')}
                        />
                    </Grid>
                </Grid>

                {this.state.tooManyResults ? <div>
                    <Paper elevation={1} className={classes.recordCountPaper}>
                        <b>{this.state.resultCount}</b> items match your search criteria - showing those results can be slow. Please refine your search criteria. <br />
                        <Button
                            color="primary"
                            variant="raised"
                            onClick={() => this.setState({ tooManyResults: false })}
                        >Show anyway</Button>
                    </Paper>

                </div> :
                    <Grid container spacing={16}>
                        {this.state.searchResults.map((item) => (
                            <Grid item key={item.Id} xs={12} md={6} lg={4} xl={3}>
                                <Card className={classes.card}>
                                    <CardMedia image={API_URL + "Fursuits/Badges/" + item.Id + "/Image"}
                                        className={classes.media}
                                    />
                                    <CardHeader
                                        title={<div className={classes.title} title={item.Name}>{item.Name}</div>}
                                        subheader={
                                            <div className={classes.subheader}>
                                                <Icon className={classNames(classes.icon, "fa", "fa-id-badge")} /> #{item.ExternalReference} ({item.OwnerUid}) <br />
                                                <Icon className={classNames(classes.icon, "fa", "fa-tag")} /> {item.Species} <br />
                                                <Icon className={classNames(classes.icon, "fa", "fa-venus-mars")} />  {item.Gender} <br />
                                                <Icon className={classNames(classes.icon, "fa", "fa-user")} />  {item.WornBy} <br />
                                            </div>

                                        }
                                    />
                                </Card>
                            </Grid>
                        ))}
                    </Grid>
                }

            </PageBase>
        );
    }
}

FursuitBadgesMainPage.propTypes = {
    actions: PropTypes.object.isRequired,
    isLoaded: PropTypes.bool.isRequired,
    fursuitBadges: PropTypes.object.isRequired,
    classes: PropTypes.object.isRequired
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(withStyles(styles)(FursuitBadgesMainPage));