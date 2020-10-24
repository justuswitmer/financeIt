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
      main: '#3333',
      // dark: '',
      // contrastText: '',
    },
    info: { main: '#6CA663' },
  },
  typography: {
    body1: {
      color: '#F29F05',
    },
    body2: { color: '#F2F2F2' },

  },
  overrides: {
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
        borderRadius: '4px',
        marginTop: '5px',
      },
      notchedOutline: {
        borderColor: '#2D8C1F',
      },
    },
    MuiTable: {
      root: {
        backgroundColor: '#3d3d3d',
        borderRadius: '4px',
        border: '1px solid #00000062',
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
        width: '333px',
        justifyContent: 'space-between',
        minHeight: '40px',
      },
    },
    MuiAccordionActions: {
      root: {
        height: '30px',
      },
    },
    MuiDivider: {
      root: {
        backgroundColor: 'rgba(242, 159, 5, 0.5)',
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
      },
    },
    MuiMenuItem: {
      root: {
        backgroundColor: '#3d3d3d'
      },
    },
    MuiListItem: {
      selected: {
        backgroundColor: 'blue'
      },
    },
    MuiBottomNavigation: {
      root: {
        position: 'fixed',
        bottom: '0',
        width: '375px',
        backgroundColor: '#0f3809',
        borderTop: '1px solid #0a290562',
        alignItems: 'center',
      },
    },
    MuiButton: {
      containedSizeSmall: {
        padding: '4px',
        fontSize: '12px',
      }
    }
  },
});

export default customTheme;