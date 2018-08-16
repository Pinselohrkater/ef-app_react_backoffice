import { Route, Switch, withRouter } from 'react-router-dom';

import AboutPage from '../AboutPage';
import AppBar from 'material-ui/AppBar';
import ChevronLeftIcon from 'material-ui-icons/ChevronLeft';
import ChevronRightIcon from 'material-ui-icons/ChevronRight';
import Divider from 'material-ui/Divider';
import Drawer from 'material-ui/Drawer';
import FursuitBadgesMainPage from './../fursuitBadges/FursuitBadgesMainPage';
import IconButton from 'material-ui/IconButton';
import ImageEditPage from './../imageGallery/ImageEditPage';
import ImagesSearchPage from './../imageGallery/ImagesSearchPage';
import KnowledgeBaseEntryDetailPage from './../knowledgeBase/KnowledgeBaseEntryDetailPage';
import KnowledgeBaseGroupDetailPage from './../knowledgeBase/KnowledgeBaseGroupDetailPage';
import KnowledgeBaseMainPage from './../knowledgeBase/KnowledgeBaseMainPage';
import MenuIcon from 'material-ui-icons/Menu';
import NavigationMenu from './NavigationMenu';
import NotFoundPage from './../NotFoundPage';
import PropTypes from 'prop-types';
import PushNotificationChannelStatisticsPage from './../misc/PushNotificationChannelStatisticsPage';
import React from 'react';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import classNames from 'classnames';
import compose from 'recompose/compose';
import { connect } from 'react-redux';
import { withStyles } from 'material-ui/styles';
import withWidth from 'material-ui/utils/withWidth';

const drawerWidth = 240;


const styles = theme => ({
    root: {
        flexGrow: 1,
    },
    appFrame: {
        minHeight: "100vh",
        zIndex: 1,
        overflow: 'hidden',
        position: 'relative',
        display: 'flex',
        width: '100%',
    },
    appBar: {
        // position: 'absolute',
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
    },
    appBarShift: {
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    'appBarShift-left': {
        marginLeft: drawerWidth,
    },
    'appBarShift-right': {
        marginRight: drawerWidth,
    },
    menuButton: {
        marginLeft: 12,
        marginRight: 20,
    },
    hide: {
        display: 'none',
    },
    drawerPaper: {
        position: 'fixed',
        width: drawerWidth,
    },
    drawerHeader: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        padding: '0 8px',
        ...theme.mixins.toolbar,
        //backgroundColor: theme.palette.primary.main,
        backgroundImage: 'url("https://www.transparenttextures.com/patterns/skulls.png");'
    },
    drawerSpacer: {
        ...theme.mixins.toolbar
    },
    content: {
        flexGrow: 1,
        width: 0,
        backgroundColor: theme.palette.background.default,
        padding: theme.spacing.unit * 3,
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
    },
    'content-left': {
        marginLeft: 0,
    },
    'content-right': {
        marginRight: 0,
    },
    contentShift: {
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    'contentShift-left': {
        marginLeft: drawerWidth,
    },
    'contentShift-right': {
        marginRight: drawerWidth,
    },
});


function mapStateToProps(state) {
    return {
        loginStatus: state.loginStatus
    };
}

class PersistentDrawer extends React.Component {
    constructor(props) {
        super(props);
        this.state.open = props.width != "xs" && props.width != "sm";
    }

    state = {
        open: true,
        anchor: 'left',
    };

    handleDrawerToggle = () => {
        this.setState((prevState) => ({ open: !prevState.open }));
    }

    handleDrawerOpen = () => {
        this.setState({ open: true });
    };

    handleDrawerClose = () => {
        this.setState({ open: false });
    };

    handleChangeAnchor = event => {
        this.setState({
            anchor: event.target.value,
        });
    };

    render() {
        const { classes, theme } = this.props;
        const { anchor, open } = this.state;

        const drawer = (
            <Drawer
                anchor={anchor}
                open={open}
                position="fixed"
                variant="persistent"
                classes={{
                    paper: classes.drawerPaper,
                }}
            >
                <div className={classes.drawerHeader}>
                    <IconButton onClick={this.handleDrawerClose}>
                        {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
                    </IconButton>
                </div>
                <Divider />
                <NavigationMenu />

            </Drawer>
        );

        let before = null;
        let after = null;

        if (anchor === 'left') {
            before = drawer;
        } else {
            after = drawer;
        }

        return (
            <div className={classes.root}>
                <div className={classes.appFrame}>
                    <AppBar
                        color="primary"
                        position="fixed"
                        elevation={0}

                        className={classNames(classes.appBar, {
                            [classes.appBarShift]: open,
                            [classes[`appBarShift-${anchor}`]]: open,
                        })}
                    >
                        <Toolbar disableGutters={!open}>
                            <IconButton
                                color="inherit"
                                aria-label="open drawer"
                                onClick={this.handleDrawerToggle}
                                className={classNames(classes.menuButton)}
                            >
                                <MenuIcon />
                            </IconButton>
                            <Typography variant="title" style={{ fontWeight: 300 }} color="inherit" noWrap>
                                Eurofurence Mobile Apps - Backoffice
                            </Typography>
                        </Toolbar>
                    </AppBar>
                    {before}
                    <main
                        className={classNames(classes.content, classes[`content-${anchor}`], {
                            [classes.contentShift]: open,
                            [classes[`contentShift-${anchor}`]]: open,
                        })}
                    >
                        <div className={classes.drawerSpacer} />
                        <Typography>
                            <Switch>
                                <Route exact path="/knowledgeBase" component={KnowledgeBaseMainPage} />
                                <Route path="/knowledgeBase/group/:groupId" component={KnowledgeBaseGroupDetailPage}  />
                                <Route path="/knowledgeBase/entry/new/:groupId" component={KnowledgeBaseEntryDetailPage} key="newGroup" />
                                <Route path="/knowledgeBase/entry/:entryId" component={KnowledgeBaseEntryDetailPage} key="detail" />
                                <Route exact path="/images" component={ImagesSearchPage} />
                                <Route path="/images/edit/:imageId" component={ImageEditPage} />
                                <Route exact path="/fursuitBadges" component={FursuitBadgesMainPage} />
                                <Route exact path="/" component={PushNotificationChannelStatisticsPage} />
                                <Route path="/about" component={AboutPage} />
                                <Route component={NotFoundPage} />
                            </Switch>
                        </Typography>
                    </main>
                    {after}
                </div>
            </div>
        );
    }
}

PersistentDrawer.propTypes = {
    classes: PropTypes.object.isRequired,
    theme: PropTypes.object.isRequired,
    width: PropTypes.string.isRequired
};

export default
    withRouter(
        compose(
            connect(mapStateToProps),
            withWidth(),
            withStyles(styles, { withTheme: true })
        )(PersistentDrawer));