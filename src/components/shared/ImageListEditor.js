import React, { Component } from 'react';

import Button from 'material-ui/Button';
import ImageFragmentEditor from './ImageFragmentEditor';
import Paper from 'material-ui/Paper';
import PropTypes from 'prop-types';

class ImageListEditor extends Component {

    state = {
        items: this.props.items
    }

    raiseChanged() {
        if (!this.props.onChange) return;
        this.props.onChange(this.state.items);
    }

    move(index, relativePosition) {
        let items = Object.assign([], this.state.items);

        let a = items[index];
        let b = items[index + relativePosition];

        items[index] = b;
        items[index + relativePosition] = a;

        this.setState({ items }, () => this.raiseChanged());
    }

    update(index, item) {
        let items = Object.assign([], this.state.items);
        items[index] = item;

        this.setState({ items }, () => this.raiseChanged());
    }

    insert() {
        let items = Object.assign([], this.state.items);
        items.push("image-uid-here");

        this.setState({ items }, () => this.raiseChanged());
    }

    delete(index) {
        let items = Object.assign([], this.state.items);
        items.splice(index, 1);

        this.setState({ items }, () => this.raiseChanged());
    }

    edit(index) {
        if (!this.props.onEdit) return;
        this.props.onEdit(this.state.items[index]);
    }

    render() {
        return (
            <div>

                <Paper style={{marginBottom: 10, padding: 10, backgroundColor: "#AACCFF"}}>
                    <b>If you need images added to entries that do not have them, please poke @pinselohrkater on Telegram. It's not supported here (yet).</b>
                    <br />
                    (You can, however, update existing images.)
                </Paper>


                {this.state.items.map((item, index) => (
                    <ImageFragmentEditor
                        key={index}
                        item={item} allowDelete={true} allowMove={true} isFirst={(index === 0)} isLast={(index === this.state.items.length - 1)}
                        onMove={(relativePosition) => this.move(index, relativePosition)}
                        onChange={(item) => this.update(index, item)}
                        onDelete={() => this.delete(index)}
                        onUpdate={() => this.edit(index)}
                    />
                ))}

                <center>
                    <Button variant="flat" color="primary" onClick={() => this.insert()}>
                        Add
                </Button>
                </center>




            </div>
        );
    }
}

ImageListEditor.propTypes = {
    items: PropTypes.array.isRequired,
    onChange: PropTypes.func,
    onEdit: PropTypes.func
};

export default ImageListEditor;