import React, { Component } from 'react';

import Api from '../../api/EurofurenceAppApi';
import Button from 'material-ui/Button';
import Grid from 'material-ui/Grid';
import Icon from 'material-ui/Icon';
import PropTypes from 'prop-types';
import TextField from 'material-ui/TextField';

class ImageFragmentEditor extends Component {

    componentWillMount() {
        this.updateStateFromProps(this.props);
    }

    componentWillReceiveProps(nextProps) {
        this.updateStateFromProps(nextProps);
    }

    updateStateFromProps(props) {
        this.setState({
            item: props.item,
            allowDelete: props.allowDelete,
            allowMove: props.allowMove,
            isLast: props.isLast,
            isFirst: props.isFirst,
        });
    }

    raiseChange() {
        if (this.props.onChange !== undefined) this.props.onChange(this.state.item);
    }

    raiseMove(relativePosition) {
        if (this.props.onMove !== undefined) this.props.onMove(relativePosition);
    }

    raiseDelete() {
        if (this.props.onDelete !== undefined) this.props.onDelete();
    }

    raiseUpdate() {
        if (this.props.onUpdate !== undefined) this.props.onUpdate();
    }

    updateSelf = (event) => {
        let value = event.target.value;
        this.setState({ item: value },
            () => this.raiseChange());
    }


    render() {
        return (
            <div>
                <Grid container spacing={24} alignItems="flex-top">
                    <Grid item xs={12} md={4}>
                        <img src={Api.URL + "Images/" + this.state.item + "/Content"} 
                            style={{maxWidth: "100%"}}
                        />

                        <Button color="primary" fullWidth onClick={() => this.raiseUpdate()}>
                        Update Image
                        </Button>
                    </Grid>

                    <Grid item xs={12} md={8} lg={9} xl={10}>
                        <TextField
                            label="Image Id"
                            value={this.state.item}
                            fullWidth
                            onChange={(e) => this.updateSelf(e)}
                        />
                    </Grid>
                    <Grid item xs={12} xl={2} lg={3} md={12}>
                        <div style={{ display: 'flex', justifyContent: 'center' }}>
                            <Button color="primary" disabled={this.props.isFirst}
                                style={{ minWidth: 0 }}
                                onClick={() => this.raiseMove(-1)}>
                                <Icon className="fa fa-chevron-up" />
                            </Button>
                            <Button color="primary" disabled={this.props.isLast}
                                style={{ minWidth: 0 }}
                                onClick={() => this.raiseMove(1)}>
                                <Icon className="fa fa-chevron-down" />
                            </Button>
                            <Button color="primary" disabled={!this.props.allowDelete}
                                variant="raised"
                                style={{ minWidth: 0 }}
                                onClick={() => this.raiseDelete()}>
                                <Icon className="fa fa-trash" />
                            </Button>
                        </div>
                    </Grid>

                </Grid>

            </div>
        );
    }
}

ImageFragmentEditor.propTypes = {
    items: PropTypes.array.isRequired,
    onChange: PropTypes.func,
    onDelete: PropTypes.func,
    onMove: PropTypes.func,
    onUpdate: PropTypes.func,
    isFirst: PropTypes.bool,
    isLast: PropTypes.bool,
    allowDelete: PropTypes.bool
};

export default ImageFragmentEditor;