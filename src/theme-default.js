import { createMuiTheme }  from 'material-ui/styles';


// A theme with custom primary and secondary color.
// It's optional.
const theme = createMuiTheme({
  palette: {
    type: 'light',
    primary: { 
      //main: '#2196f3'
      main: '#607d8b'
    },
    secondary: {
      main: '#F39C12'
    }
  },
});

export default theme;