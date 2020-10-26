// create custom themes of components
import {
  createMuiTheme,
} from '@material-ui/core/styles';

const customTheme = createMuiTheme({
  // theme settings
  palette: {
    primary: {
      main: '#F29F05',
    },
    secondary: {
      // light: '',
      main: '#6CA663',
      // dark: '',
      // contrastText: '',
    },
    info: { main: '#6CA663' },
  },
  // color of text
  typography: {
    body1: {
      color: '#F29F05',
    },
    body2: { color: '#F2F2F2' },

  },
  // overides for components
  overrides: {
    // text field customization 
    MuiOutlinedInput: {
      root: {
        borderRadius: '4px',
        marginTop: '5px',
      },
      notchedOutline: {
        borderColor: '#2D8C1F',
      },
    },
    // tables for summary and categories pages
    MuiTable: {
      root: {
        backgroundColor: '#3d3d3d',
        borderRadius: '4px',
        border: '1px solid #00000062',
      },
    },
    // table cells for summary and categories pages
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
    // used in category select
    MuiFormLabel: {
      root: {
        fontSize: '14px'
      },
    },
    // used in category select
    MuiFormControl: {
      root: {
        width: '-webkit-fill-available',
        paddingLeft: '5px',
        paddingRight: '5px'
      },
    },
    // used in category select
    MuiSelect: {
      selectMenu: {
        width: '80px'
      },
    },
    // customizing all accordians
    MuiAccordion: {
      root: {
        backgroundColor: '#3d3d3d',
        width: ''
      },
    },
    // customizing all accordian summaries
    MuiAccordionSummary: {
      root: {
        width: '333px',
        justifyContent: 'space-between',
        minHeight: '40px',
      },
    },
    // customizing all accordian actions
    MuiAccordionActions: {
      root: {
        height: '30px',
      },
    },
    // customizing all accordian dividers
    MuiDivider: {
      root: {
        backgroundColor: 'rgba(242, 159, 5, 0.5)',
      },
    },
    // customization of typography in accordians
    MuiTypography: {
      body1: {
        textAlign: 'center',
        display: 'inline-flex'
      },
    },
    // used in TransactionsView
    MuiGridListTile: {
      root: {
        marginLeft: '9px',
        marginTop: '1px',
        marginBottom: '1px',
      },
    },
    // menu for cateroy dropodown
    MuiMenuItem: {
      root: {
        backgroundColor: '#3d3d3d'
      },
    },
    // navBar
    MuiBottomNavigation: {
      root: {
        position: 'fixed',
        bottom: '0',
        width: '375px',
        backgroundColor: '#0f3809',
        borderTop: '1px solid #0a290562',
        alignItems: 'center',
      },
      // small Buttons
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