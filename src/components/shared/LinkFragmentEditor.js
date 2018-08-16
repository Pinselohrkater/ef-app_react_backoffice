import React, { Component } from 'react';

import Button from 'material-ui/Button';
import Grid from 'material-ui/Grid';
import Icon from 'material-ui/Icon';
import MenuItem from 'material-ui/Menu/MenuItem';
import PropTypes from 'prop-types';
import TextField from 'material-ui/TextField';

class LinkFragmentEditor extends Component {

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


    update = (event, property) => {
        let value = event.target.value;
        this.setState((state) => ({ item: { ...state.item, [property]: value } }),
            () => this.raiseChange());
    }

    render() {
        return (
            <div>
                <Grid container spacing={24} alignItems="flex-end">
                    <Grid item xs={12} md={3} lg={3} xl={2}>
                        <TextField
                            label="Link Type"
                            select
                            value={this.state.item.FragmentType}
                            fullWidth
                            onChange={(e) => this.update(e, 'FragmentType')}
                        >
                            <MenuItem value={'WebExternal'}>Web External</MenuItem>>
                        <MenuItem value={'MapExternal'}>Map External</MenuItem>
                            <MenuItem value={'MapEntry'}>Map Entry</MenuItem>
                            <MenuItem value={'DealerDetail'}>Dealer Detail</MenuItem>
                            <MenuItem value={'EventConferenceRoom'}>Event Conference Room</MenuItem>
                        </TextField>
                    </Grid>
                    <Grid item xs={12} md={4} lg={3} xl={3}>
                        <TextField
                            label="Name"
                            value={this.state.item.Name}
                            fullWidth
                            onChange={(e) => this.update(e, "Name")}
                        />
                    </Grid>
                    <Grid item xs={12} md={5} lg={3} xl={5}>
                        <TextField
                            label="Target"
                            value={this.state.item.Target}
                            fullWidth
                            onChange={(e) => this.update(e, "Target")}
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

LinkFragmentEditor.propTypes = {
    items: PropTypes.array.isRequired,
    onChange: PropTypes.func,
    onDelete: PropTypes.func,
    onMove: PropTypes.func,
    isFirst: PropTypes.bool,
    isLast: PropTypes.bool,
    allowDelete: PropTypes.bool
};

export default LinkFragmentEditor;