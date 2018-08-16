import React, { Component } from 'react';
import Table, { TableBody, TableCell, TableHead, TableRow } from 'material-ui/Table';

import Api from '../../api/EurofurenceAppApi';
import Paper from 'material-ui/Paper';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';

const styles = () => ({
    previewImage: {
        maxWidth: '150px',
        maxHeight: '100px',
        textAlign: 'center'
    },
    previewContainer: {
        height: '100px',
        width: '150px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    }
});

class ImageList extends Component {
    render() {
        const { classes, images } = this.props;
        return (
            <div>

                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Image</TableCell>
                            <TableCell>Dimensions</TableCell>
                            <TableCell>Size</TableCell>
                            <TableCell>Internal Reference</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {images.map((item, index) => (
                            <TableRow key={index}>
                                <TableCell>
                                    <Paper className={classes.previewContainer}>

                                        <img className={classes.previewImage} src={Api.URL + "Images/" + item.Id + "/Content"} />
                                    </Paper>

                                </TableCell>
                                <TableCell>
                                    {item.Width} x {item.Height} px
                                    </TableCell>
                                <TableCell>
                                    {item.SizeInBytes} bytes
                                </TableCell>
                                <TableCell>
                                    {item.InternalReference}
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
        );
    }
}

ImageList.propTypes = {
    classes: PropTypes.object.isRequired,
    images: PropTypes.object.isRequired
};

export default withStyles(styles)(ImageList);