import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withStyles, createStyles } from '@material-ui/core/styles';

const muiStyles = (theme) => createStyles({
  table: {
    margin: theme.spacing(1),
    width: '100%',
  },
  tableRow: {

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
  list: {
    width: 250,
  },
  fullList: {
    width: 'auto',
  },
});


export default muiStyles;

