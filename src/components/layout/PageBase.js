import React from 'react';
import PropTypes from 'prop-types';
import Paper from 'material-ui/Paper';
import Divider from 'material-ui/Divider';
import globalStyles from '../../styles/material';
import { CircularProgress } from 'material-ui/Progress';
import Typography from 'material-ui/Typography';


const PageBase = (props) => {

  const defaults = {
    showPaper: true,
    showDivider: true
  };

  const { title, navigation, isBusy, showPaper, showDivider } = { ...defaults, ...props };

  const content = (<div>

    {isBusy ?
      <CircularProgress /> :
      <div>
        <Typography variant="headline" color="inherit" noWrap>
            {title}
        </Typography>
        
        {showDivider ? <Divider style={globalStyles.titleDivider} /> : null}
        {props.children}
      </div>
    }

    <div style={globalStyles.clear} />
  </div>
  );

  return (
    <div>
        <Typography variant="subheading" color="inherit" noWrap>
          {navigation}
        </Typography>


      {!showPaper ? content : 
      <Paper style={globalStyles.paper}>
        {content}
      </Paper>
      }
    </div>
  );
};


PageBase.propTypes = {
  title: PropTypes.string,
  isBusy: PropTypes.bool,
  children: PropTypes.node,
};

export default PageBase;