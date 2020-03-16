import React from 'react';
import Firebase from '../connection';
import { makeStyles } from "@material-ui/core/styles";

export default function Logout(){
  const style = useStyles();
  return(
    <button className={style.buttonLogout} onClick={e => Firebase.auth().signOut()}>Sair do sistema</button>
  );
}

const useStyles = makeStyles(theme => ({
  buttonLogout: {
    border: 'none',
    background: 'none',
    color: '#1C5A94',
    fontWeight: 'bolder',
    fontFamily: 'Roboto'
  }
}));

