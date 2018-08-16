import React, { Component } from 'react';

import Button from 'material-ui/Button';
import LinkFragmentEditor from './LinkFragmentEditor';
import PropTypes from 'prop-types';

class LinkListEditor extends Component {

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
        items.push({
            FragmentType: "WebExternal",
            Name: "New Link",
            Target: "www.eurofurence.de"
        });

        this.setState({ items }, () => this.raiseChanged());
    }

    delete(index) {
        let items = Object.assign([], this.state.items);
        items.splice(index, 1);

        this.setState({ items }, () => this.raiseChanged());
    }

    render() {
        return (
            <div>
                {this.state.items.map((item, index) => (
                    <LinkFragmentEditor
                        key={index}
                        item={item} allowDelete={true} allowMove={true} isFirst={(index === 0)} isLast={(index === this.state.items.length - 1)}
                        onMove={(relativePosition) => this.move(index, relativePosition)}
                        onChange={(item) => this.update(index, item)}
                        onDelete={() => this.delete(index)}
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

LinkListEditor.propTypes = {
    items: PropTypes.array.isRequired,
    onChange: PropTypes.func
};

export default LinkListEditor;