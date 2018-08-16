import React, { Component } from 'react';

import {
    FormHelperText
} from 'material-ui/Form';
import Grid from 'material-ui/Grid';
import Icon from 'material-ui/Icon';
import MenuItem from 'material-ui/Menu/MenuItem';
import PropTypes from 'prop-types';
import ReactMarkdown from 'react-markdown';
import TextField from 'material-ui/TextField';

class KnowledgeBaseEntryEditForm extends Component {

    constructor(props) {
        super(props);

        this.state = {
            Order: props.Order,
            Title: props.Title,
            Text: props.Text,
            KnowledgeGroupId: props.KnowledgeGroupId
        };
    }

    setInputState = (event, property) => {
        this.setState({ [property]: event.target.value },
            () => this.raiseChange());
    }

    raiseChange = () => {
        if (this.props.onChange) {
            this.props.onChange({
                Order: this.state.Order,
                Title: this.state.Title,
                Text: this.state.Text,
                KnowledgeGroupId: this.state.KnowledgeGroupId,
            });
        }
    }

    render() {
        return (
            <div>
                <Grid container spacing={24} alignItems="flex-end">
                    <Grid item xs={2} md={1}>
                        <TextField
                            type="number"
                            label="Order"
                            inputProps={{ min: 0 }}
                            value={this.state.Order}
                            fullWidth
                            onChange={(e) => this.setInputState(e, 'Order')}
                        />
                    </Grid>
                    <Grid item xs={10} md={5}>
                        <TextField
                            label="Group"
                            select
                            value={this.state.KnowledgeGroupId}
                            fullWidth
                            onChange={(e) => this.setInputState(e, 'KnowledgeGroupId')}
                        >
                            {this.props.knowledgeGroups.map(option => (
                                <MenuItem key={option.Id} value={option.Id}>
                                    <Icon className="fa" style={{ fontSize: '1em' }}>{String.fromCharCode(parseInt(option.FontAwesomeIconCharacterUnicodeAddress, 16))}</Icon>
                                    &nbsp;
                            {option.Name}
                                </MenuItem>
                            ))}
                        </TextField>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <TextField
                            label="Title"
                            value={this.state.Title}
                            fullWidth
                            onChange={(e) => this.setInputState(e, 'Title')}
                        />
                    </Grid>
                    
                </Grid>

                <Grid container spacing={24} alignItems="flex-start">
                    <Grid item xs={12} md={6}>
                    <TextField
                            label="Text"
                            value={this.state.Text}
                            fullWidth
                            multiline
                            onChange={(e) => this.setInputState(e, 'Text')}
                        />                    
                    </Grid>

                    <Grid item xs={12} md={6}>
                    <FormHelperText style={{margin: 0}}>Preview</FormHelperText>              
                    <ReactMarkdown source={this.state.Text} />
                    </Grid>                    
                </Grid>
            </div>
        );
    }
}

KnowledgeBaseEntryEditForm.propTypes = {
    Order: PropTypes.number,
    Title: PropTypes.string,
    Text: PropTypes.string,
    KnowledgeGroupId: PropTypes.string,
    onChange: PropTypes.func,
    knowledgeGroups: PropTypes.object
};

export default KnowledgeBaseEntryEditForm;