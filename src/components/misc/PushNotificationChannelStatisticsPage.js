import * as syncActions from '../../actions/syncActions';

import Card, { CardContent } from 'material-ui/Card';
import React, { Component } from 'react';
import Table, { TableBody, TableCell, TableHead, TableRow } from 'material-ui/Table';

import Chip from 'material-ui/Chip';
import Grid from 'material-ui/Grid';
import PageBase from '../layout/PageBase';
import PropTypes from 'prop-types';
import Typography from 'material-ui/Typography';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { withStyles } from 'material-ui/styles';

const styles = (theme) => ({
    card: {
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


function mapStateToProps() {
    return {
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(syncActions, dispatch)
    };
}

const MyCard = (props) => {

    const { classes, number, title, subtitle } = props;
    return (
        <Card className={classes.card}>
            <CardContent>
                <Typography className={classes.deviceCount}>
                    {number}
                </Typography>
                <Typography className={classes.platform} color="primary">
                    {title}
                </Typography>
                <Typography className={classes.tags} color="textSecondary">
                    {subtitle}
                </Typography>
            </CardContent>
        </Card>
    );
};


class PushNotificationChannelStatisticsPage extends Component {

    state = {
        isLoaded: false,
        statistics: {
            PlatformStatistics: [],
            NumberOfDevices: 0,
            NumberOfAuthenticatedDevices: 0,
            NumberOfUniqueUserIds: 0,
            SinceLastSeenDateTimeUtc: "",
            deviceCountsByPlatform: { windows: 0, ios: 0, android: 0 }
        }
    }

    componentWillMount() {
        this.props.actions.getPushNotificationChannelStatistics()
            .then((result) => this.setState({
                isLoaded: true, statistics: this.aggregate(result.data)
            }));
    }

    aggregate(statistics) {

        statistics = {
            ...statistics,
            deviceCountsByPlatform: {
                ios: statistics.PlatformStatistics.filter(item => item.Platform.toLowerCase() == "firebase" && item.Tags.findIndex(tag => tag.toLowerCase() == "ios") > -1)
                    .reduce((pv, cv) => pv + cv.DeviceCount, 0),
                android: statistics.PlatformStatistics.filter(item => item.Platform.toLowerCase() == "firebase" && item.Tags.findIndex(tag => tag.toLowerCase() == "android") > -1)
                    .reduce((pv, cv) => pv + cv.DeviceCount, 0),
                windows: statistics.PlatformStatistics.filter(item => item.Platform.toLowerCase() == "wns")
                    .reduce((pv, cv) => pv + cv.DeviceCount, 0)
            },
            authenticationRatio: statistics.NumberOfAuthenticatedDevices / statistics.NumberOfDevices
        };

        return statistics;
    }



    render() {
        const { classes } = this.props;
        return (
            <PageBase isBusy={!this.state.isLoaded} showPaper={false}
                navigation="Push Notification Channel" title="Statistics"
            >
                <Grid container spacing={16}>
                    <Grid item xs={12} md={6}>
                        <MyCard
                            classes={classes}
                            number={this.state.statistics.NumberOfDevices}
                            title="Devices total"
                            subtitle={<div>
                                Android: <b>{this.state.statistics.deviceCountsByPlatform.android}</b>, iOS: <b>{this.state.statistics.deviceCountsByPlatform.ios}</b>, Windows: <b>{this.state.statistics.deviceCountsByPlatform.windows}</b> <br />
                                with activity since <b>{this.state.statistics.SinceLastSeenDateTimeUtc}</b>
                            </div>}
                        />
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <MyCard
                            classes={classes}
                            number={this.state.statistics.NumberOfAuthenticatedDevices}
                            title="Devices with authenticated users"
                            subtitle={<div>
                                Unique user ids: <b>{this.state.statistics.NumberOfUniqueUserIds}</b> <br />
                                Ratio: <b>{Math.round(this.state.statistics.authenticationRatio * 1000) / 10}%</b>
                             </div>}
                        />
                    </Grid>
                </Grid>


                <Table className={classes.table}>
                    <TableHead>
                        <TableRow>
                            <TableCell numeric>Device Count</TableCell>
                            <TableCell>Platform</TableCell>
                            <TableCell>Tags</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {this.state.statistics.PlatformStatistics.map((item, index) => (
                            <TableRow key={index}>
                                <TableCell numeric>{item.DeviceCount}</TableCell>
                                <TableCell>{item.Platform}</TableCell>
                                <TableCell>
                                    {item.Tags.map(tag => (
                                        <Chip className={classes.chip}
                                            label={tag.toLowerCase()} key={tag} />
                                    ))}

                                </TableCell>
                                {/* <TableCell numeric>{n.calories}</TableCell>
                                        <TableCell numeric>{n.fat}</TableCell>
                                        <TableCell numeric>{n.carbs}</TableCell>
                                        <TableCell numeric>{n.protein}</TableCell> */}
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>

                {/* <Grid container spacing={16}>



                        {this.state.statistics.PlatformStatistics.map((item, index) => (

                            <Grid item key={index} xs={4}>

                                <Card className={classes.card}>
                                    <CardContent>
                                    <Typography className={classes.deviceCount}>
                                            {item.DeviceCount}
                                        </Typography>
                                        <Typography className={classes.platform} color="primary">
                                            {item.Platform}
                                        </Typography>
                                        <Typography className={classes.tags} color="textSecondary">
                                            <ul>
                                            {item.Tags.map(tag => (
                                                <li key={tag}>{tag}</li>
                                            ))}
                                            </ul>
                                        </Typography>
                                    </CardContent>
                                </Card>
                            </Grid>
                        ))}

                    </Grid> */}



            </PageBase>
        );
    }
}


PushNotificationChannelStatisticsPage.propTypes = {
    actions: PropTypes.object.isRequired,
    classes: PropTypes.object
};

MyCard.propTypes = {
    classes: PropTypes.object,
    deviceCount: PropTypes.node,
    number: PropTypes.node,
    title: PropTypes.node,
    subtitle: PropTypes.node 
};



export default connect(
    mapStateToProps,
    mapDispatchToProps
)(withStyles(styles)(PushNotificationChannelStatisticsPage));