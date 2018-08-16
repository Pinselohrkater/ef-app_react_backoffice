import * as syncActions from '../../actions/syncActions';

import React, { Component } from 'react';

import Button from 'material-ui/Button';
import Grid from 'material-ui/Grid';
import ImageList from './ImageList';
import PageBase from '../layout/PageBase';
import Paper from 'material-ui/Paper';
import PropTypes from 'prop-types';
import TextField from 'material-ui/TextField';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

function mapStateToProps(state) {
    return {
        images: state.images,
        isLoaded: state.syncStatus.isLoaded
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(syncActions, dispatch)
    };
}


class ImagesSearchPage extends Component {

    constructor(props) {
        super(props);
        this.props.actions.ensureSync()
            .then(() => this.updateSearchResults());
    }

    state = {
        filters: {
            keyword: ""
        },
        searchResults: [],
        resultCount: 0,
        tooManyResults: false
    }

    updateSearchResults = () => {
        let filters = this.state.filters;
        let searchResults =
            this.props.images.images
                .filter(item => filters.keyword == "" || item.InternalReference.toLowerCase().indexOf(filters.keyword.toLowerCase()) > -1);

        this.setState({
            searchResults, resultCount: searchResults.length,
            tooManyResults: searchResults.length > 20
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
        return (
            <PageBase
                title="Search"
                navigation="Images"
                isBusy={!this.props.isLoaded}
                showPaper={false}
            >

                <Grid container spacing={24} alignItems="flex-end" style={{ paddingBottom: '24px' }}>
                    <Grid item xs={12}>
                        <TextField
                            label="Name"
                            inputProps={{ min: 0 }}
                            value={this.state.filters.keyword}
                            fullWidth
                            onChange={(e) => this.setFilterState(e, 'keyword')}
                        />
                    </Grid>
                </Grid>

                {this.state.tooManyResults ? <div>
                    <Paper elevation={1} style={{ padding: 16 }}>
                        <b>{this.state.resultCount}</b> items match your search criteria - showing those results can be slow. Please refine your search criteria. <br />
                        <Button
                            color="primary"
                            variant="raised"
                            onClick={() => this.setState({ tooManyResults: false })}
                        >Show anyway</Button>
                    </Paper>

                </div> :
                    <Paper>
                        <ImageList images={this.state.searchResults} />
                    </Paper>
                }
            </PageBase>
        );
    }
}

ImagesSearchPage.propTypes = {
    actions: PropTypes.object.isRequired,
    isLoaded: PropTypes.bool.isRequired,
    images: PropTypes.object.isRequired
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ImagesSearchPage);