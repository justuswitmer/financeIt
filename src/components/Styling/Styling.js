import { createStyles } from '@material-ui/core/styles';

const muiStyles = (theme) => createStyles({
  table: {
    margin: theme.spacing(1),
    width: '100%',
  },
  tableRow: {

  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
  grid: {
    root: {
      flexGrow: 1,

    },
    paper: {
      padding: theme.spacing(2),
      textAlign: 'center',
      color: theme.palette.text.secondary,
    },
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
    height: "50px",
    position: 'sticky'
  },
  header: {
    margin: 0,
    position: 'sticky'
  },
  transaction: {
    root: {
      display: 'flex',
      flexWrap: 'wrap',
      justifyContent: 'space-around',
      overflow: 'hidden',
      backgroundColor: theme.palette.background.paper,

    },
    heading: {
      fontSize: theme.typography.pxToRem(15),
      fontWeight: theme.typography.fontWeightRegular,
      display: 'inline'
    },
    gridList: {
      width: 500,
      height: 450,
    },
  },
});


export default muiStyles;


