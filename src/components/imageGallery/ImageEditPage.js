import * as syncActions from '../../actions/syncActions';

import React, { Component } from 'react';

import Api from '../../api/EurofurenceAppApi';
import JSONPretty from 'react-json-pretty';
import PageBase from '../layout/PageBase';
import PropTypes from 'prop-types';
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


class ImageEditPage extends Component {

    constructor(props) {
        super(props);
    }

    state = {
        isLoaded: false,
        entity: {}
    }

    componentWillMount() {
        this.props.actions.ensureSync()
            .then(() => {
                let id = this.props.match.params.imageId;

                this.setState({
                    id,
                    entity: this.getImageFromStore(id),
                    isLoaded: true,
                });

            });
    }



    updateImageContent = (e) => {
        if (e.target.files == null || e.target.files.length != 1) return;
        this.setState({ isLoaded: false });

        let fileReader = new FileReader();

        fileReader.onload = () => {
            let imageBytes = btoa(fileReader.result);
            this.props.actions.updateImageContent(this.state.id, imageBytes)
                .then(() => {
                    this.setState({ entity: this.getImageFromStore(this.state.id), isLoaded: true });
                });
        };

        fileReader.readAsBinaryString(e.target.files[0]);
    }

    getImageFromStore(id) {
        return this.props.images.images.filter(item => item.Id == id)[0];
    }



    render() {
        const image = this.state.entity;
        return (
            <PageBase
                title={this.state.isLoaded ? this.state.entity.Id : ""}
                navigation="Image Detail"
                isBusy={!this.state.isLoaded}
            >


                <img src={Api.URL + "Images/" + image.Id + "/Content?" + image.ContentHashSha1} 
                style={{maxWidth: "100%"}}
                />


                <JSONPretty json={JSON.stringify(this.state)} />


                <h3>Update Image</h3>
                <input type="file" onChange={(e) => this.updateImageContent(e)} />


            </PageBase>
        );
    }
}

ImageEditPage.propTypes = {
    actions: PropTypes.object.isRequired,
    match: PropTypes.object.isRequired,
    images: PropTypes.object.isRequired
};


export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ImageEditPage);