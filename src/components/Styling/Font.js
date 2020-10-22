import {
  createMuiTheme,
} from '@material-ui/core/styles';

const font = "'Open Sans', sans-serif";
const fontTheme = createMuiTheme({
  typography: {
    fontFamily: font,
    button: {
      textTransform: "none"
    },
  },
});

export default fontTheme;