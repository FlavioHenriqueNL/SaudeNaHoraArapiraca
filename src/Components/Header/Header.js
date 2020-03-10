import Logout from '../Logout';
import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import {AppBar, Toolbar, Container} from '@material-ui/core';
import logo from './img/logo.png';
import MenuLateral from './Drawer';

export default function ButtonAppBar() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar className={classes.header} position="static">
        <Container>
          <Toolbar className={classes.toolbar}>
            <div className={classes.menuContainer}>
              <MenuLateral/>
              <div>
                <img src={logo} alt="Saúde na Hora" width="150px" height="auto" />
              </div>
            </div>
            <Logout/>
          </Toolbar>
        </Container>
      </AppBar>
    </div>
  );
}

const useStyles = makeStyles(theme => ({
  header:{
    background: '#fff'
  },
  root: {
    flexGrow: 1,
  },
  menuContainer:{
    display: 'flex',
    alignItems: 'center',
  },
  toolbar:{
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  menuButton: {
    color: '#53CC7D',
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
    color: 'blue'
  },
  MenuIcon:{
    fontSize: '3.0rem'
  }
}));