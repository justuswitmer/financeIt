import {
  createMuiTheme,
} from '@material-ui/core/styles';

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
    h1: { color: '#F29F05', fontWeight: 'bold' },
    h2: { color: '#F29F05', fontWeight: 'bold' },
    h3: { color: '#F29F05', fontWeight: 'bold' },
    h4: { color: '#F29F05', fontWeight: 'bold' },
    h5: { color: '#F29F05', fontWeight: 'bold' },
    h6: { color: '#F29F05', fontWeight: 'bold' },
    body1: { color: '#F2F2F2' },
    body2: { color: '#F2F2F2' },
  },
  overrides: {
    MuiButton: {
      // root: {
      //   borderRadius: '0',
      //   fontWeight: 'bold',
      // },
      contained: {
        border: '2px solid #333333',
        boxShadow: '1px 1px 0 #014F56',
        '&:hover': {
          boxShadow: '1px 1px 0 #014F56',
        }
      }
    },
    MuiPaper: {
      root: {
        backgroundColor: '#F2F2F2',
      },
      // rounded: {
      //   borderRadius: '0',
      // },
      // elevation1: {
      //   boxShadow: '4px 3px 0 #014F56',
      // },
      // elevation2: {
      //   boxShadow: '4px 4px 0 #014F56',
      // },
      // elevation3: {
      //   boxShadow: '4px 5px 0 #014F56',
      // },
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
        color: '#F29F05'
      },
      body: {
        color: '#F2F2F2',
        fontSize: '12px',
      },
    },
    MuiFormLabel: {
      root: {
        fontSize: '14px'
      },
    },
    MuiAccordion: {
      root: {
        backgroundColor: '#333333'
      },
    },
    MuiAccordionSummary: {
      content: {
        justifyContent: 'space-around'
      },
    },
    MuiTypography: {
      body1: {
        textAlign: 'center',
        display: 'inline-flex'
      },
    },
  },
});

export default customTheme;