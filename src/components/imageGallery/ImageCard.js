import Card, { CardContent, CardHeader, CardMedia } from 'material-ui/Card';
import React, { Component } from 'react';

import Api from '../../api/EurofurenceAppApi';
import Avatar from 'material-ui/Avatar';
import PropTypes from 'prop-types';
import Typography from 'material-ui/Typography';
import { withStyles } from 'material-ui/styles';

const styles = (theme) => ({
    card: {
        height: 360,
        width: 400
    },
    media: {
        height: 0,
        paddingTop: '56.25%', // 16:9
    },
    image: {
        maxWidth: 200,
        maxHeight: 200
    },
    chip: {
        margin: theme.spacing.unit / 2,
    },
    bullet: {
        display: 'inline-block',
        margin: '0 2px',
        transform: 'scale(0.8)',
    },
    platform: {
    },
    tags: {
        fontSize: "0.8em",
        margin: 0,
    },
    deviceCount: {
        float: "right",
        fontWeight: 400,
        textAlign: "right",
        fontSize: "2em"
    },
    pos: {
        marginBottom: 12,
    },
});

class ImageCard extends Component {
    render() {
        const { classes, image } = this.props;
        return (
            <div>
                <Card className={classes.card}>
                    <CardHeader
                        avatar={
                            <Avatar aria-label="Recipe">
                                I
                    </Avatar>
                        }
                        title={image.Id}
                        subheader="Yo"
                    />
                    <CardMedia image={Api.URL + "Images/" + image.Id + "/Content"}
                        className={classes.media}
                        title="Contemplative Reptile"
                    />
                    <CardContent>
                        <Typography gutterBottom variant="headline" component="h2">
                            Lizard
                            </Typography>
                        <Typography component="p">
                            Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging
          across all continents except Antarctica
        </Typography>
                    </CardContent>
                </Card>

            </div>
        );
    }
}

ImageCard.propTypes = {
    classes: PropTypes.object.isRequired,
    image: PropTypes.object.isRequired
};


export default withStyles(styles)(ImageCard);