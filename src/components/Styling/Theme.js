import {
  createMuiTheme,
} from '@material-ui/core/styles';
import './Theme.css';
const font = "'Open Sans', sans-serif";

// CUSTOM THEME
const customTheme = createMuiTheme({
  // theme settings
  palette: {
    primary: {
      main: '#F29F05',
    },
    secondary: {
      // light: '',
      main: '#eeb64f',
      // dark: '',
      // contrastText: '',
    },
    info: { main: '#6CA663' },
  },
  typography: {
    fontFamily: font,
    button: {
      textTransform: "none"
    },
    body1: { color: '#F29F05' },
    body2: { color: '#F29F05' },

  },
  overrides: {
    MuiButton: {
      contained: {
        border: '2px solid #33333',
        boxShadow: '1px 1px 0 #014F56',
        '&:hover': {
          boxShadow: '1px 1px 0 #014F56',
        },
      }
    },
    MuiPaper: {
      root: {
        backgroundColor: '#3d3d3d',

      },
    },
    MuiCard: {
      root: {
        marginTop: '30px',
        backgroundColor: '#3d3d3d',
        overflow: 'visible',
      }
    },
    MuiCardHeader: {
      root: {
        margin: '-30px auto 0',
        backgroundColor: '#4EA09E',
        border: '2px solid #333333',
        boxSizing: 'border-box',
        width: '90%',
        fontWeight: 'bold',
      }
    },
    MuiOutlinedInput: {
      root: {
        borderRadius: '0',
      },
      notchedOutline: {
        borderColor: '#333333',
      },
    },
    MuiTable: {
      root: {
        backgroundColor: '#333333',
        borderRadius: '4px',
      },
    },
    MuiTableCell: {
      head: {
        color: '#F29F05',
        padding: '5px',
        fontWeight: 'bold',
        fontSize: '14px'
      },
      body: {
        color: '#F2F2F2',
        fontSize: '14px',
      },
    },
    MuiTableContainer: {
      root: {

      },
    },
    MuiFormLabel: {
      root: {
        fontSize: '14px'
      },
    },
    MuiFormControl: {
      root: {
        width: '-webkit-fill-available',
        paddingLeft: '5px',
        paddingRight: '5px'
      },
    },
    MuiSelect: {
      selectMenu: {
        width: '80px'
      },
    },
    MuiAccordion: {
      root: {
        backgroundColor: '#3d3d3d',
        width: ''
      },
    },
    MuiAccordionSummary: {
      root: {
        width: '320px',
        justifyContent: 'space-between'
      },
    },
    MuiTypography: {
      body1: {
        textAlign: 'center',
        display: 'inline-flex'
      },
    },
    MuiGridListTile: {
      root: {
        marginLeft: '9px',
        marginTop: '1px',
        marginBottom: '1px',
      }
    }
  },
});

export default customTheme;