// import React from 'react';
// import PropTypes from 'prop-types';
// import { Link } from 'react-router-dom';
// import Drawer from 'material-ui/Drawer';
// import { spacing, typography } from 'material-ui/styles';
// // import { white, blue600 } from 'material-ui/styles/colors';
// import { MenuItem, MenuList } from 'material-ui/Menu';
// import Avatar from 'material-ui/Avatar';
// import Icon from 'material-ui/Icon';
// import { connect } from 'react-redux';
// import * as loginActions from '../../actions/loginActions';


// const white = "#FFFFFFF";
// const blue600 = "#0000FF";

// class LeftDrawer extends React.Component {
//     render() {
//         let { navDrawerOpen } = this.props;

//         let styles = {
//             drawer: {
//                 backgroundColor: '#CC0000',
//                 width: '200px'
//             },
//             logo: {
//                 cursor: 'pointer',
//                 fontSize: 22,
//                 color: white,
//                 //lineHeight: `${spacing.desktopKeylineIncrement}px`,
//                 // fontWeight: typography.fontWeightLight,
//                 backgroundColor: blue600,
//                 // paddingLeft: 40,
//                 textAlign: 'center',
//                 height: 56,
//             },
//             menuItem: {
//                 color: white,
//                 fontSize: 14
//             },
//             avatar: {
//                 div: {
//                     padding: '15px 0 20px 15px',
//                     //backgroundImage:  'url(' + require('../images/material_bg.png') + ')',
//                     height: 45
//                 },
//                 icon: {
//                     float: 'left',
//                     display: 'block',
//                     marginRight: 15,
//                     boxShadow: '0px 0px 0px 8px rgba(0,0,0,0.2)'
//                 },
//                 span: {
//                     paddingTop: 12,
//                     display: 'block',
//                     color: 'white',
//                     fontWeight: 300,
//                     textShadow: '1px 1px #444'
//                 }
//             }
//         };

//         let menuItems = [{
//             text: 'Welcome',
//             icon: 'fa fa-home',
//             url: '/welcome'
//         },
//         {
//             text: 'Knowledge Base',
//             icon: 'fa fa-file-text',
//             url: '/knowledgeBase'
//         }];


//         return (
//             <Drawer
//                 style={styles.drawer}
//                 variant="permanent"
//                 // docked={true}
//                 open={navDrawerOpen} >
//                 <div style={styles.logo}>
//                     Backoffice
//                     </div>
//                 <div style={styles.avatar.div}>
//                     <Avatar
//                         // src="http://666kb.com/i/dqexu7wsyxlhkac11.jpg"

//                         icon={<Icon className="fa fa-github" />}
//                         // One day we'll have pretty ones.
//                         size={50}
//                         style={styles.avatar.icon} />
//                     <span style={styles.avatar.span}>{this.props.loginStatus.username}</span>
//                 </div>
//                 <div>
//                     {menuItems.map((menu, index) => (
//                         <MenuItem
//                             key={index}
//                             style={styles.menuItem}
                            
//                             // containerElement={<Link to={menu.url} />}
//                             // leftIcon={<Icon className={menu.icon} />}
//                             >
//                             {menu.text}
//                             </MenuItem>
//                     ))}

//                     {/* <MenuItem
//                         key="logout"
//                         style={styles.menuItem}
//                         leftIcon={<Icon className="fa fa-sign-out" />}
//                         primaryText="Logout" onClick={() => this.props.dispatch(loginActions.abandonLogin())} /> */}
//                 </div>


//             </Drawer>
//         );
//     }
// }


// LeftDrawer.propTypes = {
//     navDrawerOpen: PropTypes.bool.isRequired,
//     loginStatus: PropTypes.object.isRequired,
//     dispatch: PropTypes.func.isRequired
// };

// function mapStateToProps(store) {
//     return {
//         loginStatus: store.loginStatus
//     };
// }
// export default connect(mapStateToProps)(LeftDrawer);
