// import React, { Component } from 'react';
// import PropTypes from 'prop-types';


// import AppBar from 'material-ui/AppBar';
// import IconButton from 'material-ui/IconButton';
// import Typography from 'material-ui/Typography';
// // import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
// // import Menu from 'material-ui/svg-icons/navigation/menu';
// // import ViewModule from 'material-ui/svg-icons/action/view-module';

// class Header extends Component {


//     render() {
//         const { styles, handleChangeRequestNavDrawer } = this.props;

//         const style = {
//             appBar: {
//                 position: 'fixed',
//                 top: 0,
//                 overflow: 'hidden',
//                 maxHeight: 57
//             },
//             menuButton: {
//                 marginLeft: 10
//             },
//             iconsRightContainer: {
//                 marginLeft: 20
//             }
//         };

//         return (
//             <AppBar
//             className={classNames(classes.appBar, {
//               [classes.appBarShift]: open,
//               [classes[`appBarShift-${anchor}`]]: open,
//             })}
//           >
//             <Toolbar disableGutters={!open}>
//               <IconButton
//                 color="inherit"
//                 aria-label="open drawer"
//                 onClick={this.handleDrawerOpen}
//                 className={classNames(classes.menuButton, open && classes.hide)}
//               >
//                 <MenuIcon />
//               </IconButton>
//               <Typography variant="title" color="inherit" noWrap>
//                 Persistent drawer
//               </Typography>
//             </Toolbar>
//           </AppBar>
//         );
//     }
// }

// Header.propTypes = {
//     styles: PropTypes.object,
//     handleChangeRequestNavDrawer: PropTypes.func
// };

// export default Header;